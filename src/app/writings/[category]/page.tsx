import { notFound } from "next/navigation";

import ContentIndexPage from "@/components/content-ui/ContentIndexPage";
import {
  getWritingsByCategory,
  type WritingCategory,
} from "@/lib/writings";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { category } = await params;

  return {
    title: `${category} | Writings | bitandink`,
    description: `${category} 카테고리의 글 모음`,
  };
}

export default async function WritingCategoryPage({ params }: Props) {
  const { category } = await params;
  const writings = getWritingsByCategory(category as WritingCategory);

  if (!writings.length) {
    notFound();
  }

  const items = writings.map((post) => ({
    href: `/writings/${post.category}/${post.slug}`,
    title: post.title,
    summary: post.summary,
    eyebrow: post.category,
    tags: post.tags ?? [],
    slug: post.slug,
    date: post.date,
  }));

  return (
    <ContentIndexPage
      eyebrow="WRITING CATEGORY"
      title={category}
      description={`${category} 카테고리의 글을 모아봤습니다.`}
      items={items}
    />
  );
}