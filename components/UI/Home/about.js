"use client";
import Star from "@/components/Common/Icons/star";
import { TransitionReveal } from "@/lib/utils/transitions";
import { gsap } from "gsap";
import { useLayoutEffect } from "react";
import { DownloadIcon } from "lucide-react";
import Image from "next/image";
import { useStore } from "@/lib/utils/providers";

const About = () => {
  const { homeRef } = useStore();

  useLayoutEffect(() => {
    const cxt = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#about_",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      tl.to(".star_icon", { rotate: 360 });
    }, homeRef);

    return () => cxt.revert();
  }, []);

  return (
    <>
      <div className="h-[2rem] bg-gradient-to-b from-[#0b0f17] to-black"></div>
      <section className="relative py-24 bg-black overflow-hidden" id="about_">
        <div className="container relative z-10 mx-auto">
          {/* Header */}
          <div className="mb-16">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Biography</span>
            <h3 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mt-1">
              About Me<span className="text-primary">.</span>
            </h3>
          </div>

          <div className="absolute top-10 right-10 -z-10 star_icon opacity-30">
            <Star />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <TransitionReveal addClass="space-y-6">
              <p className="text-lg md:text-xl leading-relaxed text-slate-300">
                <span className="text-3xl md:text-4xl font-extrabold text-white mr-2">Hi,</span>
                I&lsquo;m <span className="text-primary font-semibold">Philip Oyenola</span>, a Fullstack Web Developer
                and AI Enthusiast based in Nigeria. I specialize in building high-performance web applications,
                automation tools, and modern digital solutions for businesses and private clients worldwide.
              </p>

              <div className="pt-4">
                <a download="Philip_Oyenola_Resume.pdf" href={"/docs/philipresume.pdf"}>
                  <button className="inline-flex items-center gap-2 px-6 py-3 transition-all duration-300 bg-primary/10 border border-primary/40 rounded-xl hover:bg-primary hover:text-black font-semibold text-primary shadow-lg hover:shadow-primary/20">
                    <span>Download CV</span> <DownloadIcon size={18} />
                  </button>
                </a>
              </div>
            </TransitionReveal>

            <TransitionReveal addClass="flex justify-center relative" delay={0.2}>
              <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl group hover:border-primary/80 transition-all duration-500">
                <Image
                  src={"/images/bg/philip.jpeg"}
                  alt="Philip Oyenola"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
              </div>
            </TransitionReveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
