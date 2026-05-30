import { motion } from "motion/react";
import { Phone, Mail, ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-lg sm:text-xl text-sky-50 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
            Book your Kilifi beach tour today and experience the magic of Kenya's coastline with Ephream Tours
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="tel:+254701738725"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-sky-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold flex items-center gap-2 shadow-2xl hover:shadow-3xl transition-shadow"
            >
              <Phone className="w-5 h-5" />
              Call: +254 701 738725
            </motion.a>

            <motion.a
              href="mailto:ephreamtours@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold flex items-center gap-2 shadow-2xl hover:shadow-3xl transition-shadow"
            >
              <Mail className="w-5 h-5" />
              Email Us
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 sm:mt-10 text-sky-50 text-sm sm:text-base"
          >
            <p>Available 24/7 for bookings and inquiries</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
