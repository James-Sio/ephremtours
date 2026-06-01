import { motion } from "motion/react";
import { Phone, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router";

/** Hide FAB when a page has its own sticky mobile CTA (e.g. package detail). */
function useHideFloatingContact() {
  const { pathname } = useLocation();
  return /^\/packages\/[^/]+$/.test(pathname);
}

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const hidden = useHideFloatingContact();

  if (hidden) return null;

  return (
    <div className="fixed z-40 fab-position md:bottom-6 md:right-6">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          className="mb-4 space-y-3"
        >
          <motion.a
            href="tel:+254701738725"
            whileTap={{ scale: 0.95 }}
            className="touch-target flex items-center gap-3 bg-white text-sky-600 px-5 py-3.5 rounded-full shadow-2xl"
          >
            <Phone className="w-5 h-5 shrink-0" />
            <span className="font-semibold text-sm">Call Now</span>
          </motion.a>

          <motion.a
            href="https://wa.me/254701738725"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.95 }}
            className="touch-target flex items-center gap-3 bg-green-500 text-white px-5 py-3.5 rounded-full shadow-2xl"
          >
            <MessageCircle className="w-5 h-5 shrink-0" />
            <span className="font-semibold text-sm">WhatsApp</span>
          </motion.a>
        </motion.div>
      )}

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.92 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
        aria-expanded={isOpen}
        className="touch-target w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center"
      >
        {isOpen ? (
          <span className="text-3xl leading-none">×</span>
        ) : (
          <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
        )}
      </motion.button>

      {!isOpen && (
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-sky-400 rounded-full -z-10 pointer-events-none"
        />
      )}
    </div>
  );
}
