import { motion } from "motion/react";
import { Palmtree, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-sky-900 text-white pt-12 sm:pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-sky-400 to-blue-600 p-2 rounded-lg">
                <Palmtree className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl">EPHREAM TOURS</span>
            </div>
            <p className="text-sky-200 text-sm leading-relaxed">
              Your trusted partner for unforgettable journeys across Kenya. Professional service, competitive prices, memorable experiences.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Services", "Packages", "Gallery", "About", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-sky-200 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </a>
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
            <h3 className="font-bold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm text-sky-200">
              <li>Airport Transfer</li>
              <li>SGR Transfer</li>
              <li>Hotels Transfer</li>
              <li>City Tour</li>
              <li>Custom Packages</li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-sky-200">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>+254 701 738725</p>
                  <p>Till No: 5669756</p>
                </div>
              </li>
              <li className="flex items-start gap-2 text-sky-200">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p className="break-all">ephreamtours@gmail.com</p>
              </li>
              <li className="flex items-start gap-2 text-sky-200">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>Malindi, Serving All of Kenya</p>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-3 mt-4">
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-6 border-t border-white/10 text-center text-sm text-sky-200"
        >
          <p>&copy; {currentYear} Ephream Tours. All rights reserved. | Available 24/7 for your convenience</p>
        </motion.div>
      </div>
    </footer>
  );
}
