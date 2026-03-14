import { type ReactNode } from "react";
import { cx } from "@/lib/cx";

type CommandRowProps = {
  children: ReactNode;
  className?: string;
};

export function CommandRow({ children, className }: CommandRowProps) {
  return (
    <span
      className={cx(
        "mt-6 inline-flex items-center gap-2 font-mono text-sm text-[var(--color-text)]",
        className,
      )}
    >
      <span className="text-[var(--color-accent)]">$</span>
      {children}
      <span className="transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
    </span>
  );
}
