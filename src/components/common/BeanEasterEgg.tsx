"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const BEAN_FULL_SRC = "/images/bean/bean-full.png";
const OPEN_KEYWORDS = ["bean", "open-bean"];
const TAP_RESET_MS = 2200;
const REQUIRED_TAPS = 5;

type BeanMode = "default" | "sleeping" | "meal";

type BeanState = {
  mode: BeanMode;
  statusLine: string;
  bootMessage: string;
  title: string;
  lines: string[];
  showImage: boolean;
};

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;

  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT" ||
    target.isContentEditable
  );
}

function getKoreaHour() {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Seoul",
    hour: "2-digit",
    hour12: false,
  });

  return Number(formatter.format(new Date()));
}

function getBeanStateByTime(): BeanState {
  const hour = getKoreaHour();

  const isBreakfast = hour >= 7 && hour < 9;
  const isLunch = hour >= 12 && hour < 14;
  const isDinner = hour >= 18 && hour < 20;
  const isMealTime = isBreakfast || isLunch || isDinner;

  const isLateNight = hour >= 23 || hour < 6;

  if (isLateNight) {
    return {
      mode: "sleeping",
      statusLine: "status: asleep",
      bootMessage: "> locating bean...",
      title: "Bean is resting now.",
      lines: [
        "지금은 Bean이 쉬고 있는 시간이에요.",
        "숙녀는 자야 할 시간이에요.",
        "잠자는 숙녀의 방을 훔쳐볼 생각은 아니죠?",
        "내일 다시 오면 반갑게 인사해 줄 거예요.",
      ],
      showImage: false,
    };
  }

  if (isMealTime) {
    return {
      mode: "meal",
      statusLine: "status: away for meal",
      bootMessage: "> locating bean...",
      title: "Bean is having a meal.",
      lines: [
        "Bean은 지금 식사 중이에요.",
        "아카이브를 지키려면 든든히 먹어야 하거든요.",
        "잠시 뒤에 다시 오면 만날 수 있어요.",
      ],
      showImage: false,
    };
  }

  return {
    mode: "default",
    statusLine: "resident profile loaded",
    bootMessage: "> initializing bean...",
    title: "Hello, I&apos;m Bean.",
    lines: [
      "안녕하세요, 저는 Bean이에요.",
      "beanlog.site에 살고 있어요.",
      "코딩에 관심이 많고 글 쓰는 걸 좋아해요. 책 읽는 것두요.",
      "가끔은 아카이브를 정리하고,",
      "가끔은 사이트를 돌아다니며 기록을 살펴봐요.",
      "우리 엄..아니, 언니는(엄마라고 부르면 화내요!)",
      "이름 끝자가 '빈'이고 키가 작아서 별명이 콩꼬마(콩꼬)래요.",
      "그래서 제 이름을 Bean이라고 지었어요.",
      "저는 마음에 들어요. 빈이는 빈을 좋아하거든요.",
      "저를 또 만나게 된다면 잘 탐험하고 있다는 뜻이에요.",
    ],
    showImage: true,
  };
}

export default function BeanEasterEgg() {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [tapCount, setTapCount] = useState(0);

  const [bootText, setBootText] = useState("");
  const [visibleLineCount, setVisibleLineCount] = useState(0);
  const [beanState, setBeanState] = useState<BeanState>(getBeanStateByTime());

  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const linesTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const tags = useMemo(
    () => ["archive resident", "likes coding", "writes notes", "reads books"],
    []
  );

  useEffect(() => {
    function openBeanModal() {
      const state = getBeanStateByTime();
      setBeanState(state);
      setBootText("");
      setVisibleLineCount(0);
      setOpen(true);
      setTyped("");
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (open && event.key === "Enter") {
        setOpen(false);
        return;
      }

      if (isEditableTarget(event.target)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const key = event.key.toLowerCase();
      if (key.length !== 1 && key !== "-") return;

      const next = `${typed}${key}`.slice(-20);
      setTyped(next);

      if (OPEN_KEYWORDS.some((keyword) => next.includes(keyword))) {
        openBeanModal();
      }
    }

    function handleBeanTap() {
      setTapCount((prev) => {
        const next = prev + 1;

        if (next >= REQUIRED_TAPS) {
          openBeanModal();
          return 0;
        }

        return next;
      });

      if (tapTimerRef.current) {
        clearTimeout(tapTimerRef.current);
      }

      tapTimerRef.current = setTimeout(() => {
        setTapCount(0);
      }, TAP_RESET_MS);
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("bean:tap", handleBeanTap as EventListener);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("bean:tap", handleBeanTap as EventListener);

      if (tapTimerRef.current) {
        clearTimeout(tapTimerRef.current);
      }

      if (linesTimerRef.current) {
        clearInterval(linesTimerRef.current);
      }
    };
  }, [typed, open]);

  useEffect(() => {
    if (!open) return;

    let charIndex = 0;

    const typingTimer = setInterval(() => {
      charIndex += 1;
      setBootText(beanState.bootMessage.slice(0, charIndex));

      if (charIndex >= beanState.bootMessage.length) {
        clearInterval(typingTimer);

        let lineIndex = 0;
        linesTimerRef.current = setInterval(() => {
          lineIndex += 1;
          setVisibleLineCount(lineIndex);

          if (lineIndex >= beanState.lines.length && linesTimerRef.current) {
            clearInterval(linesTimerRef.current);
          }
        }, 170);
      }
    }, 42);

    return () => {
      clearInterval(typingTimer);

      if (linesTimerRef.current) {
        clearInterval(linesTimerRef.current);
      }
    };
  }, [open, beanState]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Bean easter egg"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-5xl overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(to_bottom,rgba(15,23,42,0.98),rgba(2,6,23,0.96))] shadow-2xl"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_18%_20%,rgba(34,197,94,0.12),transparent_30%),linear-gradient(to_right,rgba(34,197,94,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:auto,24px_24px,24px_24px]"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,rgba(34,197,94,0.75),rgba(100,116,139,0.10),transparent)]" />

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-[var(--color-sub)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          close
        </button>

        <div className="relative grid items-center gap-10 px-6 py-6 md:grid-cols-[minmax(0,1fr)_440px] md:px-8 md:py-8">
          <div className="min-w-0">
            <p className="font-mono text-xs tracking-[0.25em] text-[var(--color-accent)] md:text-sm">
              bean@beanlog.site:~$ open-bean
            </p>

            <p className="mt-3 min-h-[24px] font-mono text-[12px] text-[var(--color-accent)] md:text-sm">
              {bootText}
              <span className="ml-0.5 inline-block animate-pulse">|</span>
            </p>

            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[color:rgba(148,163,184,0.80)]">
              {beanState.statusLine}
            </p>

            <h2
              className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-[var(--color-text)] md:text-4xl"
              dangerouslySetInnerHTML={{ __html: beanState.title }}
            />

            <div className="mt-5 space-y-3">
              {beanState.lines.slice(0, visibleLineCount).map((line) => (
                <p
                  key={line}
                  className="break-keep text-sm leading-7 text-[color:rgba(203,213,225,0.78)] md:text-base md:leading-8"
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-sub)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-5 text-xs text-[var(--color-sub)] opacity-80">
              tip: press <span className="font-mono text-[var(--color-text)]">Esc</span> or{" "}
              <span className="font-mono text-[var(--color-text)]">Enter</span> to close
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative flex w-full max-w-[420px] items-end justify-center">
              <div className="absolute bottom-5 h-8 w-[220px] rounded-full bg-black/35 blur-xl" />

              {beanState.showImage ? (
                <div className="bean-idle bean-escape-attempt relative h-[560px] w-[400px] md:h-[620px] md:w-[440px]">
                  <Image
                    src={BEAN_FULL_SRC}
                    alt="Bean full body"
                    fill
                    className="object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.38)]"
                    priority
                    sizes="(max-width: 768px) 400px, 440px"
                  />
                </div>
              ) : (
                <div className="flex h-[420px] w-full items-center justify-center rounded-[26px] border border-dashed border-white/10 bg-white/[0.03] px-8 text-center">
                  <div className="space-y-3">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">
                      bean room unavailable
                    </p>
                    <p className="break-keep text-sm leading-7 text-[var(--color-sub)] md:text-base">
                      {beanState.mode === "sleeping"
                        ? "지금은 Bean이 쉬고 있는 시간이에요."
                        : "지금은 Bean이 식사하러 잠시 자리를 비웠어요."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}