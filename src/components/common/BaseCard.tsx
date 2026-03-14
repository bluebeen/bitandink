import { type ReactNode } from "react";
import { cx } from "@/lib/cx";

type BaseCardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export default function BaseCard({
  children,
  className = "",
  hover = true,
}: BaseCardProps) {
  return (
    <div
      className={cx(
        "paper-surface relative overflow-hidden rounded-2xl p-6",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(34,197,94,0.30)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.18)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
