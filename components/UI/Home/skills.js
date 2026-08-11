import {
  TransitionFromRight,
  TransitionOpacity,
  TransitionOpacityInView,
  TransitionParent,
  TransitionParentFast,
} from "@/lib/utils/transitions";
import Link from "next/link";
import skills from "@/lib/store/skills";
import { useRef } from "react";

const Skills = () => {
  const ref = useRef(null);

  return (
    <div className="bg-[#0b0f17] py-20" id="stats">
      <section className="container mx-auto" id="about" ref={ref}>
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Capabilities</span>
          <h3 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mt-1">
            Summary & Skills<span className="text-primary">.</span>
          </h3>
        </div>

        <div className="space-y-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-xl">
              <TransitionParent addClass="space-y-6 text-slate-300 leading-relaxed text-base md:text-lg">
                <TransitionFromRight>
                  <p>
                    I strive to create seamless user experiences by combining strong technical problem-solving with a keen eye for modern design aesthetics.
                  </p>
                </TransitionFromRight>
                <TransitionFromRight>
                  <p>
                    Outside of code, I continuously research emerging web tech, refine software architectures, and explore AI automation tools.
                  </p>
                </TransitionFromRight>

                <TransitionFromRight>
                  <p className="font-semibold text-white">
                    Available for freelance projects, technical contract work, and full-time roles.
                  </p>
                </TransitionFromRight>

                <TransitionFromRight addClass="pt-2">
                  <Link href={"/contact"}>
                    <button className="px-6 py-3 transition-all duration-300 bg-primary/10 border border-primary/40 rounded-xl hover:bg-primary hover:text-black font-semibold text-primary shadow-lg hover:shadow-primary/20">
                      Contact Me <i className="ri-arrow-right-line ml-1"></i>
                    </button>
                  </Link>
                </TransitionFromRight>
              </TransitionParent>
            </div>
          </div>

          <div>
            <TransitionOpacityInView addClass="text-2xl md:text-3xl mb-6 font-bold text-white flex items-center gap-2">
              <span>Technical Stack</span>
              <span className="h-[2px] flex-1 bg-primary/20"></span>
            </TransitionOpacityInView>

            <TransitionParentFast addClass="grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-3 grid-cols-2 select-none text-center gap-4">
              {skills.frontend.map((skill, idx) => (
                <TransitionOpacity key={idx}>
                  <div className="py-5 px-3 space-y-2 duration-300 border rounded-xl cursor-pointer bg-white/[0.02] border-white/10 hover:bg-primary/10 hover:border-primary/40 transition-all group">
                    <div className="grid place-content-center text-primary group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                      {skill.label}
                    </p>
                  </div>
                </TransitionOpacity>
              ))}
            </TransitionParentFast>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;
