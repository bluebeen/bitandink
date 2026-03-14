import Link from "next/link";
import type { ContentAction } from "@/lib/content-ts/types";

type Props = {
  actions?: ContentAction[];
};

export default function ContentActions({ actions = [] }: Props) {
  if (!actions.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 pt-8">
      {actions.map((action) => {
        if (action.href) {
          return (
            <Link
              key={action.label}
              href={action.href}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noreferrer noopener" : undefined}
              className="inline-flex items-center rounded-md border border-white/10 px-3 py-2 text-sm text-neutral-200 transition hover:border-emerald-400/40 hover:text-white"
            >
              {action.label}
            </Link>
          );
        }

        return (
          <button
            key={action.label}
            type="button"
            onClick={action.onClick}
            className="inline-flex items-center rounded-md border border-white/10 px-3 py-2 text-sm text-neutral-200 transition hover:border-emerald-400/40 hover:text-white"
          >
            {action.label}
          </button>
        );
      })}
    </div>
  );
}