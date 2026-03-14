import Link from "next/link";
import Container from "@/components/common/Container";
import ConceptPanel from "@/components/common/ConceptPanel";
import SectionTitle from "@/components/common/SectionTitle";
import BaseCard from "@/components/common/BaseCard";
import Button from "@/components/common/Button";

const identityItems = [
  {
    title: "Writer",
    desc: "최이사각(perfugium)이라는 이름으로 소설, 에세이, 시놉시스, 스크립트를 씁니다.",
  },
  {
    title: "Frontender",
    desc: "문제를 구조로 정리하고, 화면과 흐름을 설계하는 프론트엔드 작업을 합니다.",
  },
  {
    title: "Siter",
    desc: "Bean Web Studio라는 이름으로 작고 단단한 브랜드 홈페이지를 만듭니다.",
  },
];

const pathItems = [
  {
    label: "Writings",
    href: "/writings",
    desc: "이야기와 문장, 구조와 장면",
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    desc: "프론트엔드 작업과 UX 기록",
  },
  {
    label: "Studio",
    href: "/studio",
    desc: "브랜드 홈페이지 제작 사례",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <Container>
          <ConceptPanel variant="manuscript">
            <div className="max-w-2xl">
              <p className="font-mono text-sm text-[var(--color-accent)]">
                bitandink@beanlog.site:~$
              </p>

              <SectionTitle
                eyebrow="about"
                title={
                  <>
                    코드와 이야기 사이를
                    <br />
                    오가며 작업합니다
                  </>
                }
                description={
                  <>
                    bitandink는 개발과 글쓰기를 따로 두지 않는 이름입니다.
                    <br />
                    만들고, 쓰고, 정리하는 방식을 하나의 흐름으로 묶습니다.
                  </>
                }
                className="mt-6"
                titleClassName="max-w-[700px] md:text-[3.1rem]"
                descriptionClassName="max-w-[560px]"
              />

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[rgba(100,116,139,0.18)] bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-sub)]">
                <span className="text-[var(--color-accent)]">domain</span>
                <span>beanlog.site</span>
              </div>
            </div>
          </ConceptPanel>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <SectionTitle
            index="01"
            eyebrow="identity"
            title={
              <>
                세 가지 축이
                <br />
                지금의 bitandink를 만듭니다
              </>
            }
            description={
              <>
                writer, frontender, siter.
                <br />
                따로 떨어진 역할이 아니라 서로를 보완하는 방식입니다.
              </>
            }
            titleClassName="max-w-[720px]"
            descriptionClassName="max-w-[560px]"
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {identityItems.map((item) => (
              <BaseCard key={item.title} hover={false}>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  {item.title}
                </p>

                <div className="mt-4 h-px w-[78%] bg-[linear-gradient(to_right,rgba(34,197,94,0.42),rgba(100,116,139,0.10))]" />

                <p className="mt-5 text-sm leading-7 text-[var(--color-sub)]">
                  {item.desc}
                </p>
              </BaseCard>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <SectionTitle
            index="02"
            eyebrow="why this site"
            title={
              <>
                이 사이트는
                <br />
                작업의 결을 정리하는 허브입니다
              </>
            }
            description={
              <>
                글쓰기와 개발, 그리고 사이트 제작은 전혀 다른 분야처럼 보이지만
                실제로는 모두 구조를 만들고 흐름을 다듬는 일이라고 생각합니다.
              </>
            }
            titleClassName="max-w-[720px]"
            descriptionClassName="max-w-[620px]"
          />

          <div className="mt-10 paper-surface rounded-[28px] px-6 py-8 md:px-8 md:py-10">
            <p className="text-sm leading-8 text-[var(--color-sub)] md:text-base">
              소설을 쓸 때는 인물과 장면의 흐름을 생각하고,
              화면을 만들 때는 정보와 행동의 흐름을 생각합니다.
              <br />
              브랜드 사이트를 만들 때도 결국은
              무엇이 먼저 보이고, 어디로 자연스럽게 이어질지를 설계합니다.
              <br />
              그래서 이 사이트는 서로 다른 작업을 모아두는 곳이 아니라,
              하나의 태도로 만든 결과들을 정리하는 공간에 가깝습니다.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <SectionTitle
            index="03"
            eyebrow="paths"
            title={
              <>
                관심 있는 방향으로
                <br />
                바로 이동할 수 있습니다
              </>
            }
            description="writings, portfolio, studio 세 갈래로 나뉘어 있습니다."
            titleClassName="max-w-[720px]"
            descriptionClassName="max-w-[520px]"
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pathItems.map((item) => (
              <Link key={item.label} href={item.href} className="block group">
                <BaseCard>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">
                    path
                  </p>

                  <h3 className="mt-4 text-2xl font-semibold text-[var(--color-text)]">
                    {item.label}
                  </h3>

                  <div className="mt-4 h-px w-[78%] bg-[linear-gradient(to_right,rgba(34,197,94,0.42),rgba(100,116,139,0.10))]" />

                  <p className="mt-5 text-sm leading-7 text-[var(--color-sub)]">
                    {item.desc}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-[var(--color-text)]">
                    <span className="text-[var(--color-accent)]">$</span>
                    open --{item.label.toLowerCase()}
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </BaseCard>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/portfolio" variant="terminal">
              포트폴리오 보기
            </Button>
            <Button href="/writings" variant="secondary">
              글 보러가기
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}