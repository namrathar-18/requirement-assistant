import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-hero-pattern">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Requirement Clarity</span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance">
              Turn{" "}
              <span className="gradient-text">Vague Ideas</span>
              {" "}into{" "}
              <span className="gradient-text">Crystal-Clear</span>
              {" "}Contracts
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-muted-foreground max-w-lg text-balance">
              Stop scope creep before it starts. Our AI assistant asks the right questions, 
              detects ambiguous requirements, and generates bulletproof specification documents.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link to="/auth">
                <Button variant="hero" size="xl">
                  Start Clarifying
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="xl">
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-5 w-5 text-accent" />
                <span>Enterprise-grade security</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileCheck className="h-5 w-5 text-accent" />
                <span>Export to PDF</span>
              </div>
            </div>
          </motion.div>

          {/* Chat preview mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative glass-card rounded-3xl p-6 shadow-2xl">
              {/* Chat header */}
              <div className="flex items-center gap-3 pb-4 border-b border-border/50">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-yellow" />
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="ml-4 text-sm font-medium text-muted-foreground">New Requirement Session</span>
              </div>

              {/* Chat messages */}
              <div className="space-y-4 py-6">
                <div className="flex justify-end">
                  <div className="chat-bubble-user px-4 py-3 max-w-xs">
                    <p className="text-sm">I need a fast website with good security</p>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="chat-bubble-assistant px-4 py-3 max-w-sm">
                    <p className="text-sm mb-2">I detected some vague terms:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="vague-term text-xs">"fast"</span>
                      <span className="vague-term text-xs">"good security"</span>
                    </div>
                    <p className="text-sm mt-2 text-muted-foreground">
                      Let me help clarify. When you say "fast", do you mean:
                    </p>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="chat-bubble-assistant px-4 py-3 max-w-sm">
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Page load under 2 seconds?</li>
                      <li>• API response under 100ms?</li>
                      <li>• Both of the above?</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Typing indicator */}
              <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-sm text-muted-foreground">ClarityAI is thinking...</span>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 gradient-secondary-bg rounded-2xl rotate-12 opacity-80 blur-sm" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 gradient-accent-bg rounded-2xl -rotate-12 opacity-60 blur-sm" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
