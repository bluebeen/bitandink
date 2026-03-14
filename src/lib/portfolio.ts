import path from "path";
import { createMdxCollection } from "@/lib/content-ts/mdx-collection";

export interface ProjectMeta {
  slug: string;
  title: string;
  summary: string;
  date: string;
  year: string;
  stack: string[];
  published: boolean;
  featured?: boolean;
  thumbnail?: string;
  link?: string;
  github?: string;
  problem?: string;
  approach?: string;
  result?: string;
}

export interface ProjectPost extends ProjectMeta {
  content: string;
}

const directory = path.join(
  process.cwd(),
  "src/mdx-content/portfolio/posts"
);

const collection = createMdxCollection<ProjectPost>({
  directory,
  parse: ({ fileName, data, content }) => {
    const slugFromFile = fileName.replace(/\.mdx$/, "");

    return {
      slug: (data.slug as string) ?? slugFromFile,
      title: (data.title as string) ?? slugFromFile,
      summary: (data.summary as string) ?? "",
      date: (data.date as string) ?? "",
      year: (data.year as string) ?? "",
      stack: (data.stack as string[]) ?? [],
      published: (data.published as boolean) ?? true,
      featured: (data.featured as boolean) ?? false,
      thumbnail: (data.thumbnail as string) ?? "",
      link: (data.link as string) ?? "",
      github: (data.github as string) ?? "",
      problem: (data.problem as string) ?? "",
      approach: (data.approach as string) ?? "",
      result: (data.result as string) ?? "",
      content,
    };
  },
});

export function getAllProjectPosts(): ProjectPost[] {
  return collection.getAllPosts();
}

export function getAllProjects(): ProjectMeta[] {
  return collection.getAllMeta();
}

export function getProjectBySlug(slug: string): ProjectPost | null {
  return collection.getBySlug(slug);
}

export function getFeaturedProjects(): ProjectMeta[] {
  return collection.getFeatured();
}