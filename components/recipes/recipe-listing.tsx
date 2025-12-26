"use client";

import { useMemo, useState } from "react";
import { RecipeCard } from "@/components/recipes/recipe-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type RecipeSummary = {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  prepTime: string;
  cookTime: string;
  difficulty: string;
  servings: string;
  image: string;
  slug: string;
};

interface RecipeListingProps {
  recipes: RecipeSummary[];
}

export function RecipeListing({ recipes }: RecipeListingProps) {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const categories = Array.from(new Set(recipes.map((r) => r.category)));
  const difficultyLevels = Array.from(new Set(recipes.map((r) => r.difficulty)));

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return recipes.filter((recipe) => {
      const matchesQuery = recipe.title.toLowerCase().includes(q) || recipe.excerpt.toLowerCase().includes(q);
      const matchesCategory =
        activeFilters.length === 0 || activeFilters.includes(recipe.category) || activeFilters.includes(recipe.difficulty);
      return matchesQuery && matchesCategory;
    });
  }, [recipes, query, activeFilters]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-lg">
          <Input
            placeholder="Search recipes"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search recipes"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={activeFilters.includes(cat) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleFilter(cat)}
            >
              {cat}
            </Badge>
          ))}
          {difficultyLevels.map((level) => (
            <Badge
              key={level}
              variant={activeFilters.includes(level) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleFilter(level)}
            >
              {level}
            </Badge>
          ))}
          {activeFilters.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setActiveFilters([])}>
              Clear
            </Button>
          )}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((recipe) => (
          <RecipeCard key={recipe.slug} recipe={recipe} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-600">
          No recipes match your search yet.
        </div>
      )}
    </div>
  );
}
