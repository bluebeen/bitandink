import { notFound } from "next/navigation";
import ContentIndexPage from "@/components/content-ui/ContentIndexPage";
import {
  WRITING_CATEGORIES,
  getCategoryDescription,
  getCategoryLabel,
  getPostsByCategory,
  isWritingCategory,
} from "@/lib/writings";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export function generateStaticParams() {
  return WRITING_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;

  if (!isWritingCategory(category)) {
    return {
      title: "Writings",
    };
  }

  const title = `${getCategoryLabel(category)} | Writings`;
  const description = getCategoryDescription(category);

  return {
    title,
    description,
  };
}

export default async function WritingCategoryPage({ params }: Props) {
  const { category } = await params;

  if (!isWritingCategory(category)) {
    notFound();
  }

  const posts = getPostsByCategory(category);

  return (
    <ContentIndexPage
      eyebrow={`writings / ${category}`}
      title={getCategoryLabel(category)}
      description={getCategoryDescription(category)}
      items={posts.map((post) => ({
        href: `/writings/${post.category}/${post.slug}`,
        title: post.title,
        summary: post.summary,
        eyebrow: post.date,
        tags: post.tags,
      }))}
    />
  );
}