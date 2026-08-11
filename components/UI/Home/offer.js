import services from "@/lib/store/services";
import { TransitionFromBottom, TransitionParent } from "@/lib/utils/transitions";

const Offer = () => {
  return (
    <section className="container mx-auto my-28">
      <div className="mb-12">
        <span className="text-xs uppercase tracking-widest text-primary font-bold">Solutions</span>
        <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-1">
          Services & Expertise<span className="text-primary">.</span>
        </h3>
      </div>

      <TransitionParent addClass="grid grid-cols-1 gap-8 md:grid-cols-3 sm:grid-cols-2">
        {services.map((service, idx) => (
          <TransitionFromBottom
            key={idx}
            addClass="p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:border-primary/40 hover:bg-primary/[0.04] transition-all duration-300 group cursor-default shadow-xl"
          >
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center text-4xl text-primary group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              <h4 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                {service.type}
              </h4>
              <div className="text-slate-300 text-sm leading-relaxed">{service.description}</div>
            </div>
          </TransitionFromBottom>
        ))}
      </TransitionParent>
    </section>
  );
};

export default Offer;
