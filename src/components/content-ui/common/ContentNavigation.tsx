import Link from "next/link";
import type { ContentNavigationResult } from "@/lib/content-ts/navigation";

type Props = {
  navigation: ContentNavigationResult;
};

export default function ContentNavigation({ navigation }: Props) {
  if (!navigation) return null;

  const { prev, next } = navigation;

  if (!prev && !next) return null;

  return (
    <nav className="mt-14 grid gap-4 border-t border-white/10 pt-8 md:grid-cols-2">
      <div>
        {prev ? (
          <Link
            href={prev.href}
            className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-[rgba(34,197,94,0.26)] hover:bg-white/[0.04]"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Previous
            </p>
            <p className="mt-3 text-base font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)]">
              {prev.title}
            </p>
          </Link>
        ) : null}
      </div>

      <div>
        {next ? (
          <Link
            href={next.href}
            className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-right transition hover:border-[rgba(34,197,94,0.26)] hover:bg-white/[0.04]"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Next
            </p>
            <p className="mt-3 text-base font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)]">
              {next.title}
            </p>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}