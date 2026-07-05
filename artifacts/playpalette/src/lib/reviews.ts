// Customer reviews shown in the "Loved by Parents Everywhere" section.
// To add a review: copy one object, edit the fields, done — cards render
// automatically. To remove one, delete its object. Order here = display order.
export interface Review {
  name: string;
  city: string;
  rating: number; // 1–5
  verified: boolean;
  review: string;
}

export const reviews: Review[] = [
  {
    name: "Priya M.",
    city: "Mumbai",
    rating: 5,
    verified: true,
    review: "My daughter painted all 10 kits in a weekend! She won't touch her iPad anymore.",
  },
  {
    name: "Rahul S.",
    city: "Delhi",
    rating: 5,
    verified: true,
    review: "Perfect birthday return gift! All the kids loved it and the parents were happy it wasn't plastic junk.",
  },
  {
    name: "Ayesha K.",
    city: "Bangalore",
    rating: 5,
    verified: true,
    review: "The wooden puzzles are amazing quality. You can feel it's made with so much care.",
  },
  {
    name: "Neha P.",
    city: "Pune",
    rating: 5,
    verified: true,
    review: "Finally found toys that are both fun and actually help with my son's learning.",
  },
  {
    name: "Karan T.",
    city: "Chennai",
    rating: 5,
    verified: true,
    review: "The busy board keeps my toddler engaged for hours. Best purchase ever!",
  },
  {
    name: "Sneha R.",
    city: "Hyderabad",
    rating: 5,
    verified: true,
    review: "Loved the STEM kit! My 8 year old is already asking for more experiments.",
  },
  {
    name: "Vikram J.",
    city: "Surat",
    rating: 5,
    verified: true,
    review: "Beautiful packaging and super fast delivery. Highly recommended!",
  },
  {
    name: "Pooja D.",
    city: "Ahmedabad",
    rating: 5,
    verified: true,
    review: "The flash cards are so colorful and durable. Perfect for my 3 year old.",
  },
  {
    name: "Ankit B.",
    city: "Jaipur",
    rating: 5,
    verified: true,
    review: "Great quality wooden toys. Safe, non-toxic and totally worth it.",
  },
  {
    name: "Meera N.",
    city: "Kolkata",
    rating: 5,
    verified: true,
    review: "My son loves the building blocks set. It's helping him improve focus and creativity.",
  },
  {
    name: "Rohit G.",
    city: "Lucknow",
    rating: 5,
    verified: true,
    review: "Excellent customer service and amazing products. Will definitely order again!",
  },
  {
    name: "Divya S.",
    city: "Chandigarh",
    rating: 5,
    verified: true,
    review: "These learning kits are a game changer for kids screen time!",
  },
  {
    name: "Anita R.",
    city: "Nagpur",
    rating: 5,
    verified: true,
    review: "My son improved his focus so much with the painting kit. Even his teacher noticed the difference. He sits quietly for an hour and paints — that never happened before.",
  },
  {
    name: "Farhan A.",
    city: "Indore",
    rating: 4,
    verified: true,
    review: "Good Montessori toys at a fair price. Delivery took a day longer than promised, but the quality made up for it.",
  },
  {
    name: "Lakshmi V.",
    city: "Coimbatore",
    rating: 5,
    verified: true,
    review: "Ordered the pretend-play kitchen set for my niece. She's been 'cooking' for us every evening since. Adorable and sturdy.",
  },
  {
    name: "Gurpreet S.",
    city: "Ludhiana",
    rating: 5,
    verified: true,
    review: "Bought 25 paint kits as return gifts for my daughter's birthday. Kenil helped with the bulk order on WhatsApp. Every parent asked where we got them!",
  },
  {
    name: "Ritika C.",
    city: "Bhopal",
    rating: 5,
    verified: true,
    review: "The fine-motor activity toys really helped my toddler's grip. Our paediatrician appreciated the choice.",
  },
  {
    name: "Sanjay E.",
    city: "Kochi",
    rating: 4,
    verified: true,
    review: "Paints are genuinely washable — came off hands and clothes easily. Wish there were a few more colour pots, kids finish the yellow first!",
  },
  {
    name: "Tanvi H.",
    city: "Nashik",
    rating: 5,
    verified: true,
    review: "Simple, honest product. Kids paint, they're proud of it, it sits on the shelf as a trophy. Bought thrice already.",
  },
  {
    name: "Aravind M.",
    city: "Visakhapatnam",
    rating: 5,
    verified: true,
    review: "The dinosaur figurines are a hit. My twins fight over who gets the T-Rex, so I just ordered a second box.",
  },
  {
    name: "Shabnam Q.",
    city: "Srinagar",
    rating: 5,
    verified: true,
    review: "Quality is much better than what we get in local shops. The premium box makes it perfect for gifting.",
  },
  {
    name: "Devanshi P.",
    city: "Rajkot",
    rating: 5,
    verified: true,
    review: "My 5 year old finished the alphabet learning kit and now spells her name with pride. Thank you PlayPalette!",
  },
];
