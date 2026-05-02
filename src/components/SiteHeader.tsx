import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home", zh: "首页" },
  { to: "/menu", label: "Menu", zh: "菜单" },
  { to: "/gallery", label: "Gallery", zh: "影像" },
  { to: "/about", label: "About", zh: "故事" },
  { to: "/visit", label: "Visit", zh: "来坐坐" },
];

export const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-700 ease-luxe ${scrolled ? "bg-linen/85 backdrop-blur-md border-b border-border/40" : "bg-transparent"}`}>
        <div className="container flex items-center justify-between py-5">
          <Link to="/" className="group flex items-baseline gap-2">
            <span className="font-serif text-xl tracking-tight text-espresso">We Lucky</span>
            <span className="font-script text-jade text-xl -ml-1 translate-y-0.5">coffee</span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-eyebrow transition-colors duration-500 hover:text-jade ${isActive ? "text-jade" : "text-espresso/70"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/visit"
            className="hidden md:inline-flex text-eyebrow border border-espresso/30 px-5 py-2.5 rounded-full hover:bg-espresso hover:text-linen transition-all duration-500 ease-luxe"
          >
            Dine in · 来坐坐
          </Link>

          <button onClick={() => setOpen(true)} className="md:hidden text-espresso p-2 -mr-2" aria-label="Open menu">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[100] md:hidden bg-linen flex flex-col"
              style={{ backgroundColor: "hsl(var(--linen))" }}
            >
              <div className="flex items-center justify-between px-6 py-5 shrink-0 border-b border-espresso/10">
                <Link to="/" onClick={() => setOpen(false)} className="font-serif text-xl text-espresso">
                  We Lucky <span className="font-script text-jade">coffee</span>
                </Link>
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-espresso p-2 -mr-2">
                  <X size={24} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-10 flex flex-col justify-between">
                <ul className="space-y-2">
                  {links.map((l, i) => (
                    <motion.li
                      key={l.to}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 * i + 0.1, ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
                    >
                      <Link
                        to={l.to}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline justify-between py-3 border-b border-espresso/10"
                      >
                        <span className="font-serif font-light text-4xl text-espresso group-hover:text-jade transition-colors">
                          {l.label}
                        </span>
                        <span className="font-script text-jade/70 text-lg">{l.zh}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.6 }}
                  className="mt-12 pt-8 border-t border-espresso/15"
                >
                  <p className="text-eyebrow text-jade">Find us · 来坐坐</p>
                  <p className="mt-3 font-serif text-espresso text-lg leading-snug">
                    Unit 5, Southside<br />Inge St, B5 4AR
                  </p>
                  <p className="mt-3 text-sm text-espresso/60">Dine-in only · 仅堂食</p>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
