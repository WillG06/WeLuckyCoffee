import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import storefront from "@/assets/storefront.jpg";
import g6 from "@/assets/gallery-6.jpg";
import g3 from "@/assets/gallery-3.jpg";
import strawMatcha from "@/assets/menu-strawmatcha.png";

const ease = [0.22, 1, 0.36, 1] as const;

const Visit = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <SiteLayout>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[80svh] md:min-h-[90svh] bg-linen overflow-hidden">
        <motion.div style={{ y: heroImgY }} className="absolute inset-0">
          <img src={storefront} alt="" aria-hidden className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-linen/30 via-linen/70 to-linen" />
        </motion.div>

        <div className="relative container pt-32 md:pt-44 pb-20">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-9">
              <p className="text-eyebrow text-jade">Visit · 来坐坐</p>
              <h1 className="font-serif font-light text-[16vw] md:text-[10vw] leading-[0.88] mt-4 text-espresso tracking-[-0.03em]">
                Find the<br/>
                <span className="font-script text-jade text-[18vw] md:text-[11vw] leading-[0.9]">small door.</span>
              </h1>
            </div>
            <p className="col-span-12 md:col-span-3 md:col-start-10 text-espresso/70 text-sm leading-relaxed">
              We're tucked into Southside, two minutes from the Hippodrome. If you reach the chip shop you've gone too far.
            </p>
          </div>
        </div>
      </section>

      {/* STOREFRONT — full-bleed cinematic */}
      <section className="container -mt-10 md:-mt-24 relative z-10 pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1.4, ease }}
          className="aspect-[16/10] md:aspect-[21/9] overflow-hidden rounded-sm relative shadow-soft"
        >
          <img src={storefront} alt="We Lucky Coffee storefront on Inge Street" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 bg-gradient-to-t from-espresso/80 via-espresso/30 to-transparent">
            <p className="text-eyebrow text-linen/80">Unit 5 · Inge Street</p>
            <p className="font-script text-jade-soft text-3xl md:text-5xl mt-1">we lucky coffee · 幸运咖啡</p>
          </div>
        </motion.div>
      </section>

      {/* DETAILS — generous editorial split */}
      <section className="container grid grid-cols-12 gap-6 md:gap-10 pb-28 md:pb-32">
        <div className="col-span-12 md:col-span-5">
          <p className="text-eyebrow text-jade">Address · 地址</p>
          <p className="font-serif text-3xl md:text-5xl mt-4 leading-[1.05] text-espresso font-light">
            Unit 5, Southside,<br/>Inge Street,<br/>Birmingham <span className="italic">B5 4AR</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://www.google.com/maps?q=Unit+5+Inge+St+Birmingham+B5+4AR"
              target="_blank" rel="noreferrer"
              className="text-eyebrow border border-espresso/30 px-6 py-3 rounded-full hover:bg-espresso hover:text-linen transition-all duration-500 ease-luxe"
            >
              Open in maps →
            </a>
            <Link to="/menu" className="text-eyebrow text-espresso/70 hover:text-jade transition-colors duration-500 self-center">
              See the menu
            </Link>
          </div>
        </div>

        <div className="col-span-12 md:col-span-5 md:col-start-8 space-y-10">
          <div>
            <p className="text-eyebrow text-jade">Hours · 营业时间</p>
            <ul className="mt-4 divide-y divide-espresso/10 text-espresso/85">
              {[
                ["Monday", "10am — 7pm"],
                ["Tuesday", "10am — 7pm"],
                ["Wednesday", "10am — 7pm"],
                ["Thursday", "10am — 7pm"],
                ["Friday", "10am — 9pm"],
                ["Saturday", "10am — 9pm"],
                ["Sunday", "11am — 6pm"],
              ].map(([d, h]) => (
                <li key={d} className="flex justify-between py-3 text-sm">
                  <span className="font-serif">{d}</span>
                  <span className="text-espresso/65 tabular-nums">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-eyebrow text-jade">Good to know · 须知</p>
            <ul className="mt-4 space-y-2 text-sm text-espresso/80 leading-relaxed">
              <li>· Dine-in only — no online orders or delivery apps.</li>
              <li>· Quiet enough to work or study, with free Wi-Fi.</li>
              <li>· Step-free entry. Two single-occupancy bathrooms.</li>
              <li>· Cards & contactless. We don't take cash.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* HOW TO GET HERE */}
      <section className="bg-vanilla py-24 md:py-32 relative overflow-hidden">
        <img src={strawMatcha} alt="" aria-hidden
          className="absolute -right-10 md:right-10 -top-10 w-32 md:w-48 opacity-90 float-slow pointer-events-none" loading="lazy" />
        <div className="container grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-5">
            <p className="text-eyebrow text-jade">Getting here · 怎么来</p>
            <h2 className="font-serif font-light text-4xl md:text-6xl mt-4 leading-[1.05] text-espresso">
              A two-minute<br/>walk from <span className="font-script text-jade">the Hippodrome.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 grid sm:grid-cols-2 gap-8 text-espresso/80">
            {[
              { h: "On foot", b: "From New Street, head south through the Bullring, cross Smallbrook Queensway and follow Hurst St." },
              { h: "By tram", b: "Step off at Bull Street or Grand Central, then a short walk through Chinatown." },
              { h: "By car", b: "Arcadian and Bromsgrove Street car parks are both under five minutes away on foot." },
              { h: "By bike", b: "Brompton dock at Hippodrome. We can usually keep your helmet behind the counter." },
            ].map((x) => (
              <div key={x.h}>
                <p className="font-serif text-xl text-espresso">{x.h}</p>
                <p className="text-sm mt-2 leading-relaxed text-espresso/70">{x.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="container py-24 md:py-32">
        <div className="grid grid-cols-12 gap-6 mb-10">
          <p className="col-span-12 md:col-span-3 text-eyebrow text-jade">Map · 地图</p>
          <p className="col-span-12 md:col-span-6 font-serif text-2xl md:text-3xl text-espresso/80 leading-snug font-light">
            We're the small unit on the corner — you'll see the chairs in the window before you see the sign.
          </p>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          transition={{ duration: 1.4, ease }}
          className="aspect-[16/12] sm:aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-sm border border-border bg-vanilla">
          <iframe
            title="We Lucky Coffee map"
            src="https://www.google.com/maps?q=Unit%205%20Inge%20St%20Birmingham%20B5%204AR&output=embed"
            className="w-full h-full grayscale-[40%] sepia-[10%]"
            loading="lazy"
          />
        </motion.div>
      </section>

      {/* REVIEWS */}
      <section className="bg-espresso text-linen py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
          <img src={g6} alt="" aria-hidden className="w-full h-full object-cover" />
        </div>
        <div className="container relative">
          <div className="grid grid-cols-12 gap-6 items-end mb-12 md:mb-16">
            <div className="col-span-12 md:col-span-7">
              <p className="text-eyebrow text-jade-soft">From Google · 评论</p>
              <h2 className="font-serif font-light text-4xl md:text-6xl mt-4 leading-[1.05]">
                4.9 <span className="text-jade-soft">★</span> · 56 reviews
              </h2>
            </div>
            <p className="col-span-12 md:col-span-4 md:col-start-9 text-linen/65 text-sm leading-relaxed">
              We don't ask, but people leave them anyway. A few of our favourites below.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { q: "Super calm — perfect to work or study. The interior is spacious, the decor lovely.", a: "Charlie L.", t: "Local Guide" },
              { q: "Great service, great people, great drinks. One of the best coffee shops in Birmingham.", a: "Michael H-H.", t: "Local Guide" },
              { q: "Lovely decor, nice selection of drinks! I'm deffo coming back.", a: "Alison M.", t: "Local Guide" },
            ].map((r, i) => (
              <motion.blockquote key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1, ease }}
                className="border-t border-linen/20 pt-6">
                <p className="font-serif text-lg md:text-xl leading-snug">"{r.q}"</p>
                <footer className="mt-6">
                  <p className="font-serif text-base">— {r.a}</p>
                  <p className="text-eyebrow text-jade-soft mt-1">{r.t}</p>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-24 md:py-32 grid grid-cols-12 gap-6 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          className="col-span-12 md:col-span-5 aspect-[4/5] overflow-hidden rounded-sm">
          <img src={g3} alt="Inside the room" className="w-full h-full object-cover" loading="lazy" />
        </motion.div>
        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <p className="text-eyebrow text-jade">Come by · 来坐坐</p>
          <h2 className="font-serif font-light text-4xl md:text-6xl mt-4 leading-[1.02] text-espresso">
            See you soon,<br/><span className="font-script text-jade">we'll keep a seat.</span>
          </h2>
          <p className="mt-6 text-espresso/70 leading-relaxed max-w-md">
            Thank you for taking the time. The kettle's already on.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Visit;
