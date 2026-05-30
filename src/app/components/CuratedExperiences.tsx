import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, MapPin } from "lucide-react";

import exp1 from "../../imports/gallery-19.jpg"; 
import exp2 from "../../imports/gallery-10.jpg"; 
import exp3 from "../../imports/gallery-17.jpg"; 
import exp4 from "../../imports/gallery-15.jpg"; 

const experiences = [
  { id: 1, title: "Marafa Hell's Kitchen", location: "Malindi", image: exp1, span: "col-span-1 md:col-span-2 row-span-2" },
  { id: 2, title: "Tsavo East Safaris", location: "Tsavo", image: exp2, span: "col-span-1 row-span-1" },
  { id: 3, title: "Gede Ruins", location: "Watamu", image: exp3, span: "col-span-1 row-span-1" },
  { id: 4, title: "Wasini Dolphins", location: "South Coast", image: exp4, span: "col-span-1 md:col-span-2 row-span-1" },
];

export function CuratedExperiences() {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight"
            >
              Curated Coastal <span className="text-sky-600">Experiences</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 font-light"
            >
              Discover the hidden gems of the Kenyan coast. From historic ruins to breathtaking sunsets, we provide exclusive access to unforgettable destinations.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors group font-semibold">
              View Day Tours
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-4 sm:gap-6">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative rounded-3xl overflow-hidden group cursor-pointer ${exp.span}`}
            >
              <img 
                src={exp.image} 
                alt={exp.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 p-6 sm:p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-2 text-sky-400 mb-2 font-semibold text-sm">
                  <MapPin className="w-4 h-4" />
                  {exp.location}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{exp.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
