import Image from "next/image";

type BeanAvatarProps = {
  className?: string;
};

export default function BeanAvatar({ className = "" }: BeanAvatarProps) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[320px] ${className}`}
      aria-hidden="true"
    >
      {/* glow */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.18),transparent_65%)] blur-2xl" />

      {/* avatar */}
      <Image
        src="/images/bean-avatar.png"
        alt=""
        width={420}
        height={420}
        priority
        className="
          relative
          opacity-30
          saturate-[0.85]
          contrast-[0.9]
          blur-[0.4px]
          drop-shadow-[0_0_40px_rgba(34,197,94,0.25)]
          select-none
          pointer-events-none
        "
      />

      {/* fade overlay */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(circle,transparent_50%,rgba(2,6,23,0.7)_85%)]
        "
      />
    </div>
  );
}