import { ReactNode } from "react";

type ConceptPanelVariant = "writing" | "portfolio" | "studio";

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

function WireframeGhost() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 640"
      className="pointer-events-none absolute right-[-40px] top-[20px] z-0 w-[340px] text-emerald-300/20 md:right-[-10px] md:top-[10px] md:w-[420px]"
      fill="none"
    >
      <rect x="120" y="70" width="340" height="470" rx="20" stroke="currentColor" strokeWidth="2" />
      <rect x="150" y="110" width="280" height="40" rx="8" stroke="currentColor" strokeWidth="2" />
      <rect x="150" y="170" width="120" height="220" rx="10" stroke="currentColor" strokeWidth="2" />
      <rect x="285" y="170" width="145" height="100" rx="10" stroke="currentColor" strokeWidth="2" />
      <rect x="285" y="290" width="145" height="100" rx="10" stroke="currentColor" strokeWidth="2" />
      <rect x="150" y="415" width="280" height="80" rx="10" stroke="currentColor" strokeWidth="2" />
      <path d="M170 130H320" stroke="currentColor" strokeWidth="2" />
      <path d="M170 190H250" stroke="currentColor" strokeWidth="2" />
      <path d="M170 210H240" stroke="currentColor" strokeWidth="2" />
      <path d="M305 190H405" stroke="currentColor" strokeWidth="2" />
      <path d="M305 310H405" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function EditorialGhost() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 640"
      className="pointer-events-none absolute right-[-30px] top-[12px] z-0 w-[340px] text-cyan-300/20 md:right-[-10px] md:top-[0px] md:w-[420px]"
      fill="none"
    >
      <rect x="110" y="80" width="380" height="480" rx="16" stroke="currentColor" strokeWidth="2" />
      <line x1="220" y1="110" x2="220" y2="530" stroke="currentColor" strokeWidth="2" />
      <line x1="380" y1="110" x2="380" y2="530" stroke="currentColor" strokeWidth="2" />
      <rect x="135" y="120" width="60" height="120" rx="8" stroke="currentColor" strokeWidth="2" />
      <rect x="240" y="120" width="115" height="60" rx="8" stroke="currentColor" strokeWidth="2" />
      <rect x="395" y="120" width="70" height="180" rx="8" stroke="currentColor" strokeWidth="2" />
      <rect x="240" y="200" width="115" height="120" rx="8" stroke="currentColor" strokeWidth="2" />
      <rect x="135" y="265" width="60" height="160" rx="8" stroke="currentColor" strokeWidth="2" />
      <rect x="240" y="340" width="225" height="85" rx="8" stroke="currentColor" strokeWidth="2" />
      <rect x="135" y="445" width="330" height="65" rx="8" stroke="currentColor" strokeWidth="2" />
      <path d="M145 136H185" stroke="currentColor" strokeWidth="2" />
      <path d="M250 138H340" stroke="currentColor" strokeWidth="2" />
      <path d="M250 158H330" stroke="currentColor" strokeWidth="2" />
      <path d="M250 358H430" stroke="currentColor" strokeWidth="2" />
      <path d="M145 462H430" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function ConceptPanel({
  children,
  className = "",
  variant = "portfolio",
}: ConceptPanelProps) {
  const isWriting = variant === "writing";
  const isPortfolio = variant === "portfolio";
  const isStudio = variant === "studio";

  const outerClass = "relative overflow-hidden";

  const panelClass = isWriting
    ? "paper-surface manuscript-paper rounded-[32px] px-8 py-10 md:px-12 md:py-14"
    : "terminal-frame terminal-paper-panel scanline noise-overlay code-overlay code-rain rounded-3xl px-6 py-6 pt-14 md:px-12 md:py-12 md:pt-16";

  return (
    <section className={`${outerClass} ${className}`}>
      <div className={`relative ${panelClass}`}>
        {isWriting ? <QuillGhost /> : null}
        {isPortfolio ? <WireframeGhost /> : null}
        {isStudio ? <EditorialGhost /> : null}

        <div className="relative z-[1]">{children}</div>
      </div>
    </section>
  );
}