import { ReactNode } from "react";

type ConceptPanelVariant = "terminal" | "manuscript" | "writing";

type ConceptPanelProps = {
  children: ReactNode;
  className?: string;
  variant?: ConceptPanelVariant;
};

function QuillGhost() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 512 512"
      className="pointer-events-none absolute right-[-20px] top-[10px] z-0 w-[420px] text-[var(--color-text)] opacity-[0.09] md:right-[-10px] md:top-[0px] md:w-[480px]"
      fill="none"
    >
      <path
        d="M455 54C391 60 320 96 259 157C205 211 164 275 129 333C109 365 91 397 72 428L114 458C145 439 178 422 211 404C272 371 339 330 395 274C457 212 489 132 455 54Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M144 389C183 351 231 302 279 254C319 214 360 174 395 139"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M124 408L89 452" stroke="currentColor" strokeWidth="2" />
      <path d="M117 391L149 422" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function ConceptPanel({
  children,
  className = "",
  variant = "terminal",
}: ConceptPanelProps) {
  const isTerminal = variant === "terminal";
  const isManuscript = variant === "manuscript";
  const isWriting = variant === "writing";

  const outerClass = "relative overflow-hidden";
  const gridClass =
    isTerminal || isManuscript || isWriting ? "manuscript-grid" : "";

  const panelClass = isTerminal
    ? "terminal-frame terminal-paper-panel scanline noise-overlay code-overlay rounded-3xl px-6 py-6 pt-14 md:px-12 md:py-12 md:pt-16"
    : "paper-surface rounded-[32px] px-8 py-10 md:px-12 md:py-14";

  return (
    <section className={`${outerClass} ${gridClass} ${className}`}>
      <div className={`relative ${panelClass}`}>
        {isWriting && (
          <>
            <QuillGhost />
          </>
        )}

        <div className="relative z-[1]">{children}</div>
      </div>
    </section>
  );
}