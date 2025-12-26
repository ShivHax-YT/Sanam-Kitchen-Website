import Link from "next/link";
import Image from "next/image";
import { getAllRecipes } from "@/lib/recipes";
import { getLatestVideos } from "@/lib/youtube";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/sections/section-header";
import { PageShell } from "@/components/layout/page-shell";
import { RecipeCard } from "@/components/recipes/recipe-card";
import { VideoCard } from "@/components/videos/video-card";
import { formatDate } from "@/lib/utils";
import { Youtube, Instagram, Facebook, Music2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";


export default async function HomePage() {
  const [recipes, videos] = await Promise.all([getAllRecipes(), getLatestVideos()]);
  const featured = recipes.slice(0, 6);
  const popular = recipes.slice(0, 4);
  const compactList = recipes.slice(4, 8);
  const latestVideos = videos.slice(0, 6);

  return (
    <div>
      <section className="section-padding bg-gradient-to-b from-white via-white to-slate-50">
        <PageShell>
          <SectionHeader title="Trending now" eyebrow="Above the fold" ctaHref="/recipes" />
          <div className="mt-6 grid gap-4 md:grid-cols-12 md:grid-rows-2">
            {featured.map((item, idx) => {
              const isHero = idx === 0;
              const colSpan = isHero ? "md:col-span-6" : idx < 3 ? "md:col-span-3" : "md:col-span-4";
              const rowSpan = isHero ? "md:row-span-2" : "";
              return (
                <Link
                  key={item.slug}
                  href={`/recipes/${item.slug}`}
                  className={`group relative flex overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-smooth ${colSpan} ${rowSpan}`}
                >
                  <div className="relative h-60 w-full md:h-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 600px, 100vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="gradient-overlay absolute inset-0" />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
                    <Badge variant="outline" className="border-white/70 bg-white/10 text-white">
                      {item.category}
                    </Badge>
                    <h3 className="mt-3 font-display text-xl leading-tight md:text-2xl">{item.title}</h3>
                    <p className="mt-1 text-sm text-white/80">{formatDate(item.date)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </PageShell>
      </section>

      <section className="section-padding">
        <PageShell>
          <SectionHeader title="Popular Recipes" eyebrow="Cook next" ctaHref="/recipes" />
          <div className="mt-6 grid gap-8 lg:grid-cols-[2fr,1.2fr]">
            <div className="grid gap-6 md:grid-cols-2">
              {popular.map((recipe) => (
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))}
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Editor's picks</p>
              <ul className="mt-4 space-y-4">
                {compactList.map((item) => (
                  <li key={item.slug} className="flex items-center gap-3">
                    <div className="relative h-14 w-16 overflow-hidden rounded-xl">
                      <Image src={item.image} alt={item.title} fill className="object-cover" sizes="64px" />
                    </div>
                    <div>
                      <Link href={`/recipes/${item.slug}`} className="font-semibold text-slate-800 hover:text-brand-700">
                        {item.title}
                      </Link>
                      <p className="text-xs text-slate-500">{formatDate(item.date)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </PageShell>
      </section>

      <section className="section-padding bg-slate-50">
        <PageShell>
          <SectionHeader title="Latest Videos" eyebrow="From YouTube" ctaHref="/videos" />
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </PageShell>
      </section>

      <section className="section-padding">
        <PageShell>
          <SectionHeader title="Collections & Categories" eyebrow="Browse" />
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-smooth">
              <p className="text-sm font-semibold text-slate-800">Collections</p>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-slate-700">
                <Link href="/recipes?category=punjabi" className="rounded-xl bg-slate-50 px-4 py-3 hover:text-brand-700">Punjabi Comforts</Link>
                <Link href="/recipes?category=breakfast" className="rounded-xl bg-slate-50 px-4 py-3 hover:text-brand-700">Breakfast Express</Link>
                <Link href="/recipes?category=healthy" className="rounded-xl bg-slate-50 px-4 py-3 hover:text-brand-700">Meal Prep Bowls</Link>
                <Link href="/recipes?category=desserts" className="rounded-xl bg-slate-50 px-4 py-3 hover:text-brand-700">Dessert Moments</Link>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-800">Top categories</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {siteConfig.categories.map((cat) => (
                  <Link key={cat.value} href={`/recipes?category=${cat.value}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-brand-200 hover:text-brand-700">
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </PageShell>
      </section>

      <section className="section-padding bg-brand-600 text-white">
        <PageShell className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/80">Stay in touch</p>
            <h3 className="font-display text-2xl">Fresh recipes in your inbox</h3>
            <p className="text-white/80">One thoughtful email each week. No spam, just flavor.</p>
          </div>
          <form className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              aria-label="Email address"
              placeholder="Email address"
              className="h-11 flex-1 rounded-full border border-white/30 bg-white/10 px-4 text-white placeholder:text-white/70 focus:border-white focus:outline-none"
            />
            <Button type="button" variant="outline" className="border-white bg-white text-brand-700 hover:bg-white/90">
              Subscribe
            </Button>
          </form>
          <div className="flex items-center gap-3 text-white/80">
            <Link aria-label="YouTube" href="https://www.youtube.com/c/sanamskitchen" target="_blank" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
              <Youtube className="h-5 w-5" />
            </Link>
            <Link aria-label="Instagram" href="#" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link aria-label="TikTok" href="#" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
              <Music2 className="h-5 w-5" />
            </Link>
            <Link aria-label="Facebook" href="#" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
              <Facebook className="h-5 w-5" />
            </Link>
          </div>
        </PageShell>
      </section>
    </div>
  );
}
