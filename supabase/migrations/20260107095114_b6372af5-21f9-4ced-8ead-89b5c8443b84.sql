-- Create enum for project status
CREATE TYPE public.project_status AS ENUM ('draft', 'in_progress', 'clarification_needed', 'completed');

-- Create enum for requirement clarity level
CREATE TYPE public.clarity_level AS ENUM ('clear', 'vague', 'ambiguous', 'needs_clarification');

-- Projects table - stores requirement gathering sessions
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    client_name TEXT,
    client_email TEXT,
    status project_status DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Chat messages table - stores conversation history
CREATE TABLE public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Requirements table - extracted requirements from chat
CREATE TABLE public.requirements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    original_text TEXT,
    clarity clarity_level DEFAULT 'clear',
    clarified_version TEXT,
    is_in_scope BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.requirements ENABLE ROW LEVEL SECURITY;

-- Vague terms detected in conversations
CREATE TABLE public.vague_terms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    term TEXT NOT NULL,
    context TEXT,
    suggestion TEXT,
    is_resolved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.vague_terms ENABLE ROW LEVEL SECURITY;

-- Documents generated from requirements
CREATE TABLE public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    document_type TEXT NOT NULL,
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for projects
CREATE POLICY "Users can view their own projects"
ON public.projects FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects"
ON public.projects FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
ON public.projects FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
ON public.projects FOR DELETE
USING (auth.uid() = user_id);

-- RLS Policies for chat_messages (through project ownership)
CREATE POLICY "Users can view messages of their projects"
ON public.chat_messages FOR SELECT
USING (EXISTS (
    SELECT 1 FROM public.projects 
    WHERE projects.id = chat_messages.project_id 
    AND projects.user_id = auth.uid()
));

CREATE POLICY "Users can create messages in their projects"
ON public.chat_messages FOR INSERT
WITH CHECK (EXISTS (
    SELECT 1 FROM public.projects 
    WHERE projects.id = chat_messages.project_id 
    AND projects.user_id = auth.uid()
));

-- RLS Policies for requirements
CREATE POLICY "Users can view requirements of their projects"
ON public.requirements FOR SELECT
USING (EXISTS (
    SELECT 1 FROM public.projects 
    WHERE projects.id = requirements.project_id 
    AND projects.user_id = auth.uid()
));

CREATE POLICY "Users can manage requirements of their projects"
ON public.requirements FOR ALL
USING (EXISTS (
    SELECT 1 FROM public.projects 
    WHERE projects.id = requirements.project_id 
    AND projects.user_id = auth.uid()
));

-- RLS Policies for vague_terms
CREATE POLICY "Users can view vague terms of their projects"
ON public.vague_terms FOR SELECT
USING (EXISTS (
    SELECT 1 FROM public.projects 
    WHERE projects.id = vague_terms.project_id 
    AND projects.user_id = auth.uid()
));

CREATE POLICY "Users can manage vague terms of their projects"
ON public.vague_terms FOR ALL
USING (EXISTS (
    SELECT 1 FROM public.projects 
    WHERE projects.id = vague_terms.project_id 
    AND projects.user_id = auth.uid()
));

-- RLS Policies for documents
CREATE POLICY "Users can view documents of their projects"
ON public.documents FOR SELECT
USING (EXISTS (
    SELECT 1 FROM public.projects 
    WHERE projects.id = documents.project_id 
    AND projects.user_id = auth.uid()
));

CREATE POLICY "Users can manage documents of their projects"
ON public.documents FOR ALL
USING (EXISTS (
    SELECT 1 FROM public.projects 
    WHERE projects.id = documents.project_id 
    AND projects.user_id = auth.uid()
));

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_requirements_updated_at
    BEFORE UPDATE ON public.requirements
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();