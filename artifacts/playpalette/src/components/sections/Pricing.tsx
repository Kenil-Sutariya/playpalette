import { motion } from "framer-motion";
import { Check } from "lucide-react";

const packs = [
  {
    name: "Starter Pack",
    kits: "5 Kits",
    price: "349",
    desc: "Perfect for trying out",
    color: "bg-blue-100 text-blue-600 border-blue-200",
    features: ["5 POP Figurines", "15 Non-toxic Colors", "5 Brushes", "Instructions"],
    popular: false,
  },
  {
    name: "Best Seller",
    kits: "10 Kits",
    price: "599",
    desc: "Most popular choice",
    color: "bg-primary/10 text-primary border-primary",
    features: ["10 POP Figurines", "30 Non-toxic Colors", "10 Brushes", "Premium Box"],
    popular: true,
  },
  {
    name: "Party Pack",
    kits: "20 Kits",
    price: "999",
    desc: "Perfect for birthdays",
    color: "bg-purple-100 text-purple-600 border-purple-200",
    features: ["20 POP Figurines", "60 Non-toxic Colors", "20 Brushes", "Return Gift Ready"],
    popular: false,
  },
  {
    name: "School Pack",
    kits: "50+ Kits",
    price: "Quote",
    desc: "Bulk pricing available",
    color: "bg-green-100 text-green-600 border-green-200",
    features: ["50+ POP Figurines", "Bulk Paints", "Classroom Ready", "Special Discounts"],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="products" className="py-24 bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-6">
            Choose Your <span className="text-primary">Palette</span>
          </h2>
          <p className="text-xl text-muted-foreground font-body">
            From starter sets to massive party packs, we have the perfect kit for every occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packs.map((pack, index) => (
            <motion.div
              key={pack.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative bg-white rounded-3xl p-8 border-2 card-hover flex flex-col ${
                pack.popular ? "border-primary shadow-lg shadow-primary/20" : "border-border shadow-sm"
              }`}
            >
              {pack.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-orange-400 text-white font-bold px-4 py-1 rounded-full text-sm flex items-center gap-1 shadow-md">
                  ⭐ Most Popular
                </div>
              )}
              
              <div className="mb-8 text-center">
                <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4 border ${pack.color}`}>
                  {pack.kits}
                </div>
                <h3 className="text-2xl font-bold font-heading mb-2">{pack.name}</h3>
                <div className="flex items-end justify-center gap-1 mb-2">
                  {pack.price !== "Quote" && <span className="text-2xl font-bold text-muted-foreground">₹</span>}
                  <span className="text-5xl font-extrabold text-foreground">{pack.price}</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">{pack.desc}</p>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {pack.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/919723094760?text=Hello%2C%20I%20want%20to%20order%20the%20${pack.name}%20(${pack.kits})`}
                target="_blank"
                rel="noreferrer"
                className={`w-full py-4 rounded-full font-bold text-center transition-all ${
                  pack.popular
                    ? "gradient-btn text-white"
                    : "bg-gray-100 text-foreground hover:bg-gray-200"
                }`}
              >
                {pack.price === "Quote" ? "Get Quote via WhatsApp" : "Order via WhatsApp"}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
