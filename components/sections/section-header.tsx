import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  eyebrow?: string;
  ctaHref?: string;
  className?: string;
}

export function SectionHeader({ title, eyebrow, ctaHref, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div>
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">{eyebrow}</p>}
        <h2 className="font-display text-2xl md:text-3xl">{title}</h2>
      </div>
      {ctaHref && (
        <Link href={ctaHref} className="group inline-flex items-center text-sm font-semibold text-brand-700 hover:text-brand-800">
          View all
          <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
