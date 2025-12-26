import { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { SectionHeader } from "@/components/sections/section-header";

export const metadata: Metadata = {
  title: "About | Sanam's Kitchen",
  description: "Learn more about Sanam's Kitchen and the stories behind our recipes.",
};

export default function AboutPage() {
  return (
    <div className="section-padding">
      <PageShell className="space-y-6">
        <SectionHeader title="About Sanam's Kitchen" eyebrow="Our story" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 text-slate-700">
            <p>
              Sanam's Kitchen is a cozy corner of the internet where homestyle flavors meet modern technique. The YouTube channel started
              as a way to document family favorites and has since grown into a vibrant community of home cooks.
            </p>
            <p>
              Every recipe is tested in a real kitchen with ingredients you can find locally. We love playful twists on classics, approachable
              meal prep, and sharing the tips that make dishes shine.
            </p>
            <p>
              Have a request or collaboration idea? Reach out anytime—we love hearing from fellow food lovers.
            </p>
          </div>
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-smooth">
            <h3 className="font-display text-xl text-slate-900">What to expect</h3>
            <ul className="space-y-2 text-slate-700">
              <li>• Weekly new videos with step-by-step guidance.</li>
              <li>• Balanced mix of Punjabi comfort food, global flavors, and quick snacks.</li>
              <li>• Tips for plating, storage, and make-ahead planning.</li>
            </ul>
          </div>
        </div>
      </PageShell>
    </div>
  );
}
