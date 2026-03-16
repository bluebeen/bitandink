import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const shortsRoot = path.join(process.cwd(), "src/mdx-content/short");

export type ShortCategory = "essays" | "synopses" | "scripts";

export type ShortPost = {
  slug: string;
  category: ShortCategory;
  title: string;
  excerpt?: string;
  date: string;
  published: boolean;
  tags?: string[];
  content: string;
  readingTime: string;
};

const validCategories: ShortCategory[] = ["essays", "synopses", "scripts"];

export function getShortCategories(): ShortCategory[] {
  return validCategories;
}

function getCategoryDir(category: ShortCategory) {
  return path.join(shortsRoot, category);
}

function getMdxFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"));
}

function parseShortPost(category: ShortCategory, fileName: string): ShortPost {
  const fullPath = path.join(getCategoryDir(category), fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug: fileName.replace(/\.mdx$/, ""),
    category,
    title: String(data.title ?? ""),
    excerpt: data.excerpt ? String(data.excerpt) : "",
    date: String(data.date ?? ""),
    published: Boolean(data.published ?? false),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    content,
    readingTime: readingTime(content).text,
  };
}

export function getShortPosts(category: ShortCategory): ShortPost[] {
  const files = getMdxFiles(getCategoryDir(category));

  return files
    .map((fileName) => parseShortPost(category, fileName))
    .filter((post) => post.published)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getAllShortPosts(): ShortPost[] {
  return validCategories
    .flatMap((category) => getShortPosts(category))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getShortPost(
  category: ShortCategory,
  slug: string
): ShortPost | null {
  const fullPath = path.join(getCategoryDir(category), `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  return parseShortPost(category, `${slug}.mdx`);
}