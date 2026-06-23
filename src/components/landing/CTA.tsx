import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg opacity-95" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white">Start for Free</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Eliminate Scope Creep Forever?
          </h2>

          <p className="text-xl text-white/80 mb-8">
            Join thousands of freelancers and agencies who use ClarityAI to create 
            bulletproof contracts and happy clients.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/auth">
              <Button variant="glass" size="xl" className="text-foreground">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </Link>
          </div>

          <p className="text-white/60 text-sm mt-6">
            No credit card required • Free plan includes 3 projects
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
