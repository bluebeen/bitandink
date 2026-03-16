import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

export interface StudioMeta {
  slug: string;
  title: string;
  summary: string;
  date?: string;
  year?: string;
  tags?: string[];
  published?: boolean;
  featured?: boolean;
  thumbnail?: string;
}

export interface StudioPost extends StudioMeta {
  content: string;
}

const studioDir = path.join(process.cwd(), "src/mdx-content/studio/posts");

function parseStudioFile(fileName: string): StudioPost {
  const slug = fileName.replace(/\.mdx$/, "");
  const filePath = path.join(studioDir, fileName);
  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);

  return {
    slug,
    title: data.title ?? "",
    summary: data.summary ?? "",
    date: data.date ?? "",
    year: data.year ?? "",
    tags: data.tags ?? [],
    published: data.published ?? true,
    featured: data.featured ?? false,
    thumbnail: data.thumbnail ?? "",
    content,
  };
}

const readAllStudioPosts = cache(function readAllStudioPosts(): StudioPost[] {
  const files = fs.readdirSync(studioDir);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => parseStudioFile(file))
    .filter((studio) => studio.published !== false)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
});

export function getAllStudios(): StudioMeta[] {
  return readAllStudioPosts().map(({ content, ...meta }) => meta);
}

export function getAllStudioPosts(): StudioPost[] {
  return readAllStudioPosts();
}

export function getStudioBySlug(slug: string) {
  return readAllStudioPosts().find((studio) => studio.slug === slug);
}

export function getRecentStudios(limit = 5) {
  return getAllStudios().slice(0, limit);
}

export function getAdjacentStudios(slug: string) {
  const items = getAllStudios();
  const index = items.findIndex((item) => item.slug === slug);

  const prev = index > 0 ? items[index - 1] : null;
  const next = index < items.length - 1 ? items[index + 1] : null;

  return { prev, next };
}