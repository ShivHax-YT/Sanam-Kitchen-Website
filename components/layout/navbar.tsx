"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Menu, Search } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { searchIndex } from "@/lib/search-index";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Recipes" },
  { href: "/videos", label: "Videos" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function NavBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (q.length < 2) return [];
    return searchIndex.filter((item) => item.title.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-30 bg-white/85 backdrop-blur border-b border-slate-200">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="mr-2 rounded-full p-2 text-slate-600 transition hover:bg-slate-100 md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="font-display text-2xl">Sanam's Kitchen</SheetTitle>
              </SheetHeader>
              <nav className="space-y-3">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="block text-lg font-semibold text-slate-800" onClick={() => setOpen(false)}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="font-display text-xl md:text-2xl">Sanam's Kitchen</Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="hidden items-center rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-brand-200 hover:text-brand-700 md:inline-flex">
              Categories
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Top picks</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {siteConfig.categories.map((cat) => (
                <DropdownMenuItem key={cat.value} asChild>
                  <Link href={`/recipes?category=${cat.value}`}>{cat.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-semibold text-slate-700 transition hover:text-brand-700">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="relative hidden w-72 lg:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              aria-label="Search recipes and videos"
              placeholder="Search recipes, videos..."
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {filtered.length > 0 && (
              <div className="absolute top-12 w-full rounded-2xl border border-slate-200 bg-white shadow-lg">
                <ul className="divide-y divide-slate-100 text-sm">
                  {filtered.map((item) => (
                    <li key={item.href} className="px-4 py-3">
                      <Link href={item.href} className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-900">{item.title}</p>
                          {item.meta && <span className="text-xs text-slate-500">{item.meta}</span>}
                        </div>
                        <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase text-slate-600">{item.type}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href={siteConfig.channelUrl} target="_blank" rel="noreferrer" aria-label="Subscribe on YouTube">
              Subscribe
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
