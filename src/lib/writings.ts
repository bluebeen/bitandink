import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export const WRITING_CATEGORIES = [
  "novels",
  "essays",
  "synopses",
  "scripts",
] as const;

export type WritingCategory = (typeof WRITING_CATEGORIES)[number];

export type WritingPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  published: boolean;
  featured?: boolean;
  tags?: string[];
  category: WritingCategory;
  content: string;
  readingTime: string;
};

export type WritingMeta = Omit<WritingPost, "content">;

const writingsRoot = path.join(process.cwd(), "src/mdx-content/writings");

function isValidCategory(category: string): category is WritingCategory {
  return WRITING_CATEGORIES.includes(category as WritingCategory);
}

function getCategoryDirectory(category: WritingCategory) {
  return path.join(writingsRoot, category);
}

function getMdxFiles(category: WritingCategory) {
  const directory = getCategoryDirectory(category);

  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory).filter((file) => file.endsWith(".mdx"));
}

function parseWritingPost(
  category: WritingCategory,
  fileName: string
): WritingPost {
  const fullPath = path.join(getCategoryDirectory(category), fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug: fileName.replace(/\.mdx$/, ""),
    title: String(data.title ?? ""),
    summary: String(data.summary ?? ""),
    date: String(data.date ?? ""),
    published: Boolean(data.published ?? false),
    featured: Boolean(data.featured ?? false),
    tags: Array.isArray(data.tags)
      ? data.tags.map((tag) => String(tag))
      : [],
    category,
    content,
    readingTime: stats.text,
  };
}

export function getAllWritingPosts(): WritingPost[] {
  const posts = WRITING_CATEGORIES.flatMap((category) =>
    getMdxFiles(category).map((fileName) => parseWritingPost(category, fileName))
  );

  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostsByCategory(category: WritingCategory): WritingPost[] {
  return getAllWritingPosts().filter((post) => post.category === category);
}

export function getWritingPost(
  category: string,
  slug: string
): WritingPost | null {
  if (!isValidCategory(category)) return null;

  const posts = getPostsByCategory(category);
  return posts.find((post) => post.slug === slug) ?? null;
}

export function getAllWritingMeta(): WritingMeta[] {
  return getAllWritingPosts().map(({ content, ...meta }) => meta);
}

export function getFeaturedWritingPosts(): WritingMeta[] {
  return getAllWritingMeta().filter((post) => post.featured);
}

export function getAllWritingParams() {
  return getAllWritingPosts().map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export function getWritingCategories() {
  return WRITING_CATEGORIES.map((category) => ({
    slug: category,
    title: getCategoryLabel(category),
    description: getCategoryDescription(category),
  }));
}

export function getCategoryLabel(category: WritingCategory) {
  switch (category) {
    case "novels":
      return "Novels";
    case "essays":
      return "Essays";
    case "synopses":
      return "Synopses";
    case "scripts":
      return "Scripts";
  }
}

export function getCategoryDescription(category: WritingCategory) {
  switch (category) {
    case "novels":
      return "장편과 단편, 이야기의 결을 따라가는 소설 작업들.";
    case "essays":
      return "생각과 경험을 문장으로 정리한 에세이들.";
    case "synopses":
      return "이야기의 뼈대와 가능성을 압축한 시놉시스들.";
    case "scripts":
      return "대사와 장면 중심으로 전개되는 스크립트 작업들.";
  }
}

export function isWritingCategory(
  category: string
): category is WritingCategory {
  return isValidCategory(category);
}

export function getAdjacentPosts(category: WritingCategory, slug: string) {
  const posts = getPostsByCategory(category);

  const index = posts.findIndex((post) => post.slug === slug);

  const prev = index > 0 ? posts[index - 1] : null;
  const next = index < posts.length - 1 ? posts[index + 1] : null;

  return { prev, next };
}

export function getPaginatedPosts(
  posts: WritingPost[],
  page: number,
  perPage: number
) {
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return posts.slice(start, end);
}