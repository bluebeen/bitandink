type Props = {
    command: string;
    status: string;
    title: string;
    description?: string;
    variant?: "writings" | "portfolio" | "studio";
  };
  
  const variantShellClass: Record<NonNullable<Props["variant"]>, string> = {
    writings:
      "bg-[linear-gradient(to_bottom,rgba(15,23,42,0.96),rgba(2,6,23,0.94))]",
    portfolio:
      "bg-[linear-gradient(to_bottom,rgba(15,23,42,0.98),rgba(2,6,23,0.95))]",
    studio:
      "bg-[linear-gradient(to_bottom,rgba(15,23,42,0.97),rgba(2,6,23,0.94))]",
  };
  
  const variantOverlayClass: Record<NonNullable<Props["variant"]>, string> = {
    writings:
      "bg-[radial-gradient(circle_at_16%_18%,rgba(34,197,94,0.10),transparent_34%)]",
    portfolio:
      "bg-[radial-gradient(circle_at_18%_22%,rgba(34,197,94,0.12),transparent_30%),linear-gradient(to_right,rgba(34,197,94,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.04)_1px,transparent_1px)] bg-[size:auto,24px_24px,24px_24px]",
    studio:
      "bg-[radial-gradient(circle_at_14%_18%,rgba(34,197,94,0.12),transparent_28%),radial-gradient(circle_at_78%_26%,rgba(255,255,255,0.06),transparent_24%),radial-gradient(circle_at_58%_75%,rgba(34,197,94,0.06),transparent_26%)]",
  };
  
  export default function SectionCommandHeader({
    command,
    status,
    title,
    description,
    variant = "writings",
  }: Props) {
    return (
      <header
        className={[
          "relative overflow-hidden rounded-[28px] border border-white/10",
          "terminal-frame",
          variantShellClass[variant],
        ].join(" ")}
      >
        <div
          className={[
            "pointer-events-none absolute inset-0 opacity-80",
            variantOverlayClass[variant],
          ].join(" ")}
          aria-hidden="true"
        />
  
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,rgba(34,197,94,0.8),rgba(100,116,139,0.12),transparent)]" />
  
        <div className="relative px-6 py-7 md:px-8 md:py-9">
          <p className="font-mono text-xs text-[var(--color-accent)] md:text-sm">
            bean@bitandink:~$ {command}
          </p>
  
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[color:rgba(148,163,184,0.80)]">
            {status}
          </p>
  
          <h1 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-[var(--color-text)] md:text-5xl">
            {title}
          </h1>
  
          {description ? (
            <p className="mt-4 max-w-2xl break-keep text-sm leading-7 text-[color:rgba(203,213,225,0.78)] md:text-base md:leading-8">
              {description}
            </p>
          ) : null}
        </div>
      </header>
    );
  }