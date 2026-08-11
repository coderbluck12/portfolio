"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { cormorant } from "@/lib/utils/fonts";

const Intro = () => {
  const meRef = useRef(null);

  useLayoutEffect(() => {
    const cxt = gsap.context(() => {
      gsap
        .timeline()
        .set(meRef.current, { visibility: "visible", delay: 0.2 })
        .from("#dev_text", { y: -20, opacity: 0, ease: "power2.out", duration: 0.8 })
        .from(".land_t", { y: 30, opacity: 0, ease: "power2.out", duration: 0.8 }, "-=0.4")
        .from(".land_modern", { y: 30, opacity: 0, ease: "power2.out", duration: 0.8 }, "-=0.6")
        .from(".land_likkle", { opacity: 0, y: 20, duration: 0.8 }, "-=0.4");
    }, meRef);

    return () => cxt.revert();
  }, []);

  return (
    <div className="container mx-auto px-4 overflow-hidden">
      <section className="flex items-center justify-center min-h-screen py-20 section invisible" id="me" ref={meRef}>
        <div className="text-center space-y-6 max-w-5xl mx-auto">
          <h1
            className="text-base md:text-xl font-bold text-primary uppercase tracking-widest"
            id="dev_text"
          >
            FullStack Web Developer
          </h1>

          <div className="font-extrabold text-primary text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] tracking-tight leading-none uppercase">
            <p className="land_t text-white">CRAFTING</p>
            <p className="land_modern text-primary drop-shadow-[0_0_25px_rgba(34,197,94,0.3)]">MODERNIZED</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-slate-300 text-lg md:text-2xl font-light land_likkle pt-2">
            <span className={`${cormorant.className} font-bold text-white text-2xl md:text-4xl text-primary`}>
              Digital Experiences
            </span>
            <span>for your business, brand, and scale.</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Intro;
