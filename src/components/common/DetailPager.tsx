import Link from "next/link";

type PagerItem = {
  href: string;
  label: string;
};

type Props = {
  prev?: PagerItem | null;
  next?: PagerItem | null;
  indexHref: string;
  indexLabel?: string;
};

export default function DetailPager({
  prev,
  next,
  indexHref,
  indexLabel = "return to index",
}: Props) {
  return (
    <nav
      aria-label="Detail navigation"
      className="mx-auto mt-16 max-w-3xl border-t border-white/10 pt-8"
    >
      {/* terminal header */}

      <p className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">
        navigation / records
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {/* prev */}

        <div>
          {prev ? (
            <Link
              href={prev.href}
              className="group block rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 transition hover:border-[var(--color-accent)]/40 hover:bg-white/[0.05]"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
                ← prev record
              </p>

              <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--color-text)] group-hover:text-[var(--color-accent)]">
                {prev.label}
              </p>
            </Link>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 px-4 py-4 text-sm text-[var(--color-sub)] opacity-60">
              no previous record
            </div>
          )}
        </div>

        {/* index */}

        <div>
          <Link
            href={indexHref}
            className="flex h-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm font-mono tracking-[0.05em] text-[var(--color-text)] transition hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]"
          >
            $ {indexLabel} 
          </Link>
        </div>

        {/* next */}

        <div>
          {next ? (
            <Link
              href={next.href}
              className="group block rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-right transition hover:border-[var(--color-accent)]/40 hover:bg-white/[0.05]"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
                next record →
              </p>

              <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--color-text)] group-hover:text-[var(--color-accent)]">
                {next.label}
              </p>
            </Link>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 px-4 py-4 text-right text-sm text-[var(--color-sub)] opacity-60">
              no next record
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
