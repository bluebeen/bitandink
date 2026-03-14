import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { GradientDivider } from "@/components/ui/GradientDivider";

const services = [
  {
    title: "소개형 홈페이지",
    desc: "브랜드 소개, 작업 소개, 문의 유도를 중심으로 한 간결한 구조의 사이트",
  },
  {
    title: "포트폴리오형 사이트",
    desc: "작업 사례와 기록이 잘 보이도록 설계한 개인/브랜드 포트폴리오",
  },
  {
    title: "모바일 UX 정리",
    desc: "작은 화면에서도 정보가 더 잘 읽히고 행동이 쉬워지도록 구조를 다듬는 작업",
  },
];

export default function StudioServices() {
  return (
    <section className="pb-20">
      <Container>
        <SectionTitle
          index="01"
          eyebrow="what i build"
          title={
            <>
              필요한 구조를
              <br />
              담백하고 선명하게 만듭니다
            </>
          }
          description={
            <>
              화려한 기능보다 중요한 건, 브랜드와 정보가 잘 보이고
              자연스럽게 문의로 이어지는 흐름입니다.
            </>
          }
          titleClassName="max-w-[720px]"
          descriptionClassName="max-w-[560px]"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="paper-surface rounded-2xl p-6">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">
                SERVICE
              </p>

              <h3 className="mt-4 text-xl font-semibold text-[var(--color-text)]">
                {service.title}
              </h3>

              <GradientDivider />

              <p className="mt-5 text-sm leading-7 text-[var(--color-sub)]">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
