import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllRecipes, getRecipeBySlug, getRecipeSlugs } from "@/lib/recipes";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/sections/section-header";
import { PageShell } from "@/components/layout/page-shell";
import { IngredientsChecklist } from "@/components/recipes/ingredients-checklist";
import { StepsList } from "@/components/recipes/steps-list";
import { RecipeCard } from "@/components/recipes/recipe-card";

export async function generateStaticParams() {
  const slugs = getRecipeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const recipe = await getRecipeBySlug(params.slug);
    return {
      title: `${recipe.title} | Sanam's Kitchen`,
      description: recipe.excerpt,
      openGraph: {
        title: recipe.title,
        description: recipe.excerpt,
        images: [{ url: recipe.image }],
      },
    };
  } catch (error) {
    return { title: "Recipe | Sanam's Kitchen" };
  }
}

export default async function RecipeDetailPage({ params }: { params: { slug: string } }) {
  const recipe = await getRecipeBySlug(params.slug).catch(() => null);
  if (!recipe) return notFound();
  const all = await getAllRecipes();
  const related = all.filter((r) => r.slug !== recipe.slug && r.category === recipe.category).slice(0, 3);

  return (
    <article className="pb-16">
      <div className="relative h-[360px] w-full">
        <Image src={recipe.image} alt={recipe.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent" />
        <PageShell className="relative z-10 flex h-full flex-col justify-end pb-10 text-white">
          <Badge variant="outline" className="border-white/70 bg-white/10 text-white">
            {recipe.category}
          </Badge>
          <h1 className="mt-3 max-w-3xl font-display text-3xl md:text-4xl">{recipe.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/80">
            <span>{formatDate(recipe.date)}</span>
            <span>•</span>
            <span>Prep {recipe.prepTime}</span>
            <span>•</span>
            <span>Cook {recipe.cookTime}</span>
            <span>•</span>
            <span>Serves {recipe.servings}</span>
            <span>•</span>
            <span>{recipe.difficulty}</span>
          </div>
        </PageShell>
      </div>

      <PageShell className="mt-10 grid gap-12 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-8">
          <div className="flex flex-wrap gap-3 text-sm font-semibold text-slate-600">
            <a href="#overview" className="rounded-full bg-slate-100 px-3 py-1 hover:text-brand-700">
              Overview
            </a>
            <a href="#ingredients" className="rounded-full bg-slate-100 px-3 py-1 hover:text-brand-700">
              Ingredients
            </a>
            <a href="#steps" className="rounded-full bg-slate-100 px-3 py-1 hover:text-brand-700">
              Steps
            </a>
            <a href="#tips" className="rounded-full bg-slate-100 px-3 py-1 hover:text-brand-700">
              Tips
            </a>
            <a href="#video" className="rounded-full bg-slate-100 px-3 py-1 hover:text-brand-700">
              Video
            </a>
          </div>

          <section id="overview" className="prose-custom space-y-6">
            {recipe.content}
          </section>

          {recipe.ingredients && (
            <section id="ingredients" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-smooth">
              <SectionHeader title="Ingredients" />
              <IngredientsChecklist items={recipe.ingredients} />
            </section>
          )}

          {recipe.steps && (
            <section id="steps" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-smooth">
              <SectionHeader title="Steps" />
              <StepsList steps={recipe.steps} />
            </section>
          )}

          {recipe.tips && (
            <section id="tips" className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900">Tips</h3>
              <ul className="mt-3 space-y-2 text-slate-700">
                {recipe.tips.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <span className="text-brand-700">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section id="video" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-smooth">
            <SectionHeader title="Watch on YouTube" />
            {recipe.videoId ? (
              <div className="relative mt-4 aspect-video overflow-hidden rounded-xl">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${recipe.videoId}`}
                  title={`${recipe.title} video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <p className="text-slate-600">Video coming soon. Subscribe for updates.</p>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-smooth">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Recipe card</p>
                <h3 className="font-display text-xl">{recipe.title}</h3>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link href={`/recipes/${recipe.slug}/print`} target="_blank">
                  Print
                </Link>
              </Button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-700">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Prep</p>
                <p className="font-semibold">{recipe.prepTime}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Cook</p>
                <p className="font-semibold">{recipe.cookTime}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Serves</p>
                <p className="font-semibold">{recipe.servings}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Difficulty</p>
                <p className="font-semibold">{recipe.difficulty}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-700">Share</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
              <Link href={`https://www.facebook.com/sharer/sharer.php?u=https://sanamskitchen.example.com/recipes/${recipe.slug}`} target="_blank" className="rounded-full bg-white px-3 py-2 shadow-sm hover:text-brand-700">
                Facebook
              </Link>
              <Link href={`https://twitter.com/intent/tweet?url=https://sanamskitchen.example.com/recipes/${recipe.slug}`} target="_blank" className="rounded-full bg-white px-3 py-2 shadow-sm hover:text-brand-700">
                X / Twitter
              </Link>
            </div>
          </div>
        </div>
      </PageShell>

      {related.length > 0 && (
        <div className="section-padding">
          <PageShell>
            <SectionHeader title="Related recipes" ctaHref="/recipes" />
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <RecipeCard key={r.slug} recipe={r} />
              ))}
            </div>
          </PageShell>
        </div>
      )}
    </article>
  );
}
