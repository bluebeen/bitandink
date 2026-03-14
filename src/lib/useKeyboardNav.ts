"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useKeyboardNav() {
  const router = useRouter();

  useEffect(() => {
    let lastKey = "";

    function handler(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const tagName = target?.tagName?.toLowerCase();

      if (
        tagName === "input" ||
        tagName === "textarea" ||
        target?.isContentEditable
      ) {
        lastKey = "";
        return;
      }

      if (lastKey === "g") {
        if (e.key === "w") router.push("/writings");
        if (e.key === "p") router.push("/portfolio");
        if (e.key === "s") router.push("/studio");
        if (e.key === "h") router.push("/");
        lastKey = "";
        return;
      }

      if (e.key === "g") {
        lastKey = "g";
        return;
      }

      lastKey = "";
    }

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);
}
