"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  prevUrl?: string | null;
  nextUrl?: string | null;
  escapeUrl: string;
};

export default function PostKeyboardNav({
  prevUrl = null,
  nextUrl = null,
  escapeUrl,
}: Props) {
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const tagName = target?.tagName?.toLowerCase();

      if (
        tagName === "input" ||
        tagName === "textarea" ||
        target?.isContentEditable
      ) {
        return;
      }

      const shortcutsModalOpen = document.querySelector(
        '[data-shortcuts-modal="open"]'
      );

      if (shortcutsModalOpen) {
        return;
      }

      if (e.key === "ArrowLeft" && prevUrl) {
        e.preventDefault();
        router.push(prevUrl);
        return;
      }

      if (e.key === "ArrowRight" && nextUrl) {
        e.preventDefault();
        router.push(nextUrl);
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        router.push(escapeUrl);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router, prevUrl, nextUrl, escapeUrl]);

  return null;
}