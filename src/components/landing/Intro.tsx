"use client";

import { useState } from "react";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";

const introItems = [
  {
    title: "BUILD",
    desc: "화면과 구조를 설계하고, 사용성과 흐름을 다듬습니다.",
  },
  {
    title: "WRITE",
    desc: "생각과 경험, 그리고 이야기를 문장으로 정리합니다.",
  },
  {
    title: "SITE",
    desc: "브랜드와 작업이 자연스럽게 보이는 웹사이트를 만듭니다.",
  },
];

const sketchItems = [
  { label: "BIT", value: "build" },
  { label: "INK", value: "write" },
  { label: "SITE", value: "connect" },
];

export default function Intro() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="relative md:min-h-[470px]">
          <div
            className={`relative z-10 origin-top-left transition-all duration-500 ease-out ${
              isExpanded
                ? "md:w-[52%] md:-translate-x-2 md:scale-[0.985]"
                : "md:w-[72%] md:translate-x-0 md:scale-100"
            }`}
          >
            <SectionTitle
              index="01"
              eyebrow="about this hub"
              title={
                <>
                  <span className="block">코드를 통해 문제를 풀고,</span>
                  <span className="block">글을 통해 생각을 정리합니다.</span>
                </>
              }
              description={
                <>
                  bitandink는 개발과 글쓰기를 따로 두지 않습니다.
                  <br />
                  만들고, 기록하고, 다듬는 과정을
                  <br />
                  하나의 흐름으로 묶는 공간입니다.
                </>
              }
              titleClassName={
                isExpanded
                  ? "md:max-w-[500px] md:text-[2.35rem]"
                  : "md:max-w-[680px] md:text-[3rem]"
              }
              descriptionClassName={
                isExpanded ? "md:max-w-[500px]" : "md:max-w-[560px]"
              }
            />

            <button
              type="button"
              onMouseEnter={() => setIsExpanded(true)}
              onMouseLeave={() => setIsExpanded(false)}
              onFocus={() => setIsExpanded(true)}
              onBlur={() => setIsExpanded(false)}
              className="mt-8 block w-full text-left outline-none md:w-[420px]"
              aria-label="Build, Write, Site 카드 열기"
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
            className={`hidden md:absolute md:right-0 md:block md:w-[40%] transition-all duration-500 ease-out ${
              isExpanded
                ? "md:top-16 pointer-events-auto"
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
            <div className="h-px w-[82%] bg-[linear-gradient(to_right,rgba(100,116,139,0.04),rgba(34,197,94,0.16),rgba(100,116,139,0.04))]" />
          </div>
        </div>
      </Container>
    </section>
  );
}