import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import readingTime from "reading-time";

export type RecipeFrontmatter = {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  prepTime: string;
  cookTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
  servings: string;
  image: string;
  videoId?: string;
  ingredients?: string[];
  steps?: string[];
  tips?: string[];
};

export type Recipe = RecipeFrontmatter & {
  slug: string;
  content: React.ReactNode;
  readingTime: string;
};

const recipesDirectory = path.join(process.cwd(), "content/recipes");

export function getRecipeSlugs() {
  return fs
    .readdirSync(recipesDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getRecipeBySlug(slug: string): Promise<Recipe> {
  const fullPath = path.join(recipesDirectory, `${slug}.mdx`);
  const source = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(source);
  const { content: compiled } = await compileMDX<RecipeFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
    },
  });
  return {
    ...(data as RecipeFrontmatter),
    slug,
    content: compiled,
    readingTime: readingTime(content).text,
  };
}

export async function getAllRecipes(): Promise<Recipe[]> {
  const slugs = getRecipeSlugs();
  const recipes = await Promise.all(slugs.map((slug) => getRecipeBySlug(slug)));
  return recipes.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}
