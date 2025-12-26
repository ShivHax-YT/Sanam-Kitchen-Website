import { notFound } from "next/navigation";
import { getRecipeBySlug } from "@/lib/recipes";
import { PrintButton } from "@/components/recipes/print-button";
import { StepsList } from "@/components/recipes/steps-list";
import { IngredientsChecklist } from "@/components/recipes/ingredients-checklist";

export default async function RecipePrintPage({ params }: { params: { slug: string } }) {
  const recipe = await getRecipeBySlug(params.slug).catch(() => null);
  if (!recipe) return notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="print-hidden">
        <PrintButton />
      </div>
      <h1 className="font-display text-3xl">{recipe.title}</h1>
      <p className="mt-2 text-sm text-slate-600">
        Prep {recipe.prepTime} • Cook {recipe.cookTime} • Serves {recipe.servings} • {recipe.difficulty}
      </p>
      <p className="mt-2 text-slate-700">{recipe.excerpt}</p>

      {recipe.ingredients && (
        <section className="mt-6">
          <h2 className="font-semibold text-xl">Ingredients</h2>
          <IngredientsChecklist items={recipe.ingredients} />
        </section>
      )}

      {recipe.steps && (
        <section className="mt-6">
          <h2 className="font-semibold text-xl">Steps</h2>
          <StepsList steps={recipe.steps} />
        </section>
      )}
    </div>
  );
}
