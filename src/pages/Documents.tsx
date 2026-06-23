import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { FileText, Download, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

const Documents = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session) navigate("/auth");
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) navigate("/auth");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      
      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">Documents</h1>
            <p className="text-muted-foreground">Generated requirement specifications</p>
          </div>
          <Link to="/chat">
            <Button variant="hero">
              <Plus className="h-4 w-4" />
              New Document
            </Button>
          </Link>
        </div>

        {/* Empty state */}
        <div className="glass-card rounded-3xl p-12 text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl gradient-secondary-bg flex items-center justify-center mb-6">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-2">No documents yet</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Complete a requirement session to generate your first specification document.
          </p>
          <Link to="/chat">
            <Button variant="coral" size="lg">
              <Download className="h-5 w-5" />
              Start Session
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Documents;
