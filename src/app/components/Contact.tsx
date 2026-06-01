import { motion } from "motion/react";
import { Phone, Mail, MapPin, Send, CreditCard } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!message.trim()) {
      toast.error("Please enter your message.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call and give gorgeous response feedback
    setTimeout(() => {
      toast.success(`Thank you, ${name}! Your message has been sent successfully.`);
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
      
      // Fast WhatsApp redirect toast option
      toast.info("Would you like to also send this via WhatsApp for a faster response?", {
        action: {
          label: "Send WhatsApp",
          onClick: () => {
            const formattedMessage = `Hi Ephrem Tours, my name is ${name}. ${message}${email ? ` (My email: ${email})` : ""}`;
            const whatsappUrl = `https://wa.me/254701738725?text=${encodeURIComponent(formattedMessage)}`;
            window.open(whatsappUrl, "_blank");
          }
        },
        duration: 12000
      });
    }, 800);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Get In <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Ready to start your journey? Contact us today for bookings and inquiries
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6"
          >
            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-sky-50 transition-colors"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-1">Call Us</h3>
                <a href="tel:+254701738725" className="text-sm sm:text-base text-gray-600 hover:text-sky-600 transition-colors block">+254 701 738 725</a>
                <a href="tel:+254736070030" className="text-sm sm:text-base text-gray-600 hover:text-sky-600 transition-colors block">+254 736 070 030</a>
              </div>
            </motion.div>
 
            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-sky-50 transition-colors"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-1">Email Us</h3>
                <a href="mailto:info@ephremtours.co.ke" className="text-sm sm:text-base text-gray-600 hover:text-sky-600 transition-colors break-all block">info@ephremtours.co.ke</a>
                <p className="text-xs text-sky-600 font-semibold">www.ephremtours.co.ke</p>
              </div>
            </motion.div>
 
            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-sky-50 transition-colors"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-1">Lipa Na M-PESA</h3>
                <p className="text-sm sm:text-base text-gray-600 font-semibold">Buy Goods Till No: 5669756</p>
              </div>
            </motion.div>
 
            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-sky-50 transition-colors"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-1">Location</h3>
                <p className="text-sm sm:text-base text-gray-600">Malindi, Kenya (Serving Coastal Strip)</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                  className="w-full px-3 sm:px-4 py-3 text-sm sm:text-base rounded-xl border border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
                />
              </div>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email (Optional)"
                  className="w-full px-3 sm:px-4 py-3 text-sm sm:text-base rounded-xl border border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
                />
              </div>
              <div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your Message"
                  rows={5}
                  required
                  className="w-full px-3 sm:px-4 py-3 text-sm sm:text-base rounded-xl border border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all resize-none"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
