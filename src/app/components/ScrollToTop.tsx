import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation();
  const hasStickyMobileBar = /^\/packages\/[^/]+$/.test(pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          whileTap={{ scale: 0.92 }}
          aria-label="Scroll to top"
          className={`touch-target fixed right-4 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-full shadow-2xl flex items-center justify-center ${
            hasStickyMobileBar
              ? "bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] lg:bottom-28"
              : "bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] sm:bottom-28"
          }`}
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
