import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  href?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  sm: {
    image: 24,
    imageClass: "h-6 w-6",
    titleClass: "text-sm",
    subtitleClass: "text-[10px] tracking-[0.22em]",
    gapClass: "gap-2.5",
  },
  md: {
    image: 28,
    imageClass: "h-7 w-7",
    titleClass: "text-sm",
    subtitleClass: "text-[11px] tracking-[0.24em]",
    gapClass: "gap-3",
  },
  lg: {
    image: 36,
    imageClass: "h-9 w-9",
    titleClass: "text-base",
    subtitleClass: "text-xs tracking-[0.24em]",
    gapClass: "gap-3.5",
  },
};

function LogoInner({
  showText,
  size,
  className = "",
}: {
  showText: boolean;
  size: "sm" | "md" | "lg";
  className?: string;
}) {
  const current = sizeMap[size];

  return (
    <div className={`flex items-center ${current.gapClass} ${className}`}>
      <Image
        src="/images/brand/logo-symbol.png"
        alt="bitandink logo"
        width={current.image}
        height={current.image}
        className={current.imageClass}
      />

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-semibold text-[var(--color-text)] ${current.titleClass}`}>
            bitandink
          </span>
          <span
            className={`mt-1 uppercase text-[var(--color-sub)] ${current.subtitleClass}`}
          >
            code &amp; stories
          </span>
        </div>
      )}
    </div>
  );
}

export default function Logo({
  href = "/",
  showText = true,
  size = "md",
  className = "",
}: LogoProps) {
  if (!href) {
    return <LogoInner showText={showText} size={size} className={className} />;
  }

  return (
    <Link href={href} className="inline-flex">
      <LogoInner showText={showText} size={size} className={className} />
    </Link>
  );
}