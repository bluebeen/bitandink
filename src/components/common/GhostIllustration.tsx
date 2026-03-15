import Image from "next/image";

type Props = {
  variant?: "home" | "about";
  className?: string;
};

export default function GhostIllustration({
  variant = "home",
  className = "",
}: Props) {
  const isAbout = variant === "about";

  return (
    <div
      className={`relative mx-auto ${
        isAbout ? "max-w-[360px]" : "max-w-[340px]"
      } ${className}`}
      aria-hidden="true"
    >
      <Image
        src="/images/bean-avatar.png"
        alt=""
        width={520}
        height={700}
        priority
        className={`
          h-auto w-full
          select-none pointer-events-none
          ${isAbout ? "opacity-70" : "opacity-40"}
          drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]
        `}
      />
    </div>
  );
}