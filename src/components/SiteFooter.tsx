import { Link } from "react-router-dom";

export const SiteFooter = () => (
  <footer className="bg-espresso text-linen mt-32">
    <div className="container py-20 grid md:grid-cols-12 gap-12">
      <div className="md:col-span-5">
        <p className="text-eyebrow text-sand">Est. Birmingham</p>
        <h3 className="font-serif text-5xl md:text-6xl mt-4 leading-[1.05]">
          A small luck,<br/>
          <span className="font-script text-sand text-6xl md:text-7xl">brewed slowly</span>
        </h3>
      </div>

      <div className="md:col-span-3 md:col-start-7">
        <p className="text-eyebrow text-sand mb-5">Find us</p>
        <p className="text-linen/80 leading-relaxed text-sm">
          Unit 5, Southside<br/>Inge St, Birmingham<br/>B5 4AR
        </p>
        <p className="text-linen/60 text-xs mt-4">Closed · Opens 10am Fri</p>
      </div>

      <div className="md:col-span-3">
        <p className="text-eyebrow text-sand mb-5">Wander</p>
        <ul className="space-y-2.5 text-sm">
          <li><Link to="/menu" className="hover:text-sand transition-colors">Menu</Link></li>
          <li><Link to="/gallery" className="hover:text-sand transition-colors">Gallery</Link></li>
          <li><Link to="/about" className="hover:text-sand transition-colors">Our story</Link></li>
          <li><Link to="/visit" className="hover:text-sand transition-colors">Visit</Link></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-linen/10">
      <div className="container py-6 flex flex-col md:flex-row justify-between text-xs text-linen/50">
        <p>© {new Date().getFullYear()} We Lucky Coffee · 幸运咖啡</p>
        <p>4.9 ★ · 56 reviews on Google</p>
      </div>
    </div>
  </footer>
);
