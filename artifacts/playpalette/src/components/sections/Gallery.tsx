import { useState } from "react";
import { motion } from "framer-motion";

const categories = ["All", "Animals", "Princess", "Vehicles", "Dinosaurs", "Alphabet", "Birthday"];

const images = [
  { id: 1, cat: "Animals", color: "bg-orange-200", height: "h-64", emoji: "🦁" },
  { id: 2, cat: "Dinosaurs", color: "bg-green-200", height: "h-80", emoji: "🦕" },
  { id: 3, cat: "Princess", color: "bg-pink-200", height: "h-72", emoji: "👑" },
  { id: 4, cat: "Vehicles", color: "bg-blue-200", height: "h-64", emoji: "🚗" },
  { id: 5, cat: "Alphabet", color: "bg-purple-200", height: "h-96", emoji: "🔤" },
  { id: 6, cat: "Animals", color: "bg-amber-200", height: "h-72", emoji: "🐒" },
  { id: 7, cat: "Birthday", color: "bg-red-200", height: "h-80", emoji: "🎉" },
  { id: 8, cat: "Dinosaurs", color: "bg-emerald-200", height: "h-64", emoji: "🦖" },
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredImages = activeTab === "All" ? images : images.filter(img => img.cat === activeTab);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-6">
            Masterpieces by <span className="text-primary">Little Artists</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeTab === cat
                  ? "bg-foreground text-white shadow-md"
                  : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filteredImages.map((img, index) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className={`relative rounded-2xl overflow-hidden group ${img.color} ${img.height} flex items-center justify-center`}
            >
              <span className="text-6xl opacity-50 group-hover:scale-125 transition-transform duration-500">{img.emoji}</span>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-bold font-heading text-lg">🎨 {img.cat} Kit</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
