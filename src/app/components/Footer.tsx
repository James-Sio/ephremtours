import { motion } from "motion/react";
import { Palmtree, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router";
import logoImg from "../../imports/logo.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Packages", path: "/packages" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <footer className="bg-[#003B73] text-white pt-16 sm:pt-20 pb-8 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F9A03F]/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 sm:mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-6 bg-white p-4 rounded-2xl shadow-lg inline-block w-fit transition-transform hover:scale-105">
              <img src={logoImg} alt="Ephream Tours" className="h-24 sm:h-32 w-auto object-contain" />
            </div>
            <p className="text-sky-100/70 text-sm leading-relaxed font-light pr-4">
              Your trusted partner for unforgettable journeys across Kenya. Professional service, competitive prices, and memorable experiences tailored for you.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-bold text-lg mb-6 text-white tracking-wide">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sky-100/70 hover:text-[#F9A03F] transition-colors text-sm font-medium flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F9A03F] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-bold text-lg mb-6 text-white tracking-wide">Our Services</h3>
            <ul className="space-y-3">
              {[
                { name: "SGR Terminus Transfers", path: "/services" },
                { name: "VIP Airport Meet & Greet", path: "/services" },
                { name: "Hotel-to-Hotel Shuttles", path: "/services" },
                { name: "City & Cultural Tours", path: "/services" },
                { name: "Safari & Excursions", path: "/packages" }
              ].map((service, idx) => (
                <li key={idx}>
                  <Link to={service.path} className="text-sky-100/70 hover:text-[#F9A03F] transition-colors text-sm font-medium block">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-bold text-lg mb-6 text-white tracking-wide">Contact Us</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-start gap-3 text-sky-100/70">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#F9A03F]" />
                </div>
                <div className="pt-1">
                  <p className="hover:text-white transition-colors cursor-pointer block">+254 701 738 725</p>
                  <p className="hover:text-white transition-colors cursor-pointer block">+254 736 070 030</p>
                  <p className="text-[10px] text-sky-100/40 mt-1">Till No: 5669756</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sky-100/70 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#F9A03F]" />
                </div>
                <div>
                  <p className="break-all cursor-pointer">info@ephremtours.co.ke</p>
                  <p className="text-xs text-sky-100/40">www.ephremtours.co.ke</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sky-100/70">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#F9A03F]" />
                </div>
                <p>Malindi, Kenya (Serving Coastal Strip)</p>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-4 mt-8">
              {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="w-10 h-10 bg-white/5 hover:bg-[#F9A03F] rounded-full flex items-center justify-center transition-all duration-300 group"
                >
                  <Icon className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-sky-100/50 font-medium"
        >
          <p>&copy; {currentYear} Ephream Tours. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            Available 24/7 for your convenience
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
