import { ReactNode } from "react";

type TerminalPanelProps = {
  children: ReactNode;
  className?: string;
  withFrame?: boolean;
  withEffects?: boolean;
};

export default function TerminalPanel({
  children,
  className = "",
  withFrame = true,
  withEffects = true,
}: TerminalPanelProps) {
  const frameClass = withFrame ? "terminal-frame" : "";
  const effectsClass = withEffects ? "scanline noise-overlay code-overlay" : "";

  return (
    <div
      className={`${frameClass} terminal-paper-panel ${effectsClass} rounded-3xl p-6 pt-14 md:p-12 md:pt-16 ${className}`}
    >
      {children}
    </div>
  );
}