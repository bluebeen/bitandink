import { type ReactNode } from "react";
import { cx } from "@/lib/cx";

type MetaBadgeProps = {
  children: ReactNode;
  className?: string;
};

export function MetaBadge({ children, className }: MetaBadgeProps) {
  return (
    <p
      className={cx(
        "inline-flex rounded-md bg-[rgba(34,197,94,0.08)] px-2 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-accent)]",
        className,
      )}
    >
      {children}
    </p>
  );
}
