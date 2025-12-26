import { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { SectionHeader } from "@/components/sections/section-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact | Sanam's Kitchen",
  description: "Contact Sanam's Kitchen for collaborations and recipe requests.",
};

export default function ContactPage() {
  return (
    <div className="section-padding">
      <PageShell className="space-y-8">
        <SectionHeader title="Contact" eyebrow="Say hello" />
        <div className="grid gap-8 lg:grid-cols-2">
          <form className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-smooth">
            <Input placeholder="Name" aria-label="Name" required />
            <Input type="email" placeholder="Email" aria-label="Email" required />
            <Input placeholder="Subject" aria-label="Subject" />
            <textarea
              placeholder="Message"
              aria-label="Message"
              className="min-h-[140px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
            <Button type="button">Send message</Button>
          </form>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm text-slate-700">
            <p className="font-semibold">Collab & Media</p>
            <p className="mt-2 text-sm">For partnerships, brand collaborations, or press, drop a note with your proposal and timelines.</p>
            <p className="mt-4 font-semibold">Recipe Requests</p>
            <p className="text-sm">Tell us what you'd like to see next—regional classics, meal prep ideas, or dessert experiments.</p>
          </div>
        </div>
      </PageShell>
    </div>
  );
}
