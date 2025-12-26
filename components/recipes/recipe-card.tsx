import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Recipe } from "@/lib/recipes";

type RecipeLike = Pick<
  Recipe,
  | "title"
  | "excerpt"
  | "date"
  | "category"
  | "prepTime"
  | "cookTime"
  | "difficulty"
  | "image"
  | "slug"
> & { readingTime?: string };

interface RecipeCardProps {
  recipe: RecipeLike;
  variant?: "default" | "stacked";
}

export function RecipeCard({ recipe, variant = "default" }: RecipeCardProps) {
  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-smooth transition hover:-translate-y-1 hover:shadow-elevated"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 320px, 100vw"
        />
        <div className="absolute left-3 top-3">
          <Badge>{recipe.category}</Badge>
        </div>
      </div>
      <div className="space-y-2 px-5 py-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{formatDate(recipe.date)}</p>
        <h3 className="font-display text-lg leading-tight text-slate-900">{recipe.title}</h3>
        <p className="text-sm text-slate-600">{recipe.excerpt}</p>
        <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-slate-500">
          <span>Prep {recipe.prepTime}</span>
          <span>•</span>
          <span>Cook {recipe.cookTime}</span>
          <span>•</span>
          <span>{recipe.difficulty}</span>
        </div>
      </div>
    </Link>
  );
}
