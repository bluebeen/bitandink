"use client";

import { useState } from "react";

export default function ScrapButton() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(window.location.href);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("copy failed", error);
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="
        rounded-full
        border border-white/10
        bg-white/[0.04]
        px-4 py-2
        font-mono text-xs
        text-[var(--color-sub)]
        transition
        hover:border-[var(--color-accent)]
        hover:text-[var(--color-accent)]
      "
    >
      {copied ? "주소 복사됨 ✓" : "스크랩"}
    </button>
  );
}