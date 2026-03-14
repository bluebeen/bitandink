import { ReactNode } from "react";

type SectionTitleProps = {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export default function SectionTitle({
  index,
  eyebrow,
  title,
  description,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
}: SectionTitleProps) {
  return (
    <div className={className}>
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-accent)]">
        {index && (
          <span className="mr-3 text-[var(--color-sub)]/70">{index}</span>
        )}
        {eyebrow}
      </p>

      <h2
        className={`mt-4 text-2xl font-semibold leading-[1.35] tracking-tight text-[var(--color-text)] md:text-[2.6rem] ${titleClassName}`}
      >
        {title}
      </h2>

      {description && (
        <div
          className={`mt-6 text-sm leading-7 text-[var(--color-sub)] md:text-base ${descriptionClassName}`}
        >
          {description}
        </div>
      )}
    </div>
  );
}