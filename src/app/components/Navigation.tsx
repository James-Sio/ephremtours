import { motion, AnimatePresence } from "motion/react";
import { Palmtree, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Packages", path: "/packages" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg shadow-sm border-b border-white/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-b from-sky-300 to-blue-500 rounded-full shadow-md group-hover:scale-105 transition-transform overflow-hidden border-2 border-white">
                  <div className="absolute bottom-0 w-full h-1/2 bg-blue-600 rounded-b-full"></div>
                  <Palmtree className="w-6 h-6 sm:w-7 sm:h-7 text-green-500 relative z-10 drop-shadow-md mb-1" />
                  <div className="absolute top-1 right-1 w-3 h-3 bg-yellow-400 rounded-full blur-[1px]"></div>
                </div>
                <div className="flex flex-col justify-center leading-none">
                  <span className="font-extrabold text-xl sm:text-2xl text-[#003B73] tracking-tighter uppercase" style={{ fontFamily: "Arial, sans-serif", letterSpacing: "-1px" }}>
                    EPHREAM
                  </span>
                  <div className="flex items-center gap-1">
                    <div className="h-[2px] w-3 bg-[#F9A03F]"></div>
                    <span className="font-extrabold text-[10px] sm:text-xs text-[#F9A03F] tracking-[0.2em] uppercase">
                      TOURS
                    </span>
                    <div className="h-[2px] flex-grow bg-[#F9A03F]"></div>
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-1">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className={`px-4 py-2 rounded-full font-medium transition-all ${
                        isActive 
                          ? "bg-sky-50 text-sky-700 shadow-sm" 
                          : "text-gray-600 hover:text-sky-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors relative z-50"
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Slide Down */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-16 left-0 right-0 z-40 bg-white shadow-2xl rounded-b-3xl border-t border-gray-100 md:hidden overflow-hidden"
            >
              <div className="px-4 py-6 flex flex-col gap-2">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`block w-full px-6 py-4 rounded-2xl font-semibold transition-all active:scale-95 ${
                          isActive
                            ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-200"
                            : "text-gray-700 bg-gray-50 hover:bg-sky-50 hover:text-sky-700"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
