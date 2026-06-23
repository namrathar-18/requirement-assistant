import { motion } from "framer-motion";
import { MessageSquareText, AlertTriangle, FileText, History, Zap, Lock } from "lucide-react";

const features = [
  {
    icon: MessageSquareText,
    title: "Conversational Requirement Gathering",
    description: "Natural chat interface that guides clients through a structured requirement discovery process.",
    gradient: "from-primary to-electric-violet",
  },
  {
    icon: AlertTriangle,
    title: "Vague Term Detection",
    description: "AI automatically identifies ambiguous words like 'fast', 'secure', 'scalable' and asks for clarification.",
    gradient: "from-secondary to-pink",
  },
  {
    icon: FileText,
    title: "Auto-Generated Documents",
    description: "Instantly generate requirement specs, scope boundaries, and assumption lists from conversations.",
    gradient: "from-accent to-cyan",
  },
  {
    icon: History,
    title: "Requirement History",
    description: "Track all changes, clarifications, and version history for complete audit trails.",
    gradient: "from-primary to-cyan",
  },
  {
    icon: Zap,
    title: "Smart Follow-ups",
    description: "Context-aware questions that dive deeper into complex requirements automatically.",
    gradient: "from-secondary to-yellow",
  },
  {
    icon: Lock,
    title: "Scope Boundaries",
    description: "Clearly define what's in and out of scope to prevent disputes before they happen.",
    gradient: "from-accent to-primary",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Everything You Need for{" "}
            <span className="gradient-text">Clear Contracts</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From initial conversation to final documentation, our AI handles the complexity 
            so you can focus on building great products.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group glass-card rounded-2xl p-6 hover-lift cursor-pointer"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
