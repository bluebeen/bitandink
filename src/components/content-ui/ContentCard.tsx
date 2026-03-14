import Link from "next/link";
import type { ContentCardItem } from "@/lib/content-ts/types";

type Props = {
  item: ContentCardItem;
};

export default function ContentCard({ item }: Props) {
  return (
    <Link
      href={item.href}
      className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-emerald-400/30 hover:bg-white/[0.04]"
    >
      <div className="space-y-4">
        {item.eyebrow ? (
          <p className="text-xs font-medium tracking-[0.18em] text-neutral-500">
            {item.eyebrow}
          </p>
        ) : null}

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-white transition group-hover:text-[var(--color-accent)]/80">
            {item.title}
          </h2>
          <p className="text-sm leading-7 text-neutral-400">{item.summary}</p>
        </div>

        {item.tags?.length ? (
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
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
    </Link>
  );
}