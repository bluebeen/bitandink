import Link from "next/link";
import { notFound } from "next/navigation";

import Container from "@/components/common/Container";
import {
  getPostsByCategory,
  getCategoryLabel,
  getCategoryDescription,
  isWritingCategory,
  type WritingCategory,
} from "@/lib/writings";

type Props = {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    page?: string;
    sort?: string;
  }>;
};

const POSTS_PER_PAGE = 6;

export async function generateMetadata({ params }: Props) {
  const { category } = await params;

  if (!isWritingCategory(category)) {
    return {
      title: "Writings",
    };
  }

  return {
    title: `${getCategoryLabel(category)} | Writings`,
    description: getCategoryDescription(category),
  };
}

export default async function WritingCategoryPage({
  params,
  searchParams,
}: Props) {
  const { category } = await params;
  const { page: pageParam, sort: sortParam } = await searchParams;

  if (!isWritingCategory(category)) {
    notFound();
  }

  const page = Number(pageParam) || 1;
  const sort = sortParam === "old" ? "old" : "latest";

  let posts = getPostsByCategory(category as WritingCategory);

  if (sort === "old") {
    posts = [...posts].reverse();
  }

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const start = (page - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(start, start + POSTS_PER_PAGE);

  return (
    <section className="py-16 md:py-20">
      <Container>
        <section className="manuscript-paper overflow-hidden rounded-[28px] px-6 py-8 md:px-8 md:py-10">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-sm tracking-[0.2em] text-[var(--color-accent)]">
                writings / {category}
              </p>

              <h1 className="mt-3 text-4xl font-semibold leading-tight text-[var(--color-text)] md:text-5xl">
                {getCategoryLabel(category)}
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-sub)] md:text-base">
                {getCategoryDescription(category)}
              </p>

              <p className="mt-4 text-xs text-[var(--color-sub)]">
                총 {posts.length}개의 글
              </p>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Link
                href={`/writings/${category}`}
                className={`rounded-full border px-4 py-2 transition ${
                  sort === "latest"
                    ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                    : "border-white/10 text-[var(--color-sub)] hover:border-white/20 hover:text-[var(--color-text)]"
                }`}
              >
                최신순
              </Link>

              <Link
                href={`/writings/${category}?sort=old`}
                className={`rounded-full border px-4 py-2 transition ${
                  sort === "old"
                    ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                    : "border-white/10 text-[var(--color-sub)] hover:border-white/20 hover:text-[var(--color-text)]"
                }`}
              >
                오래된순
              </Link>
            </div>
          </div>
          <hr className="mb-8 mt-8 h-px w-[92%] mx-auto border-[var(--color-accent)]/30"></hr>

          {paginatedPosts.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-10 text-sm text-[var(--color-sub)]">
              아직 공개된 글이 없습니다.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {paginatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/writings/${post.category}/${post.slug}`}
                  className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-200 hover:-translate-y-[2px] hover:border-[var(--color-accent)] hover:bg-white/[0.04]"
                >
                  <div className="flex h-full flex-col gap-4">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
                      {post.category}
                    </p>

                    <h2 className="text-xl font-semibold leading-snug text-[var(--color-text)] transition group-hover:text-white">
                      {post.title}
                    </h2>

                    <p className="line-clamp-3 text-sm leading-7 text-[var(--color-sub)]">
                      {post.summary}
                    </p>

                    {post.tags?.length ? (
                      <div className="text-xs text-[var(--color-sub)]">
                        {post.tags.map((tag, index) => (
                          <span key={tag}>
                            {index !== 0 && (
                              <span className="mx-2 opacity-40">·</span>
                            )}
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div className="mt-auto flex flex-wrap items-center gap-2 text-xs text-[var(--color-sub)]">
                      <span>{post.date}</span>
                      <span className="opacity-40">·</span>
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {totalPages > 1 ? (
            <div className="mt-14 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1;

                const href =
                  sort === "latest"
                    ? `/writings/${category}?page=${pageNumber}`
                    : `/writings/${category}?page=${pageNumber}&sort=${sort}`;

                const isActive = page === pageNumber;

                return (
                  <Link
                    key={pageNumber}
                    href={href}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      isActive
                        ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                        : "border-white/10 text-[var(--color-sub)] hover:border-white/20 hover:text-[var(--color-text)]"
                    }`}
                  >
                    {pageNumber}
                  </Link>
                );
              })}
            </div>
          ) : null}
        </section>
      </Container>
    </section>
  );
}