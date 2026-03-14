import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import ContentDetailPage from "@/components/content-ui/ContentDetailPage";
import { getContentNavigation } from "@/lib/content-ts/navigation";
import {
  getAllWritings,
  getWritingsByCategory,
  getWritingByCategoryAndSlug,
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
  const post = getWritingByCategoryAndSlug(category, slug);

  if (!post) {
    return { title: "Not Found" };
  }

  return {
    title: `${post.title} | Writing | bitandink`,
    description: post.summary,
  };
}

export default async function WritingPostPage({ params }: Props) {
  const { category, slug } = await params;
  const post = getWritingByCategoryAndSlug(category, slug);

  if (!post || !post.published) {
    notFound();
  }

  const categoryPosts = getWritingsByCategory(category);

  const navigation = getContentNavigation({
    items: categoryPosts,
    currentSlug: post.slug,
    getSlug: (item) => item.slug,
    getTitle: (item) => item.title,
    getHref: (item) => `/writings/${item.category}/${item.slug}`,
  });

  const metaLine = [post.date, post.readingTime, post.category]
    .filter(Boolean)
    .join(" · ");

  return (
    <ContentDetailPage
      header={{
        section: "writing",
        eyebrow: "WRITING",
        title: post.title,
        summary: post.summary,
        metaLine,
      }}
      intro={
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">
            Category
          </p>
          <p className="text-base text-neutral-300">{post.category}</p>

          {post.tags?.length ? (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/10 px-2 py-1 text-xs text-neutral-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      }
      body={<MDXRemote source={post.content} />}
      actions={[
        {
          label: "Category Archive",
          href: `/writings/${post.category}`,
        },
      ]}
      navigation={navigation}
      navigationLabel="Writing"
      listHref={`/writings/${post.category}`}
    />
  );
}