"use client";

import Image from "next/image";

type Props = {
  className?: string;
  variant?: "default" | "reaction" | "confused";
  clickable?: boolean;
};

const avatarMap: Record<NonNullable<Props["variant"]>, string> = {
  default: "/images/bean/bean-default.png",
  reaction: "/images/bean/bean-reaction.png",
  confused: "/images/bean/bean-confused.png",
};

export default function BeanAvatar({
  className = "",
  variant = "default",
  clickable = true,
}: Props) {
  function handleSecretTap() {
    if (!clickable) return;

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("bean:tap"));
    }
  }

  const sharedClassName = [
    "relative block overflow-hidden rounded-2xl bg-transparent",
    className,
  ].join(" ");

  const image = (
    <Image
      src={avatarMap[variant]}
      alt="Bean avatar"
      fill
      className="object-contain"
      sizes="(max-width: 768px) 96px, 128px"
    />
  );

  if (!clickable) {
    return <div className={sharedClassName}>{image}</div>;
  }

  return (
    <button
      type="button"
      onClick={handleSecretTap}
      aria-label="Bean avatar"
      className={[sharedClassName, "focus:outline-none"].join(" ")}
    >
      {image}
    </button>
  );
}