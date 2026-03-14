import type { ContentCardItem } from "@/lib/content-ts/types";
import type { WritingMeta } from "@/lib/writings";
import type { ProjectMeta } from "@/lib/portfolio";
import type { StudioMeta } from "@/lib/studio";

export function mapWritingsToCardItems(
  writings: WritingMeta[]
): ContentCardItem[] {
  return writings.map((post) => ({
    href: `/writings/${post.category}/${post.slug}`,
    title: post.title,
    summary: post.summary,
    eyebrow: post.category,
    tags: post.tags ?? [],
    slug: post.slug,
    published: post.published,
    featured: post.featured,
    date: post.date,
  }));
}

export function mapProjectsToCardItems(
  projects: ProjectMeta[]
): ContentCardItem[] {
  return projects.map((project) => ({
    href: `/portfolio/${project.slug}`,
    title: project.title,
    summary: project.summary,
    eyebrow: project.year,
    tags: project.stack ?? [],
    slug: project.slug,
    published: project.published,
    featured: project.featured,
    date: project.date,
  }));
}

export function mapStudiosToCardItems(
  studios: StudioMeta[]
): ContentCardItem[] {
  return studios.map((post) => ({
    href: `/studio/${post.slug}`,
    title: post.title,
    summary: post.summary,
    eyebrow: post.kind || "STUDIO",
    tags: post.tags ?? [],
    slug: post.slug,
    published: post.published,
    featured: post.featured,
    date: post.date,
  }));
}