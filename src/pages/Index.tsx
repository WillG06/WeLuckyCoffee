import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, MouseEvent } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { menuItems } from "@/data/menu";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import pearlsMacro from "@/assets/pearls-macro.jpg";
import beans from "@/assets/beans.jpg";
import coconutLatte from "@/assets/menu-coconut-latte.png";

const ease = [0.22, 1, 0.36, 1] as const;

const Home = () => {
  // ─── Hero mouse parallax ────────────────────────────────────────
  // All motion values and springs are defined at the top level (no hooks in JSX).
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);

  const spring = { stiffness: 55, damping: 20 };
  const springFast = { stiffness: 80, damping: 16 };

  // Glow orb — deepest, moves most
  const glowX = useSpring(useTransform(mvX, [-1, 1], [-36, 36]), spring);
  const glowY = useSpring(useTransform(mvY, [-1, 1], [-36, 36]), spring);

  // Warm counter-glow — opposite direction for depth
  const warmX = useSpring(useTransform(mvX, [-1, 1], [22, -22]), spring);
  const warmY = useSpring(useTransform(mvY, [-1, 1], [22, -22]), spring);

  // Floating pearls layer
  const pearlLayerX = useSpring(useTransform(mvX, [-1, 1], [-28, 28]), spring);
  const pearlLayerY = useSpring(useTransform(mvY, [-1, 1], [-28, 28]), spring);

  // Drink image — parallax + 3D tilt
  const drinkX = useSpring(useTransform(mvX, [-1, 1], [-16, 16]), spring);
  const drinkY = useSpring(useTransform(mvY, [-1, 1], [-16, 16]), spring);
  const drinkRotX = useSpring(useTransform(mvY, [-1, 1], [7, -7]), springFast);
  const drinkRotY = useSpring(useTransform(mvX, [-1, 1], [-9, 9]), springFast);

  // Text panel subtle drift
  const textX = useSpring(useTransform(mvX, [-1, 1], [-6, 6]), spring);
  const textY = useSpring(useTransform(mvY, [-1, 1], [-6, 6]), spring);

  const handleHeroMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mvX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    mvY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handleHeroMouseLeave = () => {
    mvX.set(0);
    mvY.set(0);
  };

  // ─── Pearls section parallax ────────────────────────────────────
  const pearlsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pearlsP } = useScroll({
    target: pearlsRef,
    offset: ["start end", "end start"],
  });
  const pearlsBgY = useTransform(pearlsP, [0, 1], ["-10%", "10%"]);

  const featured = menuItems.filter((m) =>
    ["coconut-latte", "brown-sugar", "matcha", "flat-white"].includes(m.id)
  );

  // ─── Shared section card styles ─────────────────────────────────
  // FIX: Sections use normal document flow — no framer-motion y transforms on wrappers,
  // no large negative margins that were hiding content. Only a small -mt-8 is used
  // purely for the visual "card peels over" rounded-top effect.
  // z-index escalates with each card so later sections paint over earlier ones.
  const cardBase =
    "-mt-8 rounded-t-[2rem] md:rounded-t-[3rem] will-change-transform";

  return (
    <SiteLayout>

      {/* ═══════════════════════════════════════════════════════════
          HERO — editorial split layout
          Left: large typographic panel  |  Right: interactive 3D scene
          z-index: 10 — sits above SiteLayout's base
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[100svh] bg-linen overflow-hidden z-10"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
        {/* Ghost 幸运 watermark — purely decorative */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            className="font-serif text-[30vw] text-espresso leading-none tracking-tighter"
            style={{ opacity: 0.07 }}
          >
            幸运
          </span>
        </div>

        {/* Subtle rule grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(44,24,16,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(44,24,16,0.035) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Main split grid */}
        <div className="relative z-10 container min-h-[100svh] grid grid-cols-1 lg:grid-cols-[54%_46%] items-center">

          {/* ── LEFT: editorial text panel ── */}
          <motion.div
            style={{ x: textX, y: textY }}
            className="flex flex-col justify-center pt-36 pb-12 lg:pt-0 lg:pb-0 lg:pr-12"
          >
            {/* Top eyebrow with ruled line */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.1 }}
              className="flex items-center gap-3 mb-10"
            >
              <div className="w-8 h-px bg-espresso/30" />
              <span className="text-eyebrow text-espresso/55">
                Birmingham · Est. 2024
              </span>
            </motion.div>

            {/* Primary headline */}
            <h1 className="font-serif font-light text-espresso leading-[0.88] tracking-[-0.03em]">
              <motion.span
                initial={{ opacity: 0, y: 44 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease, delay: 0.2 }}
                className="block text-[14vw] md:text-[9.5vw] lg:text-[8vw]"
              >
                We Lucky
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 44 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease, delay: 0.36 }}
                className="block font-script text-jade text-[16vw] md:text-[11vw] lg:text-[9.2vw] leading-[0.85] -ml-0.5"
              >
                coffee.
              </motion.span>
            </h1>

            {/* Animated rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease, delay: 0.6 }}
              className="origin-left mt-8 mb-8 h-px w-20 bg-espresso/25"
            />

            {/* Tagline + CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.58 }}
              className="space-y-7"
            >
              <p className="max-w-xs text-sm text-espresso/65 leading-relaxed">
                A small Chinese coffee and boba house on Inge Street.
                Single-origin espresso, pearls cooked every morning.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 bg-espresso text-linen text-eyebrow px-6 py-3 rounded-full hover:bg-jade transition-all duration-500 ease-luxe"
                >
                  See the menu
                </Link>
                <Link
                  to="/visit"
                  className="text-eyebrow text-espresso/65 hover:text-jade transition-colors duration-500 underline-offset-4 hover:underline"
                >
                  Find us
                </Link>
              </div>
            </motion.div>

            {/* Bottom meta strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-16 lg:mt-20 flex items-center gap-5 text-eyebrow text-espresso/38"
            >
              <span>Coffee · 咖啡</span>
              <span className="text-jade/60">·</span>
              <span>Boba · 珍珠</span>
              <span className="text-jade/60">·</span>
              <span className="hidden sm:inline">Dine-in only · 仅堂食</span>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: interactive 3D drink scene ── */}
          <div className="relative flex items-center justify-center min-h-[55vw] lg:min-h-[100svh]">

            {/* Layer 1 — jade ambient glow */}
            <motion.div
              className="absolute w-[60%] aspect-square rounded-full blur-[100px]"
              style={{
                background: "radial-gradient(circle, rgba(45,106,79,0.22) 0%, transparent 70%)",
                x: glowX,
                y: glowY,
              }}
            />

            {/* Layer 2 — warm counter-glow for depth */}
            <motion.div
              className="absolute w-[38%] aspect-square rounded-full blur-[80px] translate-y-10 translate-x-6"
              style={{
                background: "radial-gradient(circle, rgba(210,180,140,0.28) 0%, transparent 70%)",
                x: warmX,
                y: warmY,
              }}
            />

            {/* Outer decorative ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.8, ease, delay: 0.5 }}
              className="absolute w-[68%] aspect-square rounded-full border border-jade/10"
            />

            {/* Inner decorative ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.8, ease, delay: 0.65 }}
              className="absolute w-[52%] aspect-square rounded-full border border-espresso/8"
            />

            {/* Layer 3 — floating boba pearls */}
            <motion.div
              style={{ x: pearlLayerX, y: pearlLayerY }}
              className="absolute inset-0 pointer-events-none"
            >
              {[
                { w: 20, h: 20, top: "18%", left: "12%", dur: 3.2, delay: 0 },
                { w: 13, h: 13, top: "34%", left: "6%", dur: 4.0, delay: 0.9 },
                { w: 24, h: 24, top: "14%", right: "11%", dur: 3.6, delay: 1.3 },
                { w: 16, h: 16, top: "62%", right: "16%", dur: 2.9, delay: 0.5 },
                { w: 11, h: 11, bottom: "28%", left: "18%", dur: 3.4, delay: 1.7 },
                { w: 18, h: 18, top: "48%", right: "5%", dur: 4.3, delay: 2.1 },
                { w: 14, h: 14, bottom: "18%", right: "28%", dur: 3.0, delay: 0.3 },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: p.w,
                    height: p.h,
                    top: p.top,
                    left: p.left,
                    right: p.right,
                    bottom: p.bottom,
                    background:
                      i % 3 === 0
                        ? "rgba(44,24,16,0.65)"
                        : i % 3 === 1
                        ? "rgba(44,24,16,0.42)"
                        : "rgba(45,106,79,0.35)",
                  }}
                  animate={{ y: [0, -(p.h * 0.8), 0], opacity: [0.55, 0.9, 0.55] }}
                  transition={{
                    duration: p.dur,
                    delay: p.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>

            {/* Layer 4 — main drink with 3D tilt */}
            <motion.div
              style={{ x: drinkX, y: drinkY, perspective: 1400 }}
              initial={{ opacity: 0, y: 60, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.7, ease, delay: 0.38 }}
              className="relative z-10"
            >
              <motion.div
                style={{
                  rotateX: drinkRotX,
                  rotateY: drinkRotY,
                  transformStyle: "preserve-3d",
                }}
              >
                <img
                  src={coconutLatte}
                  alt="Coconut Iced Latte — house signature"
                  className="relative w-[52vw] max-w-[270px] lg:max-w-[310px] h-auto select-none pointer-events-none"
                  style={{ filter: "drop-shadow(0 60px 90px rgba(44,24,16,0.30))" }}
                  draggable={false}
                />
              </motion.div>

              {/* Product label */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-center"
              >
                <span className="text-eyebrow text-espresso/45">
                  Coconut Iced Latte · 生椰拿铁
                </span>
              </motion.div>
            </motion.div>

            {/* Steam particles — above the drink */}
            <div className="absolute top-[8%] left-1/2 -translate-x-1/2 pointer-events-none z-20">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: 2,
                    height: 28,
                    left: (i - 1) * 14,
                    background:
                      "linear-gradient(to top, rgba(44,24,16,0.18), transparent)",
                  }}
                  animate={{
                    y: [0, -44],
                    opacity: [0.45, 0],
                    scaleX: [1, 2.2],
                  }}
                  transition={{
                    duration: 2.2,
                    delay: i * 0.45,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            {/* Decorative Chinese characters — rotated, layered in background */}
            <motion.div
              initial={{ opacity: 0, rotate: -8 }}
              animate={{ opacity: 1, rotate: -10 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="absolute bottom-[16%] left-[6%] font-serif leading-none select-none pointer-events-none"
              style={{ fontSize: "clamp(3rem, 7vw, 5rem)", color: "rgba(45,106,79,0.18)" }}
            >
              幸
            </motion.div>
            <motion.div
              initial={{ opacity: 0, rotate: 4 }}
              animate={{ opacity: 1, rotate: 7 }}
              transition={{ duration: 1.2, delay: 1.0 }}
              className="absolute top-[16%] right-[8%] font-serif leading-none select-none pointer-events-none"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4rem)", color: "rgba(44,24,16,0.12)" }}
            >
              运
            </motion.div>
          </div>
        </div>

        {/* Bottom info strip */}
        <div className="absolute bottom-0 inset-x-0 border-t border-espresso/10 bg-linen/60 backdrop-blur-sm z-10">
          <div className="container py-4 flex items-center justify-between text-eyebrow text-espresso/50">
            <span>Coffee · 咖啡</span>
            <span className="hidden sm:inline">Boba · 珍珠</span>
            <span className="text-jade">Dine-in only · 仅堂食</span>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          EDITORIAL STORY — card layer 2
          FIX: No framer-motion y transform. Only -mt-8 for the
          visual rounded-top overlap. Content is fully visible.
      ═══════════════════════════════════════════════════════════ */}
      <section
        className={`relative py-32 md:py-44 bg-vanilla overflow-hidden z-20 shadow-[0_-20px_50px_-16px_rgba(0,0,0,0.18)] ${cardBase}`}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src={beans}
            alt=""
            aria-hidden
            className="w-full h-full object-cover mix-blend-multiply"
            style={{ opacity: 0.08 }}
            loading="lazy"
          />
          <div className="absolute -right-32 -top-32 w-[36rem] h-[36rem] rounded-full blur-3xl" style={{ background: "rgba(45,106,79,0.08)" }} />
        </div>

        <div className="container grid grid-cols-12 gap-6 relative">
          <div className="col-span-12 md:col-span-6">
            <p className="text-eyebrow text-jade">Our story · 故事</p>
            <h2 className="font-serif text-5xl md:text-7xl leading-[1.02] mt-6 text-espresso font-light">
              A small
              <br />
              <span className="italic">corner</span> of
              <br />
              <span className="font-script text-jade text-6xl md:text-8xl leading-none">
                good luck.
              </span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-8 md:pt-20 space-y-6 text-espresso/75 leading-relaxed">
            <p>
              We Lucky is a small Chinese coffee and boba house on Inge Street.
              We pour single-origin espresso, cook our own pearls, and let the
              day pass slowly.
            </p>
            <p>We don't take orders online. Walk in, sit down, stay a while.</p>
            <Link
              to="/about"
              className="inline-block text-eyebrow border-b border-espresso pb-1 hover:text-jade hover:border-jade transition-colors duration-500"
            >
              The full story →
            </Link>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          PEARLS — full-bleed parallax  |  card layer 3
      ═══════════════════════════════════════════════════════════ */}
      <section
        ref={pearlsRef}
        className={`relative h-[80vh] md:h-screen overflow-hidden z-30 shadow-[0_-20px_50px_-16px_rgba(0,0,0,0.22)] ${cardBase}`}
      >
        <motion.div style={{ y: pearlsBgY }} className="absolute inset-0 scale-110">
          <img
            src={pearlsMacro}
            alt="Hand-cooked tapioca pearls"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "rgba(44,24,16,0.40)" }} />

        <div className="relative z-10 h-full container flex flex-col justify-between py-20 text-linen">
          <p className="text-eyebrow text-linen/80">珍珠 · pearls</p>
          <div className="grid grid-cols-12 gap-6 items-end">
            <h2 className="col-span-12 md:col-span-8 font-serif font-light text-4xl sm:text-5xl md:text-7xl leading-[0.95]">
              Simmered slowly in
              <br />
              <span className="font-script text-jade-soft text-5xl sm:text-6xl md:text-8xl">
                brown sugar
              </span>
              ,<br />
              every single morning.
            </h2>
            <p className="col-span-12 md:col-span-3 md:col-start-10 text-linen/75 leading-relaxed text-sm">
              Soft and chewy with a caramel pull. Best in our brown sugar latte
              or a tall iced jasmine.
            </p>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          FEATURED MENU — card layer 4
      ═══════════════════════════════════════════════════════════ */}
      <section
        className={`relative pb-28 md:pb-44 bg-linen z-40 shadow-[0_-20px_50px_-16px_rgba(0,0,0,0.28)] ${cardBase}`}
      >
        <div className="container pt-20 md:pt-28">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-16 md:mb-24">
            <div>
              <p className="text-eyebrow text-jade">Selected · 招牌</p>
              <h2 className="font-serif font-light text-4xl sm:text-5xl md:text-7xl mt-4 leading-none text-espresso">
                House favourites
              </h2>
            </div>
            <Link
              to="/menu"
              className="text-eyebrow border-b border-espresso pb-1 hover:text-jade hover:border-jade transition-colors duration-500"
            >
              Full menu →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12">
            {featured.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, delay: i * 0.1, ease }}
                className="group relative"
              >
                <div className="relative aspect-[3/4] flex items-end justify-center pt-12 overflow-visible">
                  <div className="absolute inset-x-2 bottom-0 top-16 bg-vanilla/50 rounded-sm transition-all duration-700 ease-luxe group-hover:bg-vanilla group-hover:inset-x-0 group-hover:top-10" />
                  <div className="absolute inset-x-6 bottom-6 h-1/2 rounded-full bg-jade/0 blur-2xl transition-all duration-700 group-hover:bg-jade/20" />
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="relative h-[118%] w-auto object-contain -translate-y-4 drop-shadow-[0_30px_35px_rgba(60,40,20,0.2)] transition-all duration-700 ease-luxe group-hover:scale-[1.18] group-hover:-rotate-[8deg] group-hover:-translate-y-10"
                  />
                </div>
                <div className="mt-5 px-2">
                  <p className="font-script text-jade text-xl">{item.zh}</p>
                  <h3 className="font-serif text-lg mt-1 text-espresso">
                    {item.name}
                  </h3>
                  <p className="text-xs text-espresso/50 mt-1">{item.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          DARK GALLERY — card layer 5
      ═══════════════════════════════════════════════════════════ */}
      <section
        className={`relative py-28 md:py-36 bg-espresso text-linen overflow-hidden z-50 shadow-[0_-30px_70px_-20px_rgba(0,0,0,0.48)] ${cardBase}`}
      >
        <div className="container relative">
          <div className="grid grid-cols-12 gap-6 mb-16">
            <div className="col-span-12 md:col-span-7">
              <p className="text-eyebrow text-jade-soft">A glimpse · 一瞥</p>
              <h2 className="font-serif font-light text-5xl md:text-6xl mt-4 leading-[1.05]">
                Inside the room,
                <br />
                <span className="font-script text-jade-soft text-6xl md:text-7xl">
                  small moments.
                </span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-3 md:col-start-10 md:self-end">
              <Link
                to="/gallery"
                className="text-eyebrow border-b border-jade-soft pb-1 hover:text-jade-soft transition-colors duration-500"
              >
                Open the gallery →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease }}
              className="col-span-7 aspect-[4/3] overflow-hidden rounded-sm"
            >
              <img
                src={gallery2}
                alt="Latte being poured"
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s] ease-luxe"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.15, ease }}
              className="col-span-5 aspect-[4/5] overflow-hidden rounded-sm md:translate-y-12"
            >
              <img
                src={gallery3}
                alt="Wooden shelves with ceramic jars"
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s] ease-luxe"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease }}
              className="col-span-12 md:col-span-6 md:col-start-4 aspect-[16/10] overflow-hidden rounded-sm"
            >
              <img
                src={gallery5}
                alt="Cream swirling in coffee"
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s] ease-luxe"
              />
            </motion.div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          MARQUEE — sits above gallery
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-12 border-y border-border overflow-hidden bg-linen relative z-[55]">
        <div className="flex marquee-track whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center shrink-0">
              {[
                "生椰拿铁 · Coconut Latte",
                "黑糖珍珠 · Brown Sugar Boba",
                "茉莉花茶 · Iced Jasmine",
                "多肉青提 · Green Grape Cooler",
                "招牌拿铁 · House Latte",
                "草莓抹茶 · Strawberry Matcha",
              ].map((t, i) => (
                <span
                  key={`${k}-${i}`}
                  className="font-serif text-3xl md:text-5xl text-espresso/80 mx-10"
                >
                  {t}{" "}
                  <span className="text-jade mx-6">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          VISIT — final section, no overlap needed
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative bg-linen z-[60]">
        <div className="container py-28 md:py-32 grid grid-cols-12 gap-6 items-center">
          <div className="col-span-12 md:col-span-6">
            <p className="text-eyebrow text-jade">Visit · 来坐坐</p>
            <h2 className="font-serif font-light text-5xl md:text-7xl mt-6 leading-[0.95] text-espresso">
              Inge Street,
              <br />
              <span className="italic">Southside</span>,
              <br />
              <span className="font-script text-jade">Birmingham.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8 space-y-6 text-espresso/75">
            <p className="leading-relaxed">
              Tucked off the high street, our room is small, soft, and rarely
              rushed. We're dine-in only — no online orders, no delivery apps.
              Just walk in.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-espresso/15">
              <div>
                <p className="text-eyebrow">Hours</p>
                <p className="text-sm mt-2">
                  Mon–Sun
                  <br />
                  10am — 7pm
                </p>
              </div>
              <div>
                <p className="text-eyebrow">Address</p>
                <p className="text-sm mt-2">
                  Unit 5, Southside
                  <br />
                  Inge St, B5 4AR
                </p>
              </div>
            </div>
            <Link
              to="/visit"
              className="inline-block text-eyebrow border-b border-espresso pb-1 hover:text-jade hover:border-jade transition-colors duration-500"
            >
              Plan a visit →
            </Link>
          </div>
        </div>
      </section>

    </SiteLayout>
  );
};

export default Home;