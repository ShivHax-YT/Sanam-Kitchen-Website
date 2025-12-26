import { Skeleton } from "@/components/ui/skeleton";
import { PageShell } from "@/components/layout/page-shell";
import { SectionHeader } from "@/components/sections/section-header";

export default function Loading() {
  return (
    <div className="section-padding">
      <PageShell>
        <SectionHeader title="Videos" eyebrow="Streaming" />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-4">
              <Skeleton className="mb-4 h-40 w-full rounded-xl" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="mt-2 h-4 w-1/3" />
            </div>
          ))}
        </div>
      </PageShell>
    </div>
  );
}
