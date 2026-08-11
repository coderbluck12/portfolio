import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Expand, CalendarDays } from "lucide-react";
import projectPreviews from "@/lib/store/project-previews";

const Projects = () => {
  return (
    <section className="container my-32 mx-auto">
      <div className="mb-12">
        <span className="text-xs uppercase tracking-widest text-primary font-bold">Portfolio Showcase</span>
        <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-1">
          Featured Projects<span className="text-primary">.</span>
        </h3>
      </div>

      <div className="relative timeline space-y-8 md:space-y-0">
        {projectPreviews.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={
              (idx + 1) % 2 === 0
                ? `relative w-full md:p-6 sm:w-1/2 sm:left-1/2 right-con group`
                : `relative left-0 w-full md:p-6 sm:w-1/2 group`
            }
          >
            <span className="hidden duration-300 bullet-edu sm:block bg-primary group-hover:scale-125 shadow-lg shadow-primary/30"></span>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:border-primary/40 transition-all duration-300 shadow-xl space-y-4">
              <div className="w-full overflow-hidden rounded-xl border border-white/10 group-hover:border-primary/30 transition-colors">
                <Image
                  src={project.imageSrc}
                  alt={project.imageText}
                  width={600}
                  height={400}
                  className="object-cover w-full aspect-video group-hover:scale-105 transition-transform duration-500"
                  draggable="false"
                />
              </div>

              <div className="flex items-center justify-between py-1">
                <h4 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                  {project.name}
                </h4>

                <Link href={project.viewLink}>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-primary/30 text-primary hover:bg-primary hover:text-black transition-all shadow-md">
                    <span>View</span> <Expand size={14} />
                  </span>
                </Link>
              </div>

              <div className="text-slate-300 text-sm leading-relaxed">{project.descriptionContent}</div>

              <div className="flex flex-wrap gap-2 pt-1">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-white/5 border border-white/10 text-slate-300 group-hover:border-primary/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center pt-2 text-xs text-slate-400 font-medium">
                <CalendarDays size={14} className="text-primary mr-1.5" />
                <span>{project.duration}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href={"/projects"}>
          <button className="px-6 py-3 transition-all duration-300 bg-primary/10 border border-primary/40 rounded-xl hover:bg-primary hover:text-black font-semibold text-primary shadow-lg hover:shadow-primary/20">
            View All Projects <i className="ri-arrow-right-line ml-1"></i>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Projects;
