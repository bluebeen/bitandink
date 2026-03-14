import { ReactNode } from "react";

export type ConceptPanelVariant = "hub" | "writing" | "portfolio" | "studio";

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
      className="h-auto w-[140px] lg:w-[360px] text-[var(--color-text)] opacity-[0.18]"
      fill="none"
    >
    <path stroke="currentColor" strokeWidth="2"
      d="M215.263,126.425c5.256-9.1,12.004-17.834,21.468-25.815c-18.62,7.25-36.02,17.36-51.55,29.92
			c-32.69,24.15-57.61,59.27-68.55,101.68c-0.6,2.33-1.15,4.66-1.67,6.98v0.02c-0.11,0.53-0.23,1.06-0.34,1.58
			c-0.056,0.27-0.104,0.54-0.159,0.811c-0.18,0.883-0.36,1.769-0.528,2.649c-0.021,0.115-0.039,0.226-0.06,0.34
			c-0.076,0.41-0.143,0.82-0.216,1.23c-0.052,0.27-0.099,0.54-0.144,0.801c-0.061,0.348-0.117,0.691-0.176,1.037
			c-0.316,1.873-0.602,3.745-0.858,5.616c-0.052,0.372-0.104,0.743-0.156,1.117c-0.061,0.442-0.111,0.881-0.163,1.321
			c-0.026,0.206-0.056,0.413-0.081,0.62c0.002-0.001,0.003-0.002,0.005-0.003c0,0.001,0,0.002,0,0.003
			c-0.43,3.51-0.75,7.01-0.96,10.5l-0.043,0.904c1.133,0.076,2.032,1.01,2.032,2.162c0,1.202-0.975,2.177-2.177,2.177
			c-0.021,0-0.04-0.006-0.061-0.006l-0.021,0.443l-0.09,1.85v5.02h4.26c0.05-0.15,0.12-0.3,0.18-0.45c0.5-1.16,1.02-2.34,1.59-3.49
			c2.27-4.68,5.11-9.06,8.39-11.13c-6.48-8.34-5.25-19.44-4.36-23.81c0.011-0.067,0.025-0.127,0.039-0.189
			c0.137-0.609,0.273-1.211,0.419-1.821c0.37-1.6,0.75-3.19,1.16-4.78c5.12-19.82,13.38-37.99,24.12-54.11
			c-11.07,21.04-15.68,39.04-18.15,55.78c0.43-0.19,0.832-0.449,1.28-0.59c35.166-11.08,50.687-28.924,60.631-49.08h-28.321
			l31.669-7.308c1.252-2.932,2.424-5.9,3.559-8.892h-16.508l18.062-4.168c4.207-11.435,8.133-23.118,13.978-34.352h-17.28
			L215.263,126.425z"
    />
		<path stroke="currentColor" strokeWidth="2"
      d="M110.763,291.91c0,0,1.49-5.79,4.12-12.19c0.04-0.11,0.09-0.23,0.14-0.34h-4.26V291.91z"
    />
    </svg>
  );
}

function WireframeGhost() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 640"
      className="h-auto w-36 text-[var(--color-accent)]/20 lg:w-48"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
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
      className="h-auto w-36 text-cyan-300/20 lg:w-48"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
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
  const isHub = variant === "hub";
  const isWriting = variant === "writing";
  const isPortfolio = variant === "portfolio";
  const isStudio = variant === "studio";

  const panelClass = isWriting
    ? "paper-surface manuscript-paper"
    : "terminal-frame terminal-paper-panel scanline noise-overlay code-overlay code-rain";

  return (
    <section
      className={`relative overflow-hidden rounded-[28px] border border-white/10 ${panelClass} ${className}`}
    >
      <div className="relative px-6 py-8 md:px-10 md:py-10">
        <div className="max-w-3xl pr-0 md:pr-52 lg:pr-64">{children}</div>

        <div
          className={`pointer-events-none absolute hidden justify-end md:flex ${
            isWriting
              ? "top-[-36px] -right-20"
              : "right-0 top-0 items-start pr-8 pt-6"
          }`}
        >
          {isHub ? <QuillGhost /> : null}
          {isWriting ? <QuillGhost /> : null}
          {isPortfolio ? <WireframeGhost /> : null}
          {isStudio ? <EditorialGhost /> : null}
        </div>
      </div>
    </section>
  );
}