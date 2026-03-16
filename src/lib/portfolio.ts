import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

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

const readAllProjectPosts = cache(function readAllProjectPosts(): ProjectPost[] {
  const files = fs.readdirSync(portfolioDir);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => parseProjectFile(file))
    .filter((project) => project.published !== false)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
});

export function getAllProjects(): ProjectMeta[] {
  return readAllProjectPosts().map(({ content, ...meta }) => meta);
}

export function getAllProjectPosts(): ProjectPost[] {
  return readAllProjectPosts();
}

export function getProjectBySlug(slug: string) {
  return readAllProjectPosts().find((project) => project.slug === slug);
}

export function getRecentProjects(limit = 5) {
  return getAllProjects().slice(0, limit);
}

export function getAdjacentProjects(slug: string) {
  const items = getAllProjects();
  const index = items.findIndex((item) => item.slug === slug);

  const prev = index > 0 ? items[index - 1] : null;
  const next = index < items.length - 1 ? items[index + 1] : null;

  return { prev, next };
}