import Link from "next/link";

type Props = {
  post: {
    slug: string;
    category: string;
    title: string;
    summary: string;
    date: string;
    readingTime: string;
    tags?: string[];
  };
};

export default function WritingCard({ post }: Props) {
  return (
    <Link
      href={`/writings/${post.category}/${post.slug}`}
      className="
        group block rounded-2xl border border-white/10
        bg-white/[0.02]
        p-6
        transition-all duration-200
        hover:-translate-y-[2px]
        hover:border-[var(--color-accent)]
        hover:bg-white/[0.04]
      "
    >
      <div className="flex flex-col gap-4 h-full">

        <p className="font-mono text-xs tracking-widest text-[var(--color-accent)] uppercase">
          {post.category}
        </p>

        <h3 className="text-xl font-semibold text-[var(--color-text)] group-hover:text-white">
          {post.title}
        </h3>

        <p className="text-sm text-[var(--color-sub)] line-clamp-3">
          {post.summary}
        </p>

        {post.tags?.length ? (
          <div className="flex flex-wrap gap-2 text-xs text-[var(--color-sub)]">
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        ) : null}

        <div className="mt-auto text-xs text-[var(--color-sub)] flex gap-2">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>

      </div>
    </Link>
  );
}