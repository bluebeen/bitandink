import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Container from "@/components/common/Container";
import {
  getAllWritingParams,
  getCategoryLabel,
  getWritingPost,
  isWritingCategory,
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
    return {
      title: "Writing",
    };
  }

  const post = getWritingPost(category, slug);

  if (!post) {
    return {
      title: "Writing",
    };
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

  return (
    <section className="py-16 md:py-20">
      <Container>
        <article className="manuscript-paper rounded-[28px] px-6 py-8 md:px-8 md:py-10">
          <header className="mx-auto max-w-3xl border-b border-white/10 pb-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
              writings / {post.category}
            </p>

            <h1 className="mt-4 break-keep text-4xl font-semibold leading-tight text-[var(--color-text)] md:text-5xl">
              {post.title}
            </h1>

            <p className="mt-4 text-sm leading-7 text-[var(--color-sub)]">
              {post.summary}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-[var(--color-sub)]">
              <span>{post.date}</span>

              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="prose prose-invert mx-auto mt-10 max-w-3xl prose-headings:text-[var(--color-text)] prose-p:text-[var(--color-sub)] prose-strong:text-[var(--color-text)] prose-li:text-[var(--color-sub)]">
            <MDXRemote source={post.content} />
          </div>
        </article>
      </Container>
    </section>
  );
}