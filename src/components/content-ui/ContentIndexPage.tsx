import Link from "next/link";
import Image from "next/image";
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
  thumbnail?: string;
};

type Props = {
  items: ContentIndexItem[];
  variant?: "portfolio" | "studio";
  withContainer?: boolean;
};

function ThumbnailBlock({
  src,
  alt,
  variant,
  featured = false,
}: {
  src?: string;
  alt: string;
  variant: "portfolio" | "studio";
  featured?: boolean;
}) {
  const heightClass = featured
    ? variant === "studio"
      ? "aspect-[4/3]"
      : "aspect-[16/10]"
    : variant === "studio"
        ? "aspect-[4/5]"
        : "aspect-[16/10]";

  if (!src) {
    return (
      <div
        className={[
          "relative overflow-hidden rounded-2xl border border-white/10",
          variant === "studio"
            ? "bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.12),transparent_34%),linear-gradient(to_bottom,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]"
            : "bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]",
          heightClass,
        ].join(" ")}
      >
        {variant === "portfolio" ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-35 bg-[linear-gradient(to_right,rgba(34,197,94,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.04)_1px,transparent_1px)] bg-[size:20px_20px]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.08),transparent_20%),radial-gradient(circle_at_72%_22%,rgba(34,197,94,0.08),transparent_24%)]"
          />
        )}

        <div className="absolute bottom-4 left-4 text-[11px] uppercase tracking-[0.22em] text-[var(--color-sub)]">
          {variant === "studio" ? "visual archive" : "selected work"}
        </div>
      </div>
    );
  }

  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5",
        heightClass,
      ].join(" ")}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
        sizes={
          featured
            ? "(max-width: 768px) 100vw, 50vw"
            : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        }
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
    </div>
  );
}

function ContentIndexInner({ items, variant = "portfolio" }: Omit<Props, "withContainer">) {
  const featuredItems = items.slice(0, 2);
  const restItems = items.slice(2);

  return (
    <div className="space-y-8 md:space-y-10">
      {featuredItems.length > 0 ? (
        <section className="grid gap-5 md:grid-cols-2">
          {featuredItems.map((item) => (
            <Link key={item.href} href={item.href} className="group block">
              <BaseCard
                className={[
                  "h-full overflow-hidden rounded-[28px] border p-4 md:p-5 transition duration-300",
                  variant === "studio"
                    ? "border-white/10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] hover:border-[var(--color-accent)]/35"
                    : "border-white/10 bg-[linear-gradient(to_bottom,rgba(34,197,94,0.08),rgba(255,255,255,0.03))] hover:border-[var(--color-accent)]/38",
                ].join(" ")}
              >
                <div className="space-y-5">
                  <ThumbnailBlock
                    src={item.thumbnail}
                    alt={item.title}
                    variant={variant}
                    featured
                  />

                  <div className="space-y-4 px-1">
                    <div className="flex items-center justify-between gap-4">
                      <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
                        {item.eyebrow ?? (variant === "studio" ? "studio note" : "featured work")}
                      </div>
                      {item.date ? (
                        <div className="text-xs text-[var(--color-sub)] opacity-80">
                          {item.date}
                        </div>
                      ) : null}
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-xl font-semibold text-[var(--color-text)] transition group-hover:text-[var(--color-accent)] md:text-2xl">
                        {item.title}
                      </h2>
                      <p className="line-clamp-4 text-sm leading-7 text-[color:rgba(203,213,225,0.75)]">
                        {item.summary}
                      </p>
                    </div>

                    {item.tags?.length ? (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {item.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--color-sub)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </BaseCard>
            </Link>
          ))}
        </section>
      ) : null}

      {restItems.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {restItems.map((item) => (
            <Link key={item.href} href={item.href} className="group block">
              <BaseCard
                className={[
                  "h-full rounded-[24px] border p-4 transition duration-300",
                  variant === "studio"
                    ? "border-white/10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] hover:border-[var(--color-accent)]/30 hover:bg-white/[0.07]"
                    : "border-white/10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] hover:border-[var(--color-accent)]/35 hover:bg-white/[0.07]",
                ].join(" ")}
              >
                <div className="space-y-4">
                  <ThumbnailBlock
                    src={item.thumbnail}
                    alt={item.title}
                    variant={variant}
                  />

                  <div className="space-y-3 px-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                        {item.eyebrow ?? (variant === "studio" ? "experiment" : "project")}
                      </div>
                      {item.date ? (
                        <div className="text-xs text-[var(--color-sub)] opacity-75">
                          {item.date}
                        </div>
                      ) : null}
                    </div>

                    <h2 className="text-lg font-semibold text-[var(--color-text)] transition group-hover:text-[var(--color-accent)]">
                      {item.title}
                    </h2>

                    <p
                      className={[
                        "text-sm leading-7 text-[color:rgba(203,213,225,0.72)]",
                        variant === "studio" ? "line-clamp-4" : "line-clamp-3",
                      ].join(" ")}
                    >
                      {item.summary}
                    </p>

                    {item.tags?.length ? (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-[var(--color-sub)]"
                          >
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 3 ? (
                          <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-[var(--color-sub)]">
                            +{item.tags.length - 3}
                          </span>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </BaseCard>
            </Link>
          ))}
        </section>
      ) : null}
    </div>
  );
}

export default function ContentIndexPage({
  items,
  variant = "portfolio",
  withContainer = true,
}: Props) {
  if (!withContainer) {
    return <ContentIndexInner items={items} variant={variant} />;
  }

  return (
    <Container className="py-14 md:py-20">
      <ContentIndexInner items={items} variant={variant} />
    </Container>
  );
}