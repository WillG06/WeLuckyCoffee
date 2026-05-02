import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import { menuItems, MenuItem } from "@/data/menu";

const ease = [0.22, 1, 0.36, 1] as const;
const categories = ["All", "Coffee", "Boba", "Tea"] as const;
type Cat = typeof categories[number];

const MenuPage = () => {
  const [cat, setCat] = useState<Cat>("All");
  const filtered = cat === "All" ? menuItems : menuItems.filter((m) => m.category === cat);

  return (
    <SiteLayout>
      <section className="container pt-36 md:pt-48 pb-12">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-8">
            <p className="text-eyebrow text-jade">The menu · 菜单</p>
            <h1 className="font-serif text-[14vw] md:text-[8vw] leading-[0.9] mt-4">
              Cups, slowly<br/>
              <span className="font-script text-jade">made by hand.</span>
            </h1>
          </div>
          <div className="col-span-12 md:col-span-3 md:col-start-10 text-espresso/70 text-sm leading-relaxed">
            Hover any cup to see it tilt and lift. Prices include all the small things — the syrup, the pearls, the smile across the counter.
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-y border-border py-5 sticky top-[68px] bg-linen/90 backdrop-blur-md z-30">
        <div className="container flex flex-wrap items-center gap-x-8 gap-y-3">
          {categories.map((c) => (
            <button key={c}
              onClick={() => setCat(c)}
              className={`text-eyebrow transition-colors duration-500 ${cat === c ? "text-jade" : "text-espresso/50 hover:text-espresso"}`}>
              {c}
              {cat === c && <span className="ml-2 inline-block w-6 h-px bg-jade align-middle" />}
            </button>
          ))}
          <span className="text-eyebrow text-espresso/40 ml-auto">{filtered.length} items</span>
        </div>
      </section>

      {/* Dine-in note */}
      <section className="container pt-8">
        <p className="text-eyebrow text-jade">Dine-in only · 仅堂食 — we don't take orders online or via delivery apps.</p>
      </section>

      {/* Grid */}
      <section className="container py-16 md:py-20 overflow-visible">
        <AnimatePresence mode="wait">
          <motion.div
            key={cat}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-16"
          >
            {filtered.map((item, i) => (
              <DrinkCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
    </SiteLayout>
  );
};

const DrinkCard = ({ item, index }: { item: MenuItem; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay: index * 0.05, ease }}
    className="group relative cursor-pointer"
    style={{ perspective: 1000 }}
  >
    <div className="relative aspect-[3/4] flex items-end justify-center pt-16 overflow-visible">
      {/* Surface plate sits below the drink so the cup pokes out of the top */}
      <div className="absolute inset-x-2 bottom-0 top-20 bg-vanilla/45 rounded-sm transition-all duration-700 ease-luxe group-hover:bg-vanilla group-hover:inset-x-0 group-hover:top-12" />
      {/* Soft jade halo on hover */}
      <div className="absolute inset-x-6 bottom-6 h-2/3 rounded-full bg-jade/0 blur-2xl transition-all duration-700 group-hover:bg-jade/20" />
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        className="relative h-[125%] w-auto object-contain -translate-y-6 drop-shadow-[0_30px_35px_rgba(60,40,20,0.22)] transition-all duration-700 ease-luxe group-hover:scale-[1.22] group-hover:-rotate-[9deg] group-hover:-translate-y-14"
      />
      <span className="absolute top-3 right-3 text-eyebrow text-espresso/40 transition-opacity duration-500 group-hover:opacity-0">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
    <div className="mt-5 flex items-start justify-between gap-3">
      <div>
        <p className="font-script text-jade text-xl leading-none">{item.zh}</p>
        <h3 className="font-serif text-lg mt-1.5">{item.name}</h3>
        <p className="text-xs text-espresso/55 mt-1.5 leading-relaxed">{item.notes}</p>
      </div>
      <span className="font-serif text-base text-espresso shrink-0">{item.price}</span>
    </div>
  </motion.article>
);

export default MenuPage;
