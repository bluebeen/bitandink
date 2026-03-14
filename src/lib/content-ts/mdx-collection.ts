import fs from "fs";
import path from "path";
import matter from "gray-matter";

type BaseParsedItem = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  published: boolean;
  featured?: boolean;
  content: string;
};

type CreateMdxCollectionOptions<T extends BaseParsedItem> = {
  directory: string;
  parse: (args: {
    fileName: string;
    data: Record<string, unknown>;
    content: string;
  }) => T;
};

export function createMdxCollection<T extends BaseParsedItem>({
  directory,
  parse,
}: CreateMdxCollectionOptions<T>) {
  function getMdxFiles() {
    if (!fs.existsSync(directory)) return [];

    return fs
      .readdirSync(directory)
      .filter((file) => file.endsWith(".mdx"));
  }

  function getAllPosts(): T[] {
    return getMdxFiles()
      .map((fileName) => {
        const fullPath = path.join(directory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return parse({
          fileName,
          data: data as Record<string, unknown>,
          content,
        });
      })
      .filter((item) => item.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  function getAllMeta(): Omit<T, "content">[] {
    return getAllPosts().map(({ content, ...meta }) => meta);
  }

  function getBySlug(slug: string): T | null {
    return getAllPosts().find((item) => item.slug === slug) ?? null;
  }

  function getFeatured(): Omit<T, "content">[] {
    return getAllMeta().filter((item) => item.featured);
  }

  return {
    getAllPosts,
    getAllMeta,
    getBySlug,
    getFeatured,
  };
}