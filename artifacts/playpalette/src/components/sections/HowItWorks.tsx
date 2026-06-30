import { motion } from "framer-motion";
import { PackageOpen, Paintbrush, Heart } from "lucide-react";

const steps = [
  {
    icon: <PackageOpen className="w-10 h-10" />,
    title: "Open the Box",
    desc: "Unbox the surprise figurine and set up your creative station.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <Paintbrush className="w-10 h-10" />,
    title: "Paint & Create",
    desc: "Mix colors, paint freely, and let imagination run wild.",
    color: "bg-primary/20 text-primary",
  },
  {
    icon: <Heart className="w-10 h-10" />,
    title: "Display with Pride",
    desc: "Show off your masterpiece or give it as a handmade gift.",
    color: "bg-green-100 text-green-600",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-6">
            How It <span className="text-secondary">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground font-body">
            Three simple steps to endless creative fun.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 border-t-2 border-dashed border-border -translate-y-1/2 z-0" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative z-10 bg-white rounded-3xl p-8 border-2 border-border text-center shadow-sm card-hover"
            >
              <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 shadow-md ${step.color}`}>
                {step.icon}
              </div>
              <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-gray-100 text-gray-400 font-bold flex items-center justify-center">
                {index + 1}
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-lg">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
