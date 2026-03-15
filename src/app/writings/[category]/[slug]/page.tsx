import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import Container from "@/components/common/Container";
import LikeButton from "@/components/common/LikeButton";
import ScrapButton from "@/components/common/ScrapButton";
import Comments from "@/components/common/Comments";
import ViewCounter from "@/components/common/ViewCounter";
import PostKeyboardNav from "@/components/common/PostKeyboardNav";

import {
  getAllWritingParams,
  getCategoryLabel,
  getWritingPost,
  isWritingCategory,
  getAdjacentPosts,
} from "@/lib/writings";

type Props = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllWritingParams();
}

export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params;

  if (!isWritingCategory(category)) {
    return { title: "Writing" };
  }

  const post = getWritingPost(category, slug);

  if (!post) {
    return { title: "Writing" };
  }

  return {
    title: `${post.title} | ${getCategoryLabel(post.category)}`,
    description: post.summary,
  };
}

export default async function WritingDetailPage({ params }: Props) {
  const { category, slug } = await params;

  if (!isWritingCategory(category)) {
    notFound();
  }

  const post = getWritingPost(category, slug);

  if (!post) {
    notFound();
  }

  const { prev, next } = getAdjacentPosts(post.category, post.slug);

  const prevUrl = prev ? `/writings/${prev.category}/${prev.slug}` : null;
  const nextUrl = next ? `/writings/${next.category}/${next.slug}` : null;
  const escapeUrl = `/writings/${post.category}`;

  return (
    <section className="py-16 md:py-20">
      <PostKeyboardNav
        prevUrl={prevUrl}
        nextUrl={nextUrl}
        escapeUrl={escapeUrl}
      />

      <Container>
        <article className="manuscript-paper rounded-[28px] px-6 py-8 md:px-8 md:py-10">
          <header className="mx-auto max-w-3xl border-b border-white/10 pb-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
              writings / {post.category}
            </p>

            {post.tags?.length ? (
              <div className="mt-4 text-sm text-[var(--color-sub)]">
                {post.tags.map((tag, index) => (
                  <span key={tag}>
                    {index !== 0 && <span className="mx-2 opacity-40">·</span>}
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            <h1 className="mt-6 break-keep text-4xl font-semibold leading-tight text-[var(--color-text)] md:text-5xl">
              {post.title}
            </h1>

            <p className="mt-4 text-sm leading-7 text-[var(--color-sub)]">
              {post.summary}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-[var(--color-sub)]">
              <span>{post.date}</span>
              <span>⏱ {post.readingTime}</span>

              <ViewCounter slug={post.slug} category={post.category} />

              <LikeButton slug={post.slug} category={post.category} />

              <div className="sm:ml-auto">
                <ScrapButton />
              </div>
            </div>
          </header>

          <div className="article-body prose prose-invert mx-auto mt-10 max-w-3xl prose-headings:text-[var(--color-text)] prose-p:text-[var(--color-sub)] prose-strong:text-[var(--color-text)] prose-li:text-[var(--color-sub)]">
            <MDXRemote source={post.content} />
          </div>

          <div className="mx-auto mt-16 max-w-3xl border-t border-white/10 pt-10">
            <div className="flex justify-between gap-6 text-sm">
              {prev ? (
                <Link
                  href={`/writings/${prev.category}/${prev.slug}`}
                  className="opacity-70 transition hover:opacity-100"
                >
                  ← {prev.title}
                </Link>
              ) : (
                <div />
              )}

              {next ? (
                <Link
                  href={`/writings/${next.category}/${next.slug}`}
                  className="text-right opacity-70 transition hover:opacity-100"
                >
                  {next.title} →
                </Link>
              ) : null}
            </div>
          </div>

          <Comments slug={post.slug} category={post.category} />
        </article>
      </Container>
    </section>
  );
}