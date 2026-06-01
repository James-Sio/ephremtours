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
    { name: "Car Hire", path: "/car-hire" },
    { name: "Packages", path: "/packages" },
    { name: "Partnership", path: "/partnership" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const serviceLinks = [
    { name: "SGR Transfers", path: "/services" },
    { name: "VIP Airport", path: "/services" },
    { name: "Hotel Shuttles", path: "/services" },
    { name: "Safari Packages", path: "/packages" },
    { name: "Vehicle Partnership", path: "/partnership" },
    { name: "Car Hire (own page)", path: "/car-hire" },
  ];

  return (
    <footer className="bg-[#003B73] text-white pt-12 sm:pt-20 pb-safe relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F9A03F]/10 rounded-full blur-[100px] pointer-events-none hidden sm:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 safe-x">
        {/* Brand — centered on phone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center sm:text-left mb-10 sm:mb-12"
        >
          <div className="flex justify-center sm:justify-start mb-5">
            <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-lg inline-block">
              <img src={logoImg} alt="Ephream Tours" className="h-16 sm:h-24 w-auto object-contain mx-auto" />
            </div>
          </div>
          <p className="text-sky-100/70 text-sm leading-relaxed font-light max-w-md mx-auto sm:mx-0 text-pretty">
            Your trusted partner for unforgettable journeys across Kenya. Professional transfers, luxury safaris, and coastal experiences.
          </p>
        </motion.div>

        {/* Quick links (left) + Services (right) on mobile — compact 2-col */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-left"
          >
            <h3 className="font-bold text-base sm:text-lg mb-4 text-white tracking-wide">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sky-100/70 hover:text-[#F9A03F] transition-colors text-sm font-medium block text-pretty"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-right sm:text-left"
          >
            <h3 className="font-bold text-base sm:text-lg mb-4 text-white tracking-wide">Our Services</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-sky-100/70 hover:text-[#F9A03F] transition-colors text-sm font-medium block text-pretty"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact — full width row on mobile/tablet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="col-span-2 sm:col-span-2 lg:col-span-2 text-center sm:text-left"
          >
            <h3 className="font-bold text-base sm:text-lg mb-5 text-white tracking-wide">Contact Us</h3>
            <ul className="space-y-4 text-sm font-medium max-w-md mx-auto sm:mx-0">
              <li className="flex items-start gap-3 text-sky-100/70 justify-center sm:justify-start text-left">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#F9A03F]" />
                </div>
                <div className="pt-0.5 space-y-1 min-w-0">
                  {CONTACT_PHONES.map((p) => (
                    <a key={p.tel} href={`tel:${p.tel}`} className="block hover:text-white transition-colors">
                      {p.display}
                    </a>
                  ))}
                  <p className="text-[10px] text-sky-100/40">M-Pesa Till: {MPESA_TILL}</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sky-100/70 justify-center sm:justify-start text-left">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#F9A03F]" />
                </div>
                <div className="min-w-0 break-all">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white transition-colors block">
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
              <li className="flex items-start gap-3 text-sky-100/70 justify-center sm:justify-start text-left">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#F9A03F]" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-white text-sm">{MAIN_OFFICE.name}</p>
                  {officeAddressLines().map((line) => (
                    <p key={line} className="text-xs sm:text-sm mt-0.5 text-pretty">
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

            <div className="flex gap-3 mt-6 justify-center sm:justify-start">
              {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  aria-label="Social link"
                  className="w-10 h-10 bg-white/5 hover:bg-[#F9A03F] rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <Icon className="w-4 h-4 text-white" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <OfficeMap variant="dark" className="mb-10 sm:mb-14" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col items-center gap-3 text-sm text-sky-100/50 font-medium text-center"
        >
          <p>&copy; {currentYear} Ephream Tours. All rights reserved.</p>
          <p className="flex items-center justify-center gap-2 text-pretty">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            {MAIN_OFFICE.hours}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
