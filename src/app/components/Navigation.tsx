import { motion, AnimatePresence } from "motion/react";
import { Palmtree, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Packages", path: "/packages" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="bg-gradient-to-br from-sky-400 to-blue-600 p-2 rounded-lg">
                <Palmtree className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                EPHREAM TOURS
              </span>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className="text-gray-700 hover:text-sky-600 transition-colors cursor-pointer"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-sky-50 hover:text-sky-600 rounded-lg transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
