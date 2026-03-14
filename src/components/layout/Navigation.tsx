"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/writings", label: "Writings" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/studio", label: "Studio" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="hidden items-center gap-6 md:flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm text-[var(--color-sub)] transition-colors duration-200 hover:text-[var(--color-text)]"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] text-[var(--color-text)] transition-colors duration-200 hover:bg-white/[0.04] md:hidden"
        aria-label="메뉴 열기"
        aria-expanded={open}
      >
        <span className="flex flex-col gap-1.5">
          <span className="block h-px w-5 bg-current" />
          <span className="block h-px w-5 bg-current" />
          <span className="block h-px w-5 bg-current" />
        </span>
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-50 border-b border-white/10 bg-[rgba(15,23,42,0.96)] backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-4xl flex-col px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm text-[var(--color-sub)] transition-colors duration-200 hover:text-[var(--color-text)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}