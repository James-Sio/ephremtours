import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mwangi",
    role: "Tourist",
    content: "Ephream Tours made our Kilifi trip absolutely unforgettable! Professional service, comfortable transport, and our guide was incredibly knowledgeable. Highly recommend!",
    rating: 5,
    avatar: "SM"
  },
  {
    name: "David Ochieng",
    role: "Business Traveler",
    content: "I use Ephream Tours for all my airport transfers. Always on time, professional drivers, and competitive prices. The SOS service saved me during an emergency trip!",
    rating: 5,
    avatar: "DO"
  },
  {
    name: "Emily Wanjiru",
    role: "Family Vacation",
    content: "We booked the Premium Package for our family beach trip. Everything was perfectly organized, the kids loved it, and we got amazing photos. Worth every shilling!",
    rating: 5,
    avatar: "EW"
  }
];

export function Testimonials() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sky-600 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            What Our <span className="text-orange-300">Clients Say</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-sky-100 max-w-2xl mx-auto px-4">
            Don't just take our word for it - hear from our happy travelers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all"
            >
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-orange-300 mb-4" />

              <p className="text-sm sm:text-base text-sky-50 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-base sm:text-lg">{testimonial.name}</div>
                  <div className="text-xs sm:text-sm text-sky-200">{testimonial.role}</div>
                  <div className="flex gap-1 mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-orange-300 text-orange-300" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
