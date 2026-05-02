import { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export const SiteLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-linen text-espresso">
    <SiteHeader />
    <main>{children}</main>
    <SiteFooter />
  </div>
);
