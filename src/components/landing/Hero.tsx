import Container from "@/components/common/Container";
import PageSection from "@/components/common/PageSection";
import HubCards from "@/components/common/HubCards";
import ConceptPanel from "@/components/common/ConceptPanel";

const hubItems = [
  {
    title: "Stories",
    subtitle: "소설 · 에세이 · 시놉시스 · 스크립트",
    href: "/writings",
    meta: "WRITER",
    desc: "필명 최이사각(perfugium)으로 쓰고 기획한 작업들.",
    command: "open --writings",
  },
  {
    title: "Portfolio",
    subtitle: "개발 포트폴리오",
    href: "/portfolio",
    meta: "FRONTENDER",
    desc: "프론트엔드 중심의 작업과 설계 기록.",
    command: "open --portfolio",
  },
  {
    title: "Bean Web Studio",
    subtitle: "홈페이지 제작 외주",
    href: "/studio",
    meta: "SITER",
    desc: "작고 단단한 브랜드 홈페이지 제작.",
    command: "open --studio",
  },
];

export default function Hero() {
  return (
    <PageSection>
      <Container>
        <ConceptPanel variant="terminal">
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
              개발자이자 글 쓰는 사람으로서의 작업을
              <br />
              하나의 랜딩에 담았습니다.
              <br />
              코드와 이야기, 그리고 작은 웹 스튜디오까지.
            </p>

            <p className="mt-4 font-mono text-xs text-[var(--color-sub)]">
              beanlog.site
            </p>
          </div>

          <HubCards items={hubItems} className="mt-10" />
        </ConceptPanel>
      </Container>
    </PageSection>
  );
}
