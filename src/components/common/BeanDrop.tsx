"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type DropState = {
  visible: boolean;
  left: number;
  id: number;
};

const DISPLAY_MS = 1350;

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;

  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT" ||
    target.isContentEditable
  );
}

export default function BeanDrop() {
  const [drop, setDrop] = useState<DropState>({
    visible: false,
    left: 20,
    id: 0,
  });

  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function triggerDrop() {
      const viewportWidth = window.innerWidth;
      const padding = 56;
      const beanWidth = 96;
      const min = padding;
      const max = Math.max(padding, viewportWidth - beanWidth - padding);
      const left = Math.floor(Math.random() * (max - min + 1)) + min;

      setDrop((prev) => ({
        visible: false,
        left,
        id: prev.id + 1,
      }));

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setDrop((prev) => ({
            ...prev,
            visible: true,
          }));
        });
      });

      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }

      hideTimerRef.current = setTimeout(() => {
        setDrop((prev) => ({
          ...prev,
          visible: false,
        }));
      }, DISPLAY_MS);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (isEditableTarget(event.target)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      if (event.key.toLowerCase() === "b") {
        triggerDrop();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[210] overflow-hidden"
    >
      <div
        key={drop.id}
        className={[
          "absolute top-0 h-24 w-24 md:h-28 md:w-28",
          drop.visible ? "bean-drop-active" : "bean-drop-hidden",
        ].join(" ")}
        style={{ left: `${drop.left}px` }}
      >
        <Image
          src="/images/bean/bean-drop.png"
          alt="Bean drop"
          fill
          className="object-contain"
          sizes="112px"
          priority={false}
        />
      </div>
    </div>
  );
}