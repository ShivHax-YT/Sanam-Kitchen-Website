import { Metadata } from "next";
import { getAllRecipes } from "@/lib/recipes";
import { PageShell } from "@/components/layout/page-shell";
import { SectionHeader } from "@/components/sections/section-header";
import { RecipeListing, type RecipeSummary } from "@/components/recipes/recipe-listing";

export const metadata: Metadata = {
  title: "Recipes | Sanam's Kitchen",
  description: "Browse recipes by category, difficulty, and cook time.",
};

export default async function RecipesPage() {
  const recipes = await getAllRecipes();
  const listings: RecipeSummary[] = recipes.map(({ content, readingTime, ...meta }) => ({ ...meta }));

  return (
    <div className="section-padding">
      <PageShell className="space-y-8">
        <SectionHeader title="Recipes" eyebrow="Cook and savor" ctaHref="/videos" />
        <RecipeListing recipes={listings} />
      </PageShell>
    </div>
  );
}
