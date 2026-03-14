import Link from "next/link";
import Container from "@/components/common/Container";
import BaseCard from "@/components/common/BaseCard";

export type ContentIndexItem = {
  href: string;
  title: string;
  summary: string;
  eyebrow?: string;
  tags?: string[];
  slug?: string;
  date?: string;
};

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: ContentIndexItem[];
};

export default function ContentIndexPage({
  eyebrow,
  title,
  description,
  items,
}: Props) {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="space-y-3">
          {eyebrow ? (
            <p className="text-sm tracking-[0.2em] text-neutral-500">
              {eyebrow}
            </p>
          ) : null}

          <h1 className="text-4xl font-semibold leading-tight text-[var(--color-text)] md:text-5xl">
            {title}
          </h1>

          {description ? (
            <p className="max-w-3xl text-lg leading-8 text-[var(--color-sub)]">
              {description}
            </p>
          ) : null}
        </div>

        <div className="mt-10 grid gap-6">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="block group">
              <BaseCard>
                <div className="space-y-3">
                  {item.eyebrow ? (
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
                      {item.eyebrow}
                    </p>
                  ) : null}

                  <h2 className="text-2xl font-semibold text-[var(--color-text)] transition group-hover:text-[var(--color-accent)]">
                    {item.title}
                  </h2>

                  <p className="max-w-4xl text-sm leading-7 text-[var(--color-sub)]">
                    {item.summary}
                  </p>

                  {item.tags?.length ? (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-[var(--color-sub)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </BaseCard>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}