import { FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-foreground pt-20 pb-10 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <a href="#home" className="inline-flex items-center gap-2 mb-6">
              <span className="text-3xl font-accent font-bold gradient-text tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                PlayPalette
              </span>
              <span className="text-2xl">🎨</span>
            </a>
            <p className="text-gray-400 font-body mb-6">
              Paint • Play • Create. Premium DIY Plaster of Paris paint kits keeping kids away from screens.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 transition-colors">
                <FaYoutube className="w-5 h-5" />
              </a>
              <a href="https://wa.me/919723094760" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 transition-colors">
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 font-heading">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Products", "Birthday Gifts", "Schools", "About", "FAQ", "Contact"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 font-heading">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li>+91 9723094760</li>
              <li>Kenil Sutariya</li>
              <li>Kishan Sapariya</li>
              <li>Ahmedabad, Gujarat</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 font-heading">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe for new product launches and special offers.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white/10 border border-white/20 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:border-primary text-white"
              />
              <button className="bg-primary hover:bg-primary/90 px-4 py-2 rounded-r-lg font-bold transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-sm">
          <p>© 2025 PlayPalette. All Rights Reserved.</p>
          <p>Made with ❤️ in India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}
