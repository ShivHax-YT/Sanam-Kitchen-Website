import Link from "next/link";
import { PageShell } from "./page-shell";

const footerLinks = {
  popular: [
    { label: "Paneer Tikka Wrap", href: "/recipes/paneer-tikka-wrap" },
    { label: "Chai-Spiced Oats", href: "/recipes/chai-spiced-overnight-oats" },
    { label: "Punjabi Chole", href: "/recipes/punjabi-chole-bhature" },
  ],
  new: [
    { label: "Creamy Tomato Pasta", href: "/recipes/creamy-tomato-pasta" },
    { label: "Tandoori Gobhi", href: "/recipes/tandoori-gobhi" },
    { label: "Mango Lassi", href: "/recipes/mango-lassi" },
  ],
  collections: [
    { label: "Recipes", href: "/recipes" },
    { label: "Videos", href: "/videos" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-50 pt-12 text-sm text-slate-700">
      <PageShell>
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Popular</p>
            <ul className="space-y-2">
              {footerLinks.popular.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-brand-700">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">What's New</p>
            <ul className="space-y-2">
              {footerLinks.new.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-brand-700">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Search Recipes</p>
            <form className="relative">
              <input
                aria-label="Search recipes"
                className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
                placeholder="Try paneer, oats, chai"
              />
            </form>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Collections</p>
            <ul className="space-y-2">
              {footerLinks.collections.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-brand-700">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-200 py-6 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Sanam's Kitchen. Crafted for food lovers.</p>
        </div>
      </PageShell>
    </footer>
  );
}
