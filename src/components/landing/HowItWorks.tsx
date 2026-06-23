import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Start a Conversation",
    description: "Begin by describing your project in natural language. No forms, no templates - just talk.",
    color: "bg-primary",
  },
  {
    number: "02", 
    title: "AI Asks Smart Questions",
    description: "Our AI detects vague terms and asks targeted follow-up questions to clarify requirements.",
    color: "bg-secondary",
  },
  {
    number: "03",
    title: "Review & Refine",
    description: "See extracted requirements in real-time. Edit, prioritize, and mark items as in/out of scope.",
    color: "bg-accent",
  },
  {
    number: "04",
    title: "Generate Documents",
    description: "Export professional requirement specs, scope documents, and assumption lists instantly.",
    color: "bg-primary",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps from vague idea to clear, actionable requirements
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent hidden lg:block" style={{ transform: 'translateY(-50%)' }} />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="glass-card rounded-2xl p-6 text-center hover-lift">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${step.color} text-white font-display text-2xl font-bold mb-4 shadow-lg`}>
                    {step.number}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
