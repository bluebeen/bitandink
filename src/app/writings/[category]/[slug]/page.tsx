import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import ContentDetailPage from "@/components/content-ui/ContentDetailPage";
import { getContentNavigation } from "@/lib/content-ts/navigation";
import {
  getAllWritings,
  getWritingByCategoryAndSlug,
  type WritingCategory,
} from "@/lib/writings";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllWritings().map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params;
  const post = getWritingByCategoryAndSlug(category as WritingCategory, slug);

  if (!post) {
    return { title: "Not Found" };
  }

  return {
    title: `${post.title} | Writing | bitandink`,
    description: post.summary,
  };
}

export default async function WritingDetailPage({ params }: Props) {
  const { category, slug } = await params;
  const post = getWritingByCategoryAndSlug(category as WritingCategory, slug);

  if (!post) {
    notFound();
  }

  const navigation = getContentNavigation(
    getAllWritings().map((item) => ({
      slug: item.slug,
      title: item.title,
      href: `/writings/${item.category}/${item.slug}`,
    })),
    slug
  );

  return (
    <ContentDetailPage
      eyebrow={post.category.toUpperCase()}
      title={post.title}
      description={post.summary}
      navigation={navigation}
      bodyClassName="writing-body"
    >
      <MDXRemote source={post.content} />
    </ContentDetailPage>
  );
}