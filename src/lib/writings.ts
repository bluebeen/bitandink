import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const writingCategories = [
  "novels",
  "essays",
  "synopses",
  "scripts",
] as const;

export type WritingCategory = (typeof writingCategories)[number];

export interface WritingMeta {
  slug: string;
  title: string;
  summary: string;
  category: WritingCategory;
  tags?: string[];
  date?: string;
}

export interface WritingPost extends WritingMeta {
  content: string;
}

const writingsDir = path.join(process.cwd(), "src/mdx-content/writings/posts");

function parseWritingFile(fileName: string): WritingPost {
  const slug = fileName.replace(/\.mdx$/, "");
  const filePath = path.join(writingsDir, fileName);
  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);

  return {
    slug,
    title: data.title ?? "",
    summary: data.summary ?? "",
    category: data.category as WritingCategory,
    tags: data.tags ?? [],
    date: data.date ?? "",
    content,
  };
}

export function getAllWritings(): WritingMeta[] {
  const files = fs.readdirSync(writingsDir);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => parseWritingFile(file))
    .map(({ content, ...meta }) => meta)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export function getAllWritingPosts(): WritingPost[] {
  const files = fs.readdirSync(writingsDir);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => parseWritingFile(file))
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export function getWritingsByCategory(category: WritingCategory) {
  return getAllWritings().filter((post) => post.category === category);
}

export function getWritingByCategoryAndSlug(
  category: WritingCategory,
  slug: string
) {
  return getAllWritingPosts().find(
    (post) => post.category === category && post.slug === slug
  );
}

export function getWritingBySlug(slug: string) {
  return getAllWritingPosts().find((post) => post.slug === slug);
}

export function getRecentWritings(limit = 5) {
  return getAllWritings().slice(0, limit);
}