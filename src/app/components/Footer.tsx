import { motion } from "motion/react";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router";
import logoImg from "../../imports/logo.png";
import { OfficeMap } from "./OfficeMap";
import {
  CONTACT_EMAIL,
  CONTACT_PHONES,
  CONTACT_WEBSITE,
  MPESA_TILL,
  MAIN_OFFICE,
  officeAddressLines,
  googleMapsDirectionsUrl,
} from "../data/siteContact";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Packages", path: "/packages" },
    { name: "Partnership", path: "/partnership" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-[#003B73] text-white pt-16 sm:pt-20 pb-safe relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F9A03F]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 safe-x">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12 sm:mb-14">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-6 bg-white p-4 rounded-2xl shadow-lg inline-block w-fit transition-transform hover:scale-105">
              <img src={logoImg} alt="Ephream Tours" className="h-20 sm:h-28 w-auto object-contain" />
            </div>
            <p className="text-sky-100/70 text-sm leading-relaxed font-light pr-4">
              Your trusted partner for unforgettable journeys across Kenya. Professional transfers, luxury safaris, and coastal experiences.
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
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F9A03F] opacity-0 group-hover:opacity-100 transition-opacity" />
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
                { name: "Car & Van Hire (with driver)", path: "/services#car-hire" },
                { name: "SGR Terminus Transfers", path: "/services" },
                { name: "VIP Airport Meet & Greet", path: "/services" },
                { name: "Hotel-to-Hotel Shuttles", path: "/services" },
                { name: "Vehicle Partnership", path: "/partnership" },
                { name: "Safari & Excursions", path: "/packages" },
              ].map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-sky-100/70 hover:text-[#F9A03F] transition-colors text-sm font-medium block"
                  >
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
                <div className="pt-0.5 space-y-1">
                  {CONTACT_PHONES.map((p) => (
                    <a
                      key={p.tel}
                      href={`tel:${p.tel}`}
                      className="block hover:text-white transition-colors"
                    >
                      {p.display}
                    </a>
                  ))}
                  <p className="text-[10px] text-sky-100/40">M-Pesa Till: {MPESA_TILL}</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sky-100/70">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#F9A03F]" />
                </div>
                <div>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="break-all hover:text-white transition-colors block"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  <a
                    href={`https://${CONTACT_WEBSITE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-sky-100/50 hover:text-[#F9A03F] transition-colors"
                  >
                    {CONTACT_WEBSITE}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sky-100/70">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#F9A03F]" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{MAIN_OFFICE.name}</p>
                  {officeAddressLines().map((line) => (
                    <p key={line} className="text-xs sm:text-sm mt-0.5">
                      {line}
                    </p>
                  ))}
                  <a
                    href={googleMapsDirectionsUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-[#F9A03F] hover:text-amber-300 transition-colors"
                  >
                    Get directions →
                  </a>
                </div>
              </li>
            </ul>

            <div className="flex gap-3 mt-8">
              {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  aria-label="Social link"
                  className="w-10 h-10 bg-white/5 hover:bg-[#F9A03F] rounded-full flex items-center justify-center transition-all duration-300 group"
                >
                  <Icon className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Main office map — full width */}
        <OfficeMap variant="dark" className="mb-12 sm:mb-14" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-sky-100/50 font-medium"
        >
          <p>&copy; {currentYear} Ephream Tours. All rights reserved.</p>
          <p className="flex items-center gap-2 text-center sm:text-right">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] shrink-0" />
            {MAIN_OFFICE.hours}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
