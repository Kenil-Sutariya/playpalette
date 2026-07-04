export interface Product {
  id: string;
  name: string;
  emoji: string;
  color: string;
  price: number;
  tagline: string;
}

export const products: Product[] = [
  {
    id: "animal",
    name: "Animal Kit",
    emoji: "🦁",
    color: "from-orange-100 to-amber-50",
    price: 599,
    tagline: "Lions, elephants & jungle friends to bring to life",
  },
  {
    id: "dinosaur",
    name: "Dinosaur Kit",
    emoji: "🦕",
    color: "from-green-100 to-emerald-50",
    price: 599,
    tagline: "Roar-some dinos straight from the Jurassic",
  },
  {
    id: "princess",
    name: "Princess Kit",
    emoji: "👑",
    color: "from-pink-100 to-rose-50",
    price: 599,
    tagline: "Crowns, castles & fairytale magic",
  },
  {
    id: "vehicle",
    name: "Vehicle Kit",
    emoji: "🚗",
    color: "from-blue-100 to-cyan-50",
    price: 599,
    tagline: "Cars, planes & trucks ready to race",
  },
  {
    id: "alphabet",
    name: "Alphabet Kit",
    emoji: "🔤",
    color: "from-purple-100 to-fuchsia-50",
    price: 599,
    tagline: "Learn letters the colourful way",
  },
  {
    id: "ocean",
    name: "Ocean Kit",
    emoji: "🐠",
    color: "from-cyan-100 to-teal-50",
    price: 599,
    tagline: "Fish, whales & underwater wonders",
  },
];

export const productById = (id: string) => products.find((p) => p.id === id);
