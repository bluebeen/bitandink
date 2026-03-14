"use client";

import { useState } from "react";

import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";

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

const sketchItems = [
  { label: "BIT", value: "build" },
  { label: "INK", value: "write" },
  { label: "SITE", value: "connect" },
];

function LandingHero() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <section className="relative overflow-hidden rounded-[28px] border border-white/10 terminal-frame terminal-paper-panel scanline noise-overlay code-overlay code-rain">
          <div className="relative px-8 py-10 md:px-12 md:py-14">
            <div className="max-w-2xl">
              <p className="terminal-caret font-mono text-sm text-[var(--color-accent)]">
                bitandink@beanlog.site:~$
              </p>

              <h1 className="mt-6 max-w-xl break-keep text-4xl font-semibold leading-[1.15] tracking-tight text-[var(--color-text)] md:text-6xl md:leading-[1.1]">
                코드와 이야기가
                <br />
                만나는 허브
              </h1>

              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[var(--color-sub)]">
                CODE & STORIES
              </p>

              <p className="mt-6 max-w-xl break-keep text-sm leading-7 text-[var(--color-sub)] md:text-lg">
                개발과 글쓰기, 그리고 웹사이트 제작을
                <br />
                하나의 흐름으로 묶어 정리하는 개인 허브입니다.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["WRITER", "FRONTENDER", "SITER"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-5 font-mono text-xs text-[var(--color-sub)]">
                beanlog.site
              </p>
            </div>
          </div>
        </section>
      </Container>
    </section>
  );
}

function LandingIntro() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="relative md:min-h-[430px]">
          <div
            className={`relative z-10 origin-top-left transition-all duration-500 ease-out ${
              isExpanded
                ? "md:w-[54%] md:-translate-x-1 md:scale-[0.992]"
                : "md:w-[68%] md:translate-x-0 md:scale-100"
            }`}
          >
            <SectionTitle
              index="01"
              eyebrow="how this works"
              title={
                <>
                  <span className="block">만들고, 기록하고,</span>
                  <span className="block">하나의 흐름으로 정리합니다.</span>
                </>
              }
              description={
                <>
                  bitandink는 결과물만 모아두는 공간이 아니라,
                  <br />
                  작업의 방향과 태도를 함께 보여주는 허브입니다.
                </>
              }
              titleClassName={
                isExpanded
                  ? "md:max-w-[520px] md:text-[2.25rem]"
                  : "md:max-w-[640px] md:text-[2.8rem]"
              }
              descriptionClassName={
                isExpanded ? "md:max-w-[500px]" : "md:max-w-[540px]"
              }
            />

            <button
              type="button"
              onMouseEnter={() => setIsExpanded(true)}
              onMouseLeave={() => setIsExpanded(false)}
              onFocus={() => setIsExpanded(true)}
              onBlur={() => setIsExpanded(false)}
              className="mt-8 block w-full text-left outline-none md:w-[400px]"
              aria-label="BIT, INK, SITE 카드 열기"
            >
              <div
                className={`w-full rounded-2xl border bg-white/[0.02] p-6 transition-all duration-300 ${
                  isExpanded
                    ? "border-[rgba(34,197,94,0.26)] shadow-[0_0_24px_rgba(34,197,94,0.08)]"
                    : "border-white/10 hover:border-[rgba(34,197,94,0.20)]"
                }`}
              >
                <div className="space-y-5">
                  {sketchItems.map((item, index) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="flex w-10 flex-col items-center pt-1">
                        <span
                          className={`h-2 w-2 rounded-full border transition-all duration-300 ${
                            isExpanded
                              ? "border-[var(--color-accent)] bg-[rgba(34,197,94,0.28)] shadow-[0_0_8px_rgba(34,197,94,0.18)]"
                              : "border-[var(--color-accent)] bg-[rgba(34,197,94,0.18)]"
                          }`}
                        />
                        {index !== sketchItems.length - 1 && (
                          <span
                            className={`mt-1 h-10 w-px transition-all duration-300 ${
                              isExpanded
                                ? "bg-[linear-gradient(to_bottom,rgba(34,197,94,0.58),rgba(100,116,139,0.22))]"
                                : "bg-[linear-gradient(to_bottom,rgba(34,197,94,0.42),rgba(100,116,139,0.18))]"
                            }`}
                          />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm text-[var(--color-sub)]">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <p
                  className={`mt-5 hidden font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 md:block ${
                    isExpanded
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-sub)]/70"
                  }`}
                >
                  {isExpanded ? "expanded" : "hover to expand"}
                </p>
              </div>
            </button>
          </div>

          <div
            className={`hidden md:absolute md:right-0 md:block md:w-[38%] transition-all duration-500 ease-out ${
              isExpanded
                ? "md:top-14 pointer-events-auto"
                : "md:top-10 pointer-events-none"
            }`}
          >
            <div
              className={`space-y-4 transition-all duration-500 ease-out ${
                isExpanded
                  ? "translate-x-0 opacity-100"
                  : "translate-x-4 opacity-45"
              }`}
            >
              {introItems.map((item, index) => (
                <div
                  key={item.title}
                  className={`paper-surface rounded-2xl p-6 transition-all duration-500 ease-out md:p-7 ${
                    isExpanded
                      ? "scale-100 shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
                      : "scale-[0.985]"
                  }`}
                  style={{
                    transitionDelay: isExpanded ? `${index * 70}ms` : "0ms",
                    transform: isExpanded ? "translateY(0px)" : "translateY(4px)",
                    opacity: isExpanded ? 1 : 0.42,
                  }}
                >
                  <div className="relative">
                    <p
                      className={`font-mono text-xs uppercase tracking-[0.22em] transition-colors duration-300 ${
                        isExpanded
                          ? "text-[var(--color-accent)]"
                          : "text-[rgba(34,197,94,0.72)]"
                      }`}
                    >
                      {item.title}
                    </p>

                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[26px] block h-px w-[76%] opacity-100"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(34,197,94,0.82), rgba(100,116,139,0.22))",
                      }}
                    />

                    <p className="mt-8 break-keep text-sm leading-7 text-[var(--color-sub)]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 hidden md:block">
            <div className="h-px w-[80%] bg-[linear-gradient(to_right,rgba(100,116,139,0.04),rgba(34,197,94,0.16),rgba(100,116,139,0.04))]" />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function LandingPageUI() {
  return (
    <>
      <LandingHero />
      <LandingIntro />
    </>
  );
}