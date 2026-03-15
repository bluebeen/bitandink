"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const G_PREFIX_TIMEOUT = 1200;

export default function useKeyboardNav() {
  const router = useRouter();

  useEffect(() => {
    let lastKey = "";
    let resetTimer: number | null = null;

    function clearPending() {
      lastKey = "";

      if (resetTimer !== null) {
        window.clearTimeout(resetTimer);
        resetTimer = null;
      }
    }

    function startPendingTimer() {
      if (resetTimer !== null) {
        window.clearTimeout(resetTimer);
      }

      resetTimer = window.setTimeout(() => {
        lastKey = "";
        resetTimer = null;
      }, G_PREFIX_TIMEOUT);
    }

    function handler(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const tagName = target?.tagName?.toLowerCase();

      if (
        tagName === "input" ||
        tagName === "textarea" ||
        target?.isContentEditable
      ) {
        clearPending();
        return;
      }

      const shortcutsModalOpen = document.querySelector(
        '[data-shortcuts-modal="open"]'
      );

      if (shortcutsModalOpen) {
        clearPending();
        return;
      }

      if (e.key === "Escape") {
        clearPending();
        return;
      }

      if (lastKey === "g") {
        if (e.key === "w") {
          clearPending();
          router.push("/writings");
          return;
        }

        if (e.key === "p") {
          clearPending();
          router.push("/portfolio");
          return;
        }

        if (e.key === "s") {
          clearPending();
          router.push("/studio");
          return;
        }

        if (e.key === "a") {
          clearPending();
          router.push("/about");
          return;
        }

        if (e.key === "h") {
          clearPending();
          router.push("/");
          return;
        }

        clearPending();
        return;
      }

      if (e.key === "g") {
        lastKey = "g";
        startPendingTimer();
        return;
      }

      clearPending();
    }

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
      clearPending();
    };
  }, [router]);
}