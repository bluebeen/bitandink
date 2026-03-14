import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ProjectMeta {
  slug: string;
  title: string;
  summary: string;
  date?: string;
  year?: string;
  stack?: string[];
  published?: boolean;
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

const portfolioDir = path.join(process.cwd(), "src/mdx-content/portfolio/posts");

function parseProjectFile(fileName: string): ProjectPost {
  const slug = fileName.replace(/\.mdx$/, "");
  const filePath = path.join(portfolioDir, fileName);
  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);

  return {
    slug,
    title: data.title ?? "",
    summary: data.summary ?? "",
    date: data.date ?? "",
    year: data.year ?? "",
    stack: data.stack ?? [],
    published: data.published ?? true,
    featured: data.featured ?? false,
    thumbnail: data.thumbnail ?? "",
    link: data.link ?? "",
    github: data.github ?? "",
    problem: data.problem ?? "",
    approach: data.approach ?? "",
    result: data.result ?? "",
    content,
  };
}

export function getAllProjects(): ProjectMeta[] {
  const files = fs.readdirSync(portfolioDir);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => parseProjectFile(file))
    .filter((project) => project.published !== false)
    .map(({ content, ...meta }) => meta)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export function getAllProjectPosts(): ProjectPost[] {
  const files = fs.readdirSync(portfolioDir);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => parseProjectFile(file))
    .filter((project) => project.published !== false)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export function getProjectBySlug(slug: string) {
  return getAllProjectPosts().find((project) => project.slug === slug);
}

export function getRecentProjects(limit = 5) {
  return getAllProjects().slice(0, limit);
}