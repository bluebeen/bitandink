import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import ConceptPanel from "@/components/common/ConceptPanel";
import Button from "@/components/common/Button";

const processSteps = [
  {
    step: "01",
    title: "요청과 목표 확인",
    desc: "어떤 사이트가 필요한지, 무엇을 가장 잘 보여줘야 하는지 먼저 정리합니다. 브랜드 소개인지, 작업 소개인지, 문의 전환인지 목적을 분명히 잡습니다.",
  },
  {
    step: "02",
    title: "구조와 화면 방향 정리",
    desc: "필요한 페이지 수와 정보 구조를 정리하고, 모바일에서 어떻게 읽히고 이동할지를 먼저 생각합니다. 이 단계에서 전체 흐름이 거의 결정됩니다.",
  },
  {
    step: "03",
    title: "디자인 및 제작",
    desc: "잡은 구조를 바탕으로 실제 화면을 만들고, 톤과 분위기를 정리합니다. 과한 장식보다 정보가 잘 보이는 균형을 우선합니다.",
  },
  {
    step: "04",
    title: "피드백 반영과 마무리",
    desc: "수정이 필요한 부분을 반영하고, 최종적으로 사이트가 자연스럽게 읽히는지 확인합니다. 필요한 경우 간단한 운영 가이드도 함께 정리합니다.",
  },
];

export default function StudioProcessPage() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <ConceptPanel variant="terminal">
          <div className="max-w-2xl">
            <p className="font-mono text-sm text-[var(--color-accent)]">
              studio@beanlog.site:~$
            </p>

            <SectionTitle
              eyebrow="process"
              title={
                <>
                  작업은 간단하고
                  <br />
                  분명한 흐름으로 진행합니다
                </>
              }
              description={
                <>
                  필요한 만큼만 복잡하게, 가능한 한 명확하게 진행합니다.
                  <br />
                  처음 상담부터 최종 마무리까지의 기본 흐름입니다.
                </>
              }
              className="mt-6"
              titleClassName="max-w-[720px] md:text-[3rem]"
              descriptionClassName="max-w-[560px]"
            />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {processSteps.map((item) => (
              <div key={item.step} className="paper-surface rounded-2xl p-6 md:p-7">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  step {item.step}
                </p>

                <h3 className="mt-4 text-xl font-semibold text-[var(--color-text)]">
                  {item.title}
                </h3>

                <div className="mt-4 h-px w-[78%] bg-[linear-gradient(to_right,rgba(34,197,94,0.42),rgba(100,116,139,0.10))]" />

                <p className="mt-5 text-sm leading-7 text-[var(--color-sub)]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/studio/contact" variant="primary">
              문의하기
            </Button>

            <Button href="/studio" variant="terminal">
              스튜디오 메인으로
            </Button>
          </div>
        </ConceptPanel>
      </Container>
    </section>
  );
}