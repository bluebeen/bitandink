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
  const tags = ["WRITER", "FRONTENDER", "SITER"];

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function IntroCards() {
  return (
    <div className="mt-8 grid gap-5 md:grid-cols-3">
      {introItems.map((item) => (
        <BaseCard key={item.title} hover={false}>
          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">
              {item.title}
            </p>

            <span
              aria-hidden="true"
              className="absolute left-0 top-[26px] block h-px w-[76%]"
              style={{
                background:
                  "linear-gradient(to right, rgba(34,197,94,0.82), rgba(100,116,139,0.22))",
              }}
            />

            <p className="mt-8 break-keep text-sm leading-7 text-[var(--color-sub)]">
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
    <section className="py-12 md:py-16">
      <Container>
        <section className="relative overflow-hidden rounded-[28px] border border-white/10 terminal-frame terminal-paper-panel scanline noise-overlay code-overlay code-rain">
          <div className="relative px-8 py-10 md:px-12 md:py-14">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
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

                <IdentityTags />
              </div>

              <GhostIllustration
                variant="home"
                className="hidden lg:block translate-y-[-10px]"
              />
            </div>

            <IntroCards />
          </div>
        </section>
      </Container>
    </section>
  );
}