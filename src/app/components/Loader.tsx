import { motion, AnimatePresence } from "motion/react";
import logoImg from "../../imports/logo.png";
import { useState, useEffect } from "react";

export function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-gradient-to-br from-sky-500 via-blue-600 to-purple-600 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-white p-4 rounded-3xl shadow-2xl inline-flex items-center justify-center mx-auto mb-6"
            >
              <img src={logoImg} alt="Ephream Tours" className="h-24 sm:h-32 w-auto object-contain" />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl sm:text-3xl font-bold text-white mb-2"
            >
              EPHREAM TOURS
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sky-100 text-sm sm:text-base"
            >
              Your Journey Awaits...
            </motion.p>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-1 bg-white/30 rounded-full mt-6 max-w-xs mx-auto overflow-hidden"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full w-1/2 bg-white rounded-full"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
