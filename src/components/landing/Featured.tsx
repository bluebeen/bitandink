import Link from "next/link";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { GradientDivider } from "@/components/ui/GradientDivider";
import { CommandRow } from "@/components/ui/CommandRow";

const featuredItems = [
  {
    eyebrow: "LATEST WRITING",
    title: "소설, 에세이, 시놉시스, 스크립트를 모아둡니다.",
    desc: "최이사각(perfugium)이라는 필명으로 쓰고 기획한 이야기와 글을 정리합니다.",
    href: "/writings",
    cta: "글 보러가기",
  },
  {
    eyebrow: "FEATURED PROJECT",
    title: "프론트엔드 작업과 설계 기록을 보여줍니다.",
    desc: "만든 결과물만이 아니라 문제를 어떻게 풀었는지까지 정리합니다.",
    href: "/portfolio",
    cta: "프로젝트 보기",
  },
  {
    eyebrow: "RECENT BUILD",
    title: "작고 단단한 브랜드 사이트를 제작합니다.",
    desc: "Bean Web Studio에서 소개형 사이트와 포트폴리오형 홈페이지를 만듭니다.",
    href: "/studio",
    cta: "스튜디오 보기",
  },
];

export default function Featured() {
  return (
    <section className="pt-10 pb-16 md:pt-12 md:pb-20">
      <Container>
        <SectionTitle
          index="02"
          eyebrow="featured paths"
          title={
            <>
              최근의 작업과 방향을
              <br />
              세 갈래로 나눠 보여줍니다.
            </>
          }
          description={
            <>
              글쓰기, 개발, 그리고 사이트 제작.
              <br />
              지금의 bitandink를 이루는 세 개의 축입니다.
            </>
          }
          titleClassName="max-w-[720px]"
          descriptionClassName="max-w-[560px]"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featuredItems.map((item) => (
            <Link
              key={item.eyebrow}
              href={item.href}
              className="paper-surface group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(34,197,94,0.34)] hover:shadow-[0_12px_30px_rgba(34,197,94,0.08)]"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.08),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-[1]">
                {/* eyebrow는 배지 아닌 텍스트 스타일 — MetaBadge 미사용 */}
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-[rgba(34,197,94,0.78)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                  {item.eyebrow}
                </p>

                <h3 className="mt-4 break-keep text-xl font-semibold leading-[1.4] text-[var(--color-text)]">
                  {item.title}
                </h3>

                <GradientDivider intensity="medium" />

                <p className="mt-5 break-keep text-sm leading-7 text-[var(--color-sub)]">
                  {item.desc}
                </p>

                <CommandRow className="mt-7">{item.cta}</CommandRow>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
