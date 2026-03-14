import { cx } from "@/lib/cx";

// subtle  = 카드 기본 (WritingCard, ProjectCard, StudioServices 등)
// medium  = 호버 강조 카드 (HubCards, Featured)
const gradients = {
  subtle: "bg-[linear-gradient(to_right,rgba(34,197,94,0.42),rgba(100,116,139,0.10))]",
  medium: "bg-[linear-gradient(to_right,rgba(34,197,94,0.58),rgba(100,116,139,0.12))]",
} as const;

type GradientDividerProps = {
  /** Tailwind width class — default: w-[78%] */
  width?: string;
  /** 그라디언트 강도 — default: subtle */
  intensity?: keyof typeof gradients;
  className?: string;
};

export function GradientDivider({
  width = "w-[78%]",
  intensity = "subtle",
  className,
}: GradientDividerProps) {
  return (
    <div className={cx("mt-4 h-px", width, gradients[intensity], className)} />
  );
}
