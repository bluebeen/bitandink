import path from "path";
import { createMdxCollection } from "@/lib/content-ts/mdx-collection";

export interface StudioMeta {
  slug: string;
  title: string;
  summary: string;
  date: string;
  published: boolean;
  featured?: boolean;
  tags?: string[];
  thumbnail?: string;
  kind?: string;
}

export interface StudioPost extends StudioMeta {
  content: string;
}

const directory = path.join(
  process.cwd(),
  "src/mdx-content/studio/posts"
);

const collection = createMdxCollection<StudioPost>({
  directory,
  parse: ({ fileName, data, content }) => {
    const slugFromFile = fileName.replace(/\.mdx$/, "");

    return {
      slug: (data.slug as string) ?? slugFromFile,
      title: (data.title as string) ?? slugFromFile,
      summary: (data.summary as string) ?? "",
      date: (data.date as string) ?? "",
      published: (data.published as boolean) ?? true,
      featured: (data.featured as boolean) ?? false,
      tags: (data.tags as string[]) ?? [],
      thumbnail: (data.thumbnail as string) ?? "",
      kind: (data.kind as string) ?? "",
      content,
    };
  },
});

export function getAllStudioPosts(): StudioPost[] {
  return collection.getAllPosts();
}

export function getAllStudios(): StudioMeta[] {
  return collection.getAllMeta();
}

export function getStudioBySlug(slug: string): StudioPost | null {
  return collection.getBySlug(slug);
}

export function getFeaturedStudios(): StudioMeta[] {
  return collection.getFeatured();
}