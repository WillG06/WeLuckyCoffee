import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import hero from "@/assets/hero-cafe.jpg";
import beans from "@/assets/beans.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g7 from "@/assets/gallery-7.jpg";
import storefront from "@/assets/storefront.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <SiteLayout>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[80svh] bg-linen overflow-hidden">
        <motion.div style={{ y: heroImgY }} className="absolute inset-0">
          <img src={hero} alt="" aria-hidden className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-linen/30 via-linen/70 to-linen" />
        </motion.div>

        <div className="relative container pt-32 md:pt-44 pb-16">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-10">
              <p className="text-eyebrow text-jade">Our story · 我们的故事</p>
              <h1 className="font-serif font-light text-[15vw] md:text-[9vw] leading-[0.88] mt-4 text-espresso tracking-[-0.03em]">
                A small room,<br/>
                <span className="italic">a slow</span><br/>
                <span className="font-script text-jade text-[16vw] md:text-[10vw] leading-[0.9]">cup of luck.</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO PULL QUOTE */}
      <section className="container -mt-8 md:-mt-16 relative z-10 pb-28 md:pb-32">
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 1.2, ease }}
            className="col-span-12 md:col-span-5 aspect-[4/5] overflow-hidden rounded-sm md:translate-y-12 shadow-soft"
          >
            <img src={hero} alt="The room" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 space-y-6 md:pt-16 text-espresso/80 leading-relaxed">
            <p className="font-serif text-2xl md:text-3xl text-espresso italic font-light leading-snug">
              "We opened We Lucky because we missed the small tea houses we grew up in — the kind where nobody hurries you."
            </p>
            <p>
              The room on Inge Street started with one wall of paint, a borrowed espresso machine, and a recipe for brown sugar pearls that took our grandmother three weeks to write down. A year on, it is still a small room with a small menu, and that is on purpose.
            </p>
            <p>
              We work with a single Birmingham roaster, cook our pearls every morning, and bring loose-leaf jasmine and matcha back from a small importer in Manchester. Nothing here is a system. Everything is by hand.
            </p>
          </div>
        </div>
      </section>

      {/* THREE THINGS — full-bleed sage */}
      <section className="bg-vanilla py-24 md:py-36 relative overflow-hidden">
        <div className="absolute -left-32 top-1/3 w-[28rem] h-[28rem] rounded-full bg-jade/10 blur-3xl drift" />
        <div className="container relative">
          <div className="grid grid-cols-12 gap-6 mb-14 md:mb-20">
            <div className="col-span-12 md:col-span-7">
              <p className="text-eyebrow text-jade">三件事 · Three things</p>
              <h2 className="font-serif font-light text-4xl md:text-6xl mt-4 leading-[1.05] text-espresso">
                What we<br/><span className="font-script text-jade">care about.</span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-x-6 gap-y-12">
            {[
              { en: "Slow", zh: "慢", body: "We pull each shot, steam each jug, simmer each pearl. Nothing is faster for being rushed — and most things are better for it." },
              { en: "Soft", zh: "柔", body: "Warm walls, low music, room to think. The cafe is, in some ways, an excuse for the room. Stay as long as you like." },
              { en: "Lucky", zh: "幸运", body: "A small kindness with every cup. The luck is mostly yours — we just hand it over with the saucer." },
            ].map((v, i) => (
              <motion.div key={v.en}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.12, ease }}
                className="col-span-12 sm:col-span-6 md:col-span-4 border-t border-espresso/15 pt-8">
                <p className="font-script text-jade text-7xl md:text-8xl leading-none">{v.zh}</p>
                <h3 className="font-serif text-2xl md:text-3xl mt-4 text-espresso">{v.en}</h3>
                <p className="text-espresso/70 mt-4 leading-relaxed text-sm">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* THE ROOM — image collage */}
      <section className="container py-24 md:py-32">
        <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-7">
            <p className="text-eyebrow text-jade">The room · 房间</p>
            <h2 className="font-serif font-light text-4xl md:text-6xl mt-4 leading-[1.05] text-espresso">
              Built one wall<br/><span className="font-script text-jade">at a time.</span>
            </h2>
          </div>
          <p className="col-span-12 md:col-span-4 md:col-start-9 text-espresso/70 text-sm leading-relaxed md:pt-6">
            We did most of it ourselves — the pendant lights, the bar, the wonky shelf above the till that we keep meaning to fix.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            className="col-span-7 aspect-[4/5] overflow-hidden rounded-sm">
            <img src={g3} alt="Wooden shelves" className="w-full h-full object-cover" loading="lazy"/>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.15, ease }}
            className="col-span-5 aspect-[3/4] overflow-hidden rounded-sm md:translate-y-16">
            <img src={beans} alt="Coffee beans" className="w-full h-full object-cover" loading="lazy"/>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease }}
            className="col-span-12 md:col-span-7 md:col-start-3 aspect-[16/10] overflow-hidden rounded-sm">
            <img src={g5} alt="Cream swirling" className="w-full h-full object-cover" loading="lazy"/>
          </motion.div>
        </div>
      </section>

      {/* SOURCED — dark band */}
      <section className="bg-espresso text-linen py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
          <img src={g7} alt="" aria-hidden className="w-full h-full object-cover"/>
        </div>
        <div className="container relative grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-5">
            <p className="text-eyebrow text-jade-soft">Sourced · 选物</p>
            <h2 className="font-serif font-light text-4xl md:text-6xl mt-4 leading-[1.05]">
              Small makers,<br/><span className="font-script text-jade-soft">close to home.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 grid sm:grid-cols-2 gap-8 text-linen/80">
            {[
              { h: "Coffee", b: "Quarter Horse Roasters, Birmingham. Single-origin and seasonal." },
              { h: "Tea", b: "Tea At Eight, Manchester. Loose-leaf jasmine, oolong, gyokuro." },
              { h: "Matcha", b: "Ceremonial grade, Uji prefecture, via a small Manchester importer." },
              { h: "Pearls", b: "Made from scratch every morning. Brown sugar, tapioca, time." },
            ].map((x) => (
              <div key={x.h} className="border-t border-linen/15 pt-5">
                <p className="font-serif text-xl text-linen">{x.h}</p>
                <p className="text-sm mt-2 leading-relaxed text-linen/65">{x.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-24 md:py-32 grid grid-cols-12 gap-6 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          className="col-span-12 md:col-span-6 aspect-[4/3] overflow-hidden rounded-sm">
          <img src={storefront} alt="The storefront" className="w-full h-full object-cover" loading="lazy" />
        </motion.div>
        <div className="col-span-12 md:col-span-5 md:col-start-8">
          <p className="text-eyebrow text-jade">Come by · 来坐坐</p>
          <h2 className="font-serif font-light text-4xl md:text-5xl mt-4 leading-[1.05] text-espresso">
            We'd love to<br/><span className="font-script text-jade">meet you.</span>
          </h2>
          <p className="mt-6 text-espresso/70 leading-relaxed max-w-sm">
            Open every day on Inge Street. Walk in, sit down, stay a while.
          </p>
          <Link to="/visit" className="inline-block mt-8 text-eyebrow border border-espresso/30 px-6 py-3 rounded-full hover:bg-espresso hover:text-linen transition-all duration-500 ease-luxe">
            Plan a visit →
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
};

export default About;
