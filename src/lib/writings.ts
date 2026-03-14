import path from "path";
import readingTime from "reading-time";
import { createMdxCollection } from "@/lib/content-ts/mdx-collection";

export interface WritingMeta {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  published: boolean;
  featured?: boolean;
  tags?: string[];
  thumbnail?: string;
  readingTime?: string;
}

export interface WritingPost extends WritingMeta {
  content: string;
}

const directory = path.join(
  process.cwd(),
  "src/mdx-content/writings/posts"
);

const collection = createMdxCollection<WritingPost>({
  directory,
  parse: ({ fileName, data, content }) => {
    const slugFromFile = fileName.replace(/\.mdx$/, "");

    return {
      slug: (data.slug as string) ?? slugFromFile,
      title: (data.title as string) ?? slugFromFile,
      summary: (data.summary as string) ?? "",
      date: (data.date as string) ?? "",
      category: (data.category as string) ?? "uncategorized",
      published: (data.published as boolean) ?? true,
      featured: (data.featured as boolean) ?? false,
      tags: (data.tags as string[]) ?? [],
      thumbnail: (data.thumbnail as string) ?? "",
      readingTime: readingTime(content).text,
      content,
    };
  },
});

export function getAllWritingPosts(): WritingPost[] {
  return collection.getAllPosts();
}

export function getAllWritings(): WritingMeta[] {
  return collection.getAllMeta();
}

export function getFeaturedWritings(): WritingMeta[] {
  return collection.getFeatured();
}

export function getWritingCategories(): string[] {
  const categories = getAllWritings().map((post) => post.category);
  return [...new Set(categories)];
}

export function getWritingsByCategory(category: string): WritingMeta[] {
  return getAllWritings().filter((post) => post.category === category);
}

export function getWritingPostsByCategory(category: string): WritingPost[] {
  return getAllWritingPosts().filter((post) => post.category === category);
}

export function getWritingByCategoryAndSlug(
  category: string,
  slug: string
): WritingPost | null {
  return (
    getAllWritingPosts().find(
      (post) => post.category === category && post.slug === slug
    ) ?? null
  );
}