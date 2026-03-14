import Link from "next/link";
import type { ContentNavigationResult } from "@/lib/content-ts/types";

type Props = {
  navigation: ContentNavigationResult;
  sectionLabel?: string;
  listHref?: string;
};

export default function ContentNavigation({
  navigation,
  sectionLabel = "Post",
  listHref,
}: Props) {
  const { previous, next, currentIndex, totalCount } = navigation;

  return (
    <nav className="mt-16 border-t border-white/10 pt-8">
      <div className="mb-6 flex items-center justify-between text-sm text-neutral-400">
        <span>
          {sectionLabel} {String(currentIndex).padStart(2, "0")} /{" "}
          {String(totalCount).padStart(2, "0")}
        </span>

        {listHref ? (
          <Link href={listHref} className="transition hover:text-white">
            목록으로
          </Link>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="min-h-[96px] rounded-xl border border-white/10 p-4">
          {previous ? (
            <Link href={previous.href} className="block h-full">
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
                Previous
              </p>
              <p className="text-sm text-neutral-200">{previous.title}</p>
            </Link>
          ) : (
            <div className="h-full">
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-neutral-600">
                Previous
              </p>
              <p className="text-sm text-neutral-600">이전 항목이 없습니다.</p>
            </div>
          )}
        </div>

        <div className="min-h-[96px] rounded-xl border border-white/10 p-4">
          {next ? (
            <Link href={next.href} className="block h-full">
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
                Next
              </p>
              <p className="text-sm text-neutral-200">{next.title}</p>
            </Link>
          ) : (
            <div className="h-full">
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-neutral-600">
                Next
              </p>
              <p className="text-sm text-neutral-600">다음 항목이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}