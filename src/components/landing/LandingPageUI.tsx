import Link from "next/link";

import Container from "@/components/common/Container";
import BaseCard from "@/components/common/BaseCard";
import GhostIllustration from "@/components/common/GhostIllustration";

const introItems = [
  {
    title: "FRONTENDER",
    desc: "문제를 구조로 정리하고, 화면과 흐름을 설계합니다.",
  },
  {
    title: "WRITER",
    desc: "생각과 경험, 그리고 이야기를 문장으로 정리합니다.",
  },
  {
    title: "SITER",
    desc: "브랜드와 작업이 자연스럽게 보이는 웹사이트를 만듭니다.",
  },
];

function IdentityTags() {
  const tags = [
    { label: "WRITER", href: "/writings" },
    { label: "FRONTENDER", href: "/portfolio" },
    { label: "SITER", href: "/studio" },
  ];

  return (
    <div className="mt-7 flex flex-wrap gap-2.5">
      {tags.map((tag) => (
        <Link
          key={tag.label}
          href={tag.href}
          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)] transition hover:border-[var(--color-accent)] hover:bg-white/[0.06]"
        >
          {tag.label}
        </Link>
      ))}
    </div>
  );
}

function IntroCards() {
  return (
    <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-5">
      {introItems.map((item) => (
        <BaseCard
          key={item.title}
          hover={false}
          className="h-full rounded-[22px] border-white/10 bg-white/[0.03]"
        >
          <div className="relative flex min-h-[152px] flex-col">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)] md:text-xs">
              {item.title}
            </p>

            <span
              aria-hidden="true"
              className="absolute left-0 top-[24px] block h-px w-[72%]"
              style={{
                background:
                  "linear-gradient(to right, rgba(34,197,94,0.75), rgba(100,116,139,0.18))",
              }}
            />

            <p className="mt-7 break-keep text-sm leading-7 text-[color:rgba(203,213,225,0.78)]">
              {item.desc}
            </p>
          </div>
        </BaseCard>
      ))}
    </div>
  );
}

export default function LandingPageUI() {
  return (
    <section className="py-10 md:py-14">
      <Container>
        <section
          className="
          relative overflow-hidden
          rounded-[28px]
          border border-white/10
          terminal-frame terminal-paper-panel
          scanline noise-overlay code-overlay code-rain
          before:absolute before:inset-0
          before:bg-[radial-gradient(circle_at_30%_40%,rgba(34,197,94,0.08),transparent_60%)]
          before:pointer-events-none
      "
        >
          <div className="relative px-7 py-9 md:px-12 md:py-12 lg:px-12 lg:py-12">
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
              <div className="max-w-2xl">
                <p className="terminal-caret font-mono text-sm text-[var(--color-accent)]">
                  bitandink@beanlog.site:~$
                </p>

                <h1 className="mt-5 max-w-[11ch] break-keep text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--color-text)] md:mt-6 md:max-w-xl md:text-6xl">
                  코드와 이야기가
                  <br className="hidden md:block" />
                  <span className="md:hidden"> </span>
                  만나는 허브
                </h1>

                <p className="mt-4 text-[11px] uppercase tracking-[0.28em] text-[color:rgba(148,163,184,0.82)]">
                  CODE & STORIES
                </p>

                <p className="mt-5 max-w-xl break-keep text-sm leading-7 text-[color:rgba(203,213,225,0.74)] md:mt-6 md:text-[17px] md:leading-8">
                  개발과 글쓰기, 그리고 웹사이트 제작을
                  <br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>
                  하나의 흐름으로 묶어 정리하는 개인 허브입니다.
                </p>

                <IdentityTags />
              </div>

              <div className="relative hidden lg:flex lg:justify-center">
                <GhostIllustration
                  variant="home"
                  className="translate-y-2 scale-[0.94] opacity-95"
                />
              </div>
            </div>

            <IntroCards />
          </div>
        </section>
      </Container>
    </section>
  );
}
