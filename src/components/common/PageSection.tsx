import { type ReactNode } from "react";
import { cx } from "@/lib/cx";

type PageSectionProps = {
  children: ReactNode;
  /** 기본: py-16 md:py-24. className으로 override 가능 */
  className?: string;
};

export default function PageSection({ children, className }: PageSectionProps) {
  return (
    <section className={cx("py-16 md:py-24", className)}>
      {children}
    </section>
  );
}
