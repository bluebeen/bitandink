import Image from "next/image";

type Props = {
  command: string;
  status: string;
  title: string;
  description?: string;
  meta?: string[];
  thumbnail?: string;
  thumbnailAlt?: string;
  variant?: "portfolio" | "studio";
};

const shellClass = {
  portfolio:
    "bg-[linear-gradient(to_bottom,rgba(15,23,42,0.98),rgba(2,6,23,0.95))]",
  studio:
    "bg-[linear-gradient(to_bottom,rgba(15,23,42,0.97),rgba(2,6,23,0.94))]",
};

const overlayClass = {
  portfolio:
    "bg-[radial-gradient(circle_at_18%_18%,rgba(34,197,94,0.12),transparent_28%),linear-gradient(to_right,rgba(34,197,94,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.04)_1px,transparent_1px)] bg-[size:auto,24px_24px,24px_24px]",
  studio:
    "bg-[radial-gradient(circle_at_14%_18%,rgba(34,197,94,0.12),transparent_28%),radial-gradient(circle_at_78%_22%,rgba(255,255,255,0.06),transparent_24%),radial-gradient(circle_at_58%_74%,rgba(34,197,94,0.06),transparent_24%)]",
};

export default function DetailCommandHero({
  command,
  status,
  title,
  description,
  meta = [],
  thumbnail,
  thumbnailAlt,
  variant = "portfolio",
}: Props) {
  return (
    <section
      className={[
        "relative overflow-hidden rounded-[30px] border border-white/10 terminal-frame",
        shellClass[variant],
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 opacity-80",
          overlayClass[variant],
        ].join(" ")}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,rgba(34,197,94,0.78),rgba(100,116,139,0.12),transparent)]" />

      <div className="relative grid gap-6 px-6 py-6 md:px-8 md:py-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
        <div className="min-w-0">
          <p className="font-mono text-xs text-[var(--color-accent)] md:text-sm">
            bean@bitandink:~$ {command}
          </p>

          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[color:rgba(148,163,184,0.80)]">
            {status}
          </p>

          <h1 className="mt-5 break-keep text-3xl font-semibold tracking-[-0.03em] text-[var(--color-text)] md:text-5xl">
            {title}
          </h1>

          {description ? (
            <p className="mt-4 max-w-2xl break-keep text-sm leading-7 text-[color:rgba(203,213,225,0.76)] md:text-base md:leading-8">
              {description}
            </p>
          ) : null}

          {meta.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {meta.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-sub)]"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.05] aspect-[16/10]">
            {thumbnail ? (
              <>
                <Image
                  src={thumbnail}
                  alt={thumbnailAlt ?? title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
              </>
            ) : (
              <>
                {variant === "portfolio" ? (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-35 bg-[linear-gradient(to_right,rgba(34,197,94,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.05)_1px,transparent_1px)] bg-[size:22px_22px]"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.08),transparent_20%),radial-gradient(circle_at_74%_24%,rgba(34,197,94,0.08),transparent_24%)]"
                  />
                )}

                <div className="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-sub)]">
                  {variant === "studio" ? "visual archive" : "selected work"}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}