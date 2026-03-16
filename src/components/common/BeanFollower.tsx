"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function BeanFollower() {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const chance = Math.random();

    if (chance > 0.35) return;

    const timer = setTimeout(() => {
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 2400);
    }, 4000);

    function handleMove(e: MouseEvent) {
      setPos({
        x: e.clientX + 18,
        y: e.clientY + 18,
      });
    }

    window.addEventListener("mousemove", handleMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="bean-follower pointer-events-none fixed z-[220]"
      style={{
        left: pos.x,
        top: pos.y,
      }}
    >
      <div className="relative h-10 w-10 md:h-12 md:w-12">
        <Image
          src="/images/bean/bean-reaction.png"
          alt="bean"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}