import { motion } from "framer-motion";

const features = [
  { icon: "📵", title: "Screen-Free", desc: "Keep kids engaged without devices for hours." },
  { icon: "🎨", title: "Boost Creativity", desc: "Express imagination freely through art and colors." },
  { icon: "🧘", title: "Improve Focus", desc: "Builds concentration and patience playfully." },
  { icon: "✋", title: "Fine Motor Skills", desc: "Develops hand-eye coordination with every stroke." },
  { icon: "🎁", title: "Perfect Gift", desc: "Loved by kids and parent-approved." },
  { icon: "✅", title: "Safe Materials", desc: "100% non-toxic, child-safe paints included." },
];

export default function Features() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-6">
            Why Parents <span className="text-primary">Love</span> Us
          </h2>
          <p className="text-xl text-muted-foreground font-body">
            More than just a toy. It's a developmental tool wrapped in a fun activity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-card p-8 rounded-[2rem] border border-border/50 card-hover group"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold font-heading mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground font-medium text-lg leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
