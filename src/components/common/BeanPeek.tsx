"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  storageKey: string;
  className?: string;
};

export default function BeanPeek({ storageKey, className = "" }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fullKey = `bean-peek:${storageKey}`;
    const alreadySeen = window.sessionStorage.getItem(fullKey);

    if (alreadySeen === "true") return;

    const triggerAt = 1200 + Math.floor(Math.random() * 1800);
    const chance = Math.random();

    // 약 35% 확률
    if (chance > 0.35) return;

    const timer = window.setTimeout(() => {
      setVisible(true);
      window.sessionStorage.setItem(fullKey, "true");

      const hideTimer = window.setTimeout(() => {
        setVisible(false);
      }, 1500);

      return () => window.clearTimeout(hideTimer);
    }, triggerAt);

    return () => window.clearTimeout(timer);
  }, [storageKey]);

  return (
    <div
      className={[
        "pointer-events-none absolute -top-10 right-2 z-20 transition-all duration-500 md:-top-12 md:right-4",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-2 opacity-0",
        className,
      ].join(" ")}
      aria-hidden="true"
    >
      <div className="relative h-16 w-16 md:h-20 md:w-20">
        <Image
          src="/images/bean/bean-reaction.png"
          alt="Bean peek"
          fill
          className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.28)]"
          sizes="80px"
        />
      </div>
    </div>
  );
}