import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import g7 from "@/assets/gallery-7.jpg";
import hero from "@/assets/hero-cafe.jpg";
import drink from "@/assets/drink-coconut.jpg";
import beans from "@/assets/beans.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

type Tile = { src: string; alt: string; col: string; aspect: string; offset?: string; caption?: string; depth?: number };

const tiles: Tile[] = [
  { src: g2, alt: "Latte being poured", col: "col-span-12 md:col-span-7 md:col-start-2", aspect: "aspect-[16/11]", caption: "The pour, 07:42", depth: 50 },
  { src: g3, alt: "Wooden shelves and ceramic jars", col: "col-span-6 md:col-span-3 md:col-start-10", aspect: "aspect-[3/4]", offset: "md:translate-y-24", depth: 80 },
  { src: hero, alt: "Cafe interior with terracotta walls", col: "col-span-12 md:col-span-5 md:col-start-1", aspect: "aspect-[3/4]", caption: "The room, in the morning", depth: 60 },
  { src: g5, alt: "Cream swirling abstract", col: "col-span-6 md:col-span-3 md:col-start-7", aspect: "aspect-square", offset: "md:-translate-y-12", depth: 40 },
  { src: drink, alt: "Iced coconut latte from above", col: "col-span-6 md:col-span-3 md:col-start-10", aspect: "aspect-square", offset: "md:-translate-y-32", depth: 90 },
  { src: g7, alt: "Tea leaves and matcha", col: "col-span-12 md:col-span-6 md:col-start-2", aspect: "aspect-[4/5]", caption: "Matcha, 抹茶", depth: 70 },
  { src: g1, alt: "Empty cafe interior with pendant lights", col: "col-span-6 md:col-span-3 md:col-start-9", aspect: "aspect-[3/4]", offset: "md:translate-y-16", depth: 50 },
  { src: g4, alt: "Two iced lattes on marble", col: "col-span-12 md:col-span-8 md:col-start-3", aspect: "aspect-[16/10]", depth: 80 },
  { src: beans, alt: "Roasted coffee beans", col: "col-span-6 md:col-span-3 md:col-start-2", aspect: "aspect-[3/4]", offset: "md:-translate-y-8", depth: 40 },
  { src: g6, alt: "Cafe storefront at dusk", col: "col-span-6 md:col-span-5 md:col-start-7", aspect: "aspect-[16/11]", caption: "Inge Street, dusk", depth: 60 },
];

// Per-tile parallax — image moves inside its frame
const ParallaxTile = ({ t, i }: { t: Tile; i: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const depth = t.depth ?? 60;
  // image slides up as user scrolls past — frame stays put
  const y = useTransform(scrollYProgress, [0, 1], [depth, -depth]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.08, 1.15]);

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, delay: (i % 3) * 0.08, ease }}
      className={`${t.col} ${t.offset ?? ""} group`}
    >
      <div className={`${t.aspect} overflow-hidden rounded-sm bg-vanilla relative`}>
        <motion.img
          src={t.src}
          alt={t.alt}
          loading="lazy"
          style={{ y, scale }}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />
      </div>
      {t.caption && (
        <figcaption className="mt-3 text-eyebrow text-espresso/50">{t.caption}</figcaption>
      )}
    </motion.figure>
  );
};

const GalleryPage = () => (
  <SiteLayout>
    <section className="container pt-36 md:pt-48 pb-20">
      <div className="grid grid-cols-12 gap-6 items-end">
        <div className="col-span-12 md:col-span-8">
          <p className="text-eyebrow text-jade">Gallery · 影像</p>
          <h1 className="font-serif text-[15vw] md:text-[10vw] leading-[0.9] mt-4 text-espresso font-light">
            Small things,<br/>
            <span className="font-script text-jade text-[14vw] md:text-[9vw]">in soft light.</span>
          </h1>
        </div>
        <p className="col-span-12 md:col-span-3 md:col-start-10 text-espresso/70 text-sm leading-relaxed">
          A loose archive of the room, the cups and the quieter parts of an afternoon at We Lucky. Updated when we remember to.
        </p>
      </div>
    </section>

    <section className="container pb-32">
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {tiles.map((t, i) => (
          <ParallaxTile key={i} t={t} i={i} />
        ))}
      </div>
    </section>
  </SiteLayout>
);

export default GalleryPage;
