"use client";

import { useEffect, useState } from "react";

const shortcuts = [
  { keys: ["g", "h"], label: "home" },
  { keys: ["g", "w"], label: "writings" },
  { keys: ["g", "p"], label: "portfolio" },
  { keys: ["g", "s"], label: "studio" },
  { keys: ["g", "a"], label: "about" },
  { keys: ["←"], label: "previous post (post page)" },
  { keys: ["→"], label: "next post (post page)" },
  { keys: ["esc"], label: "back / close modal" },
  { keys: ["?"], label: "toggle shortcuts" },
];

export default function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);

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

      if (e.key === "?") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      data-shortcuts-modal="open"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-6 backdrop-blur-sm"
    >
      <div className="terminal-frame terminal-paper-panel w-full max-w-lg rounded-3xl p-6 pt-14 md:p-8 md:pt-16">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-accent)]">
              keyboard shortcuts
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-text)]">
              빠른 이동
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[var(--color-text)] transition hover:bg-white/10"
            aria-label="단축키 모달 닫기"
          >
            ×
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {shortcuts.map((item) => (
            <div
              key={`${item.keys.join("-")}-${item.label}`}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3"
            >
              <span className="text-sm text-[var(--color-sub)]">
                {item.label}
              </span>

              <div className="flex items-center gap-2">
                {item.keys.map((key) => (
                  <kbd
                    key={key}
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-xs uppercase text-[var(--color-text)]"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 font-mono text-xs text-[var(--color-sub)]">
          press <span className="text-[var(--color-accent)]">?</span> to toggle
        </p>
      </div>
    </div>
  );
}