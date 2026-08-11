import education from "@/lib/store/education";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

const Education = () => {
  return (
    <section className="container my-28 mx-auto">
      <div className="mb-12">
        <span className="text-xs uppercase tracking-widest text-primary font-bold">Background</span>
        <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-1">
          Education<span className="text-primary">.</span>
        </h3>
      </div>

      <div className="relative timeline space-y-8 md:space-y-0">
        {education.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={
              (idx + 1) % 2 === 0
                ? `relative w-full md:p-8 sm:w-1/2 sm:left-1/2 right-con group`
                : `relative left-0 w-full md:p-8 sm:w-1/2 group`
            }
          >
            <span className="hidden duration-300 bullet-edu sm:block bg-primary group-hover:scale-125 shadow-lg shadow-primary/30"></span>
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:border-primary/40 transition-all duration-300 shadow-xl space-y-4">
              <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                {edu.title}
              </h4>
              <p className="text-slate-300 text-base">{edu.institution}</p>

              <div className="flex items-center pt-2 text-sm text-slate-400 font-medium">
                <CalendarDays size={16} className="text-primary mr-2" />
                <span>{edu.duration}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
