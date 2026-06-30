import { MapPin, Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-card/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-6">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground font-body">
            Have a question or want to place a bulk order? We're here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-border">
            <h3 className="text-2xl font-bold font-heading mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Phone</h4>
                  <p className="text-muted-foreground">+91 9723094760</p>
                  <p className="text-sm text-muted-foreground mt-1">Kenil Sutariya & Kishan Sapariya</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                  <FaWhatsapp className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">WhatsApp</h4>
                  <p className="text-muted-foreground">+91 9723094760</p>
                  <a 
                    href="https://wa.me/919723094760" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-sm font-bold text-green-600 hover:underline mt-1 inline-block"
                  >
                    Click to chat
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Location</h4>
                  <p className="text-muted-foreground">Ahmedabad, Gujarat, India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-border">
            <h3 className="text-2xl font-bold font-heading mb-6">Send a Message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-input focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Phone</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 rounded-xl border border-input focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="Your Phone Number"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Message</label>
                <textarea 
                  className="w-full px-4 py-3 rounded-xl border border-input focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all h-32 resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button className="w-full gradient-btn text-white py-4 rounded-xl font-bold text-lg shadow-md">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
