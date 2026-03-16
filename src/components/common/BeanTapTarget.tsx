"use client";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function BeanTapTarget({ className = "", children }: Props) {
  function handleTap() {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("bean:tap"));
    }
  }

  return (
    <button
      type="button"
      onClick={handleTap}
      aria-label="Open Bean easter egg"
      className={className}
    >
      {children}
    </button>
  );
}