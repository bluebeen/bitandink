import Link from "next/link";
import BaseCard from "@/components/common/BaseCard";
import { MetaBadge } from "@/components/ui/MetaBadge";
import { GradientDivider } from "@/components/ui/GradientDivider";
import { CommandRow } from "@/components/ui/CommandRow";

export type HubCardItem = {
  title: string;
  subtitle: string;
  desc: string;
  href: string;
  meta: string;
  command: string;
};

type HubCardsProps = {
  items: HubCardItem[];
  className?: string;
};

export default function HubCards({ items, className = "" }: HubCardsProps) {
  return (
    <div className={`grid gap-5 md:grid-cols-3 ${className}`}>
      {items.map((item) => (
        <Link key={item.title} href={item.href} className="block group">
          <BaseCard>
            {/* 호버 시 상단 glow */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.08),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative z-[1]">
              <MetaBadge className="bg-[rgba(34,197,94,0.10)]">
                {item.meta}
              </MetaBadge>

              <h3 className="mt-4 break-keep text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                {item.title}
              </h3>

              <p className="mt-2 break-keep text-sm text-[var(--color-sub)]">
                {item.subtitle}
              </p>

              <GradientDivider intensity="medium" />

              <p className="mt-5 min-h-[56px] break-keep text-sm leading-7 text-[var(--color-sub)]">
                {item.desc}
              </p>

              <CommandRow>{item.command}</CommandRow>
            </div>
          </BaseCard>
        </Link>
      ))}
    </div>
  );
}
