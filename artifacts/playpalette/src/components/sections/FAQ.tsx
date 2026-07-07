import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "What age group is PlayPalette for?", a: "Our kits are perfect for children aged 3 to 10 years old. Adult supervision is recommended for younger children." },
  { q: "Are the paints safe for kids?", a: "Yes! We use 100% non-toxic, child-safe acrylic paints that are easily washable from hands." },
  { q: "How many kits come in a pack?", a: "We offer packs of 5, 10, and 20 kits depending on your needs." },
  { q: "Do you offer birthday party packages?", a: "Yes, our 20-kit Party Pack is specially designed for return gifts and birthday activities." },
  { q: "Can schools order in bulk?", a: "Absolutely! We offer special pricing for school orders of 50+ kits. Contact us via WhatsApp for a quote." },
  { q: "What is the shipping time?", a: "We typically deliver within 3-5 business days across Pan India." },
  { q: "Do you ship across India?", a: "Yes, we ship everywhere in India." },
  { q: "What is the return & replacement policy?", a: "You can request a return or replacement within 2 days of delivery for damaged, missing, wrong or defective items. Please record a clear unboxing video while opening your parcel — it's the proof we need to approve your claim quickly. Claims without an unboxing video may not be accepted." },
  { q: "Why do I need an unboxing video?", a: "It protects you! A clear video of the sealed parcel being opened lets us instantly verify any damaged, missing or wrong item and send you a replacement without any back-and-forth. Just start recording before you cut the tape." },
  { q: "What payment methods do you accept?", a: "You can place your order on the website and pay securely online, or complete your order with our team on WhatsApp. All prices are inclusive of GST." },
  { q: "How do we use the kit?", a: "Open the box, lay out the figurines, pop open the colour pots, dip the included brush and start painting! Colours dry in 20-30 minutes and the figurine is ready to display or gift." },
  { q: "Is GST included?", a: "Yes, all our prices are inclusive of GST." },
  { q: "How do I place a bulk order?", a: "You can click the 'Get Bulk Quote' button or WhatsApp Kenil directly at 9723094760." },
  { q: "Can I track my order?", a: "Yes, a tracking link will be provided via SMS/WhatsApp once your order is dispatched." },
  { q: "Are the figurines pre-made or need assembly?", a: "They are pre-made solid POP figurines. Ready to be painted right out of the box!" },
  { q: "What colors are included?", a: "Each individual kit includes 3 primary colors. A 10-kit pack comes with 30 color pots in total." },
  { q: "Is a brush included?", a: "Yes, every single kit includes its own paintbrush." },
  { q: "Can adults also enjoy this?", a: "Absolutely! Painting is a therapeutic activity for all ages." },
  { q: "Is packaging eco-friendly?", a: "We strive to use minimal plastic and rely heavily on recyclable cardboard packaging." },
  { q: "Do you have reseller/franchise options?", a: "Yes, we are open to partnerships. Please WhatsApp us to discuss." },
  { q: "Can this be customized for events?", a: "Yes, for bulk orders, we can arrange custom packaging or specific figurine themes." },
  { q: "How durable is the plaster figurine?", a: "Once painted and dried, they are quite durable and make great display pieces." },
  { q: "What is the best seller?", a: "Our 10-Kit Box at ₹599 is our most popular choice!" },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-6">
            Frequently Asked <span className="text-accent">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground font-body">
            Everything you need to know about PlayPalette.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-2xl px-6 py-2 bg-card/50">
              <AccordionTrigger className="text-left font-bold text-lg hover:no-underline hover:text-primary transition-colors">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
