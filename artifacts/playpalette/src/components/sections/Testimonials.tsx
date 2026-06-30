import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    text: "My daughter painted all 10 kits in a weekend! She won't touch her iPad anymore.",
    author: "Priya M.",
    location: "Mumbai",
  },
  {
    text: "Perfect birthday return gift! All the kids loved it and the parents were happy it wasn't plastic junk.",
    author: "Rahul S.",
    location: "Delhi",
  },
  {
    text: "Amazing quality, safe materials. Worth every rupee! The paints wash off easily from hands too.",
    author: "Deepa K.",
    location: "Bangalore",
  },
  {
    text: "My son improved his focus so much. Teachers noticed a difference! He sits quietly and paints.",
    author: "Anita R.",
    location: "Pune",
  },
  {
    text: "Bought the party pack for 20 kids. Everyone was happy! Kenil was very helpful with the bulk order.",
    author: "Vikram T.",
    location: "Ahmedabad",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-card overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-6">
            Loved by <span className="text-secondary">Parents</span> Everywhere
          </h2>
          <div className="flex items-center justify-center gap-2 text-secondary mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-8 h-8 fill-current" />
            ))}
          </div>
          <p className="text-lg font-bold text-muted-foreground">500+ Five Star Reviews</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-border max-w-md card-hover"
            >
              <div className="flex items-center gap-1 text-secondary mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-lg text-foreground font-medium mb-6 italic">"{review.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold font-heading text-foreground">{review.author}</h4>
                  <p className="text-sm text-muted-foreground">{review.location}</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  ✓
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
