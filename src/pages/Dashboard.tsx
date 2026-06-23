import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, FileText, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session) navigate("/auth");
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) navigate("/auth");
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      
      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage your requirement sessions</p>
          </div>
          <Link to="/chat">
            <Button variant="hero">
              <Plus className="h-4 w-4" />
              New Session
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Active Sessions</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-secondary/10">
                <FileText className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Documents</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/10">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Empty state */}
        <div className="glass-card rounded-3xl p-12 text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-6">
            <MessageSquare className="h-8 w-8 text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-2">No sessions yet</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Start your first requirement gathering session and let AI help you create clear, actionable specifications.
          </p>
          <Link to="/chat">
            <Button variant="hero" size="lg">
              <Plus className="h-5 w-5" />
              Start First Session
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
