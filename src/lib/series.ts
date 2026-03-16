import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const seriesRoot = path.join(process.cwd(), "src/mdx-content/series");

export type SeriesMeta = {
  slug: string;
  title: string;
  description?: string;
  status?: "serializing" | "completed" | "hiatus";
  totalParts?: number;
  completedParts?: number[];
};

export type SeriesChapter = {
  seriesSlug: string;
  partSlug: string;

  partNumber: number;
  partTitle: string;

  chapterNumber: number;
  chapterSlug: string;
  chapterTitle: string;

  title: string;
  subTitle?: string;
  summary?: string;

  published: boolean;
  date: string;

  content: string;
  readingTime: string;
};

export type SeriesPart = {
  partSlug: string;
  partNumber: number;
  partTitle: string;
  chapters: SeriesChapter[];
};

function walkMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return walkMdxFiles(fullPath);
    }

    if (entry.isFile() && entry.name.endsWith(".mdx")) {
      return [fullPath];
    }

    return [];
  });
}

export function sortSeriesChapters<T extends { partNumber: number; chapterNumber: number }>(
  chapters: T[]
) {
  return [...chapters].sort((a, b) => {
    if (a.partNumber !== b.partNumber) {
      return a.partNumber - b.partNumber;
    }

    return a.chapterNumber - b.chapterNumber;
  });
}

function parseSeriesChapter(filePath: string): SeriesChapter {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const relativePath = path.relative(seriesRoot, filePath);
  const [seriesSlug, partSlug] = relativePath.split(path.sep);

  return {
    seriesSlug,
    partSlug,

    partNumber: Number(data.partNumber),
    partTitle: String(data.partTitle ?? ""),

    chapterNumber: Number(data.chapterNumber),
    chapterSlug: String(data.chapterSlug),
    chapterTitle: String(data.chapterTitle ?? ""),

    title: String(data.title ?? ""),
    subTitle: data.subTitle ? String(data.subTitle) : "",
    summary: data.summary ? String(data.summary) : "",

    published: Boolean(data.published ?? false),
    date: String(data.date ?? ""),

    content,
    readingTime: readingTime(content).text,
  };
}

export function getAllSeriesSlugs(): string[] {
  if (!fs.existsSync(seriesRoot)) return [];

  return fs
    .readdirSync(seriesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export async function getSeriesMeta(seriesSlug: string): Promise<SeriesMeta | null> {
  try {
    const metaPath = path.join(seriesRoot, seriesSlug, "meta.ts");
    if (!fs.existsSync(metaPath)) {
      return {
        slug: seriesSlug,
        title: seriesSlug,
      };
    }

    const mod = await import(metaPath);
    return mod.seriesMeta ?? mod.default ?? null;
  } catch {
    return {
      slug: seriesSlug,
      title: seriesSlug,
    };
  }
}

export function getSeriesChapters(seriesSlug: string): SeriesChapter[] {
  const dir = path.join(seriesRoot, seriesSlug);
  const files = walkMdxFiles(dir);

  const chapters = files
    .map(parseSeriesChapter)
    .filter((chapter) => chapter.published);

  return sortSeriesChapters(chapters);
}

export function getSeriesChapter(
  seriesSlug: string,
  partSlug: string,
  chapterSlug: string
): SeriesChapter | null {
  return (
    getSeriesChapters(seriesSlug).find(
      (chapter) =>
        chapter.partSlug === partSlug &&
        chapter.chapterSlug === chapterSlug
    ) ?? null
  );
}

export function getAdjacentSeriesChapters(
  seriesSlug: string,
  partSlug: string,
  chapterSlug: string
): { prev: SeriesChapter | null; next: SeriesChapter | null } {
  const chapters = getSeriesChapters(seriesSlug);

  const index = chapters.findIndex(
    (chapter) =>
      chapter.partSlug === partSlug &&
      chapter.chapterSlug === chapterSlug
  );

  return {
    prev: index > 0 ? chapters[index - 1] : null,
    next: index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : null,
  };
}

export function getSeriesToc(seriesSlug: string): SeriesPart[] {
  const chapters = getSeriesChapters(seriesSlug);

  const parts = new Map<string, SeriesPart>();

  for (const chapter of chapters) {
    if (!parts.has(chapter.partSlug)) {
      parts.set(chapter.partSlug, {
        partSlug: chapter.partSlug,
        partNumber: chapter.partNumber,
        partTitle: chapter.partTitle,
        chapters: [],
      });
    }

    parts.get(chapter.partSlug)!.chapters.push(chapter);
  }

  return [...parts.values()].sort((a, b) => a.partNumber - b.partNumber);
}

export function getLatestSeriesChapter(seriesSlug: string): SeriesChapter | null {
  const chapters = getSeriesChapters(seriesSlug);
  return chapters[chapters.length - 1] ?? null;
}

export async function getAllSeries() {
  const slugs = getAllSeriesSlugs();

  return Promise.all(
    slugs.map(async (slug) => {
      const meta = await getSeriesMeta(slug);
      const latestChapter = getLatestSeriesChapter(slug);

      return {
        slug,
        meta,
        latestChapter,
      };
    })
  );
}