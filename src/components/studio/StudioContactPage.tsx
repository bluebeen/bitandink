import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import ConceptPanel from "@/components/common/ConceptPanel";
import Button from "@/components/common/Button";

const contactItems = [
  {
    title: "어떤 사이트가 필요한지",
    desc: "소개형 홈페이지인지, 포트폴리오형 사이트인지, 혹은 기존 사이트 개선인지 알려주세요.",
  },
  {
    title: "필요한 페이지 수",
    desc: "예: 메인 / 소개 / 작업 / 문의처럼 대략적인 구성만 알려주셔도 됩니다.",
  },
  {
    title: "원하는 분위기",
    desc: "참고 사이트나 좋아하는 톤이 있다면 함께 전달해주시면 방향을 더 빨리 잡을 수 있습니다.",
  },
  {
    title: "희망 일정",
    desc: "대략적인 일정이 있다면 함께 알려주세요. 가능한 범위 안에서 조율합니다.",
  },
];

export default function StudioContactPage() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <ConceptPanel variant="manuscript">
          <div className="max-w-2xl">
            <p className="font-mono text-sm text-[var(--color-accent)]">
              contact@beanlog.site:~$
            </p>

            <SectionTitle
              eyebrow="contact"
              title={
                <>
                  필요한 내용만 간단히 주셔도
                  <br />
                  방향을 함께 정리할 수 있습니다
                </>
              }
              description={
                <>
                  문의는 길지 않아도 괜찮습니다.
                  <br />
                  아래 내용 중 아는 것만 적어주셔도 충분합니다.
                </>
              }
              className="mt-6"
              titleClassName="max-w-[720px] md:text-[3rem]"
              descriptionClassName="max-w-[560px]"
            />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {contactItems.map((item) => (
              <div key={item.title} className="paper-surface rounded-2xl p-6">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  inquiry note
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

          <div className="mt-10 rounded-2xl border border-[rgba(34,197,94,0.18)] bg-[rgba(34,197,94,0.06)] px-5 py-5">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">
              preferred contact
            </p>

            <p className="mt-3 text-sm leading-7 text-[var(--color-sub)]">
              현재는 이메일 또는 DM 형태의 문의를 기준으로 작업을 정리하는 것이 가장 자연스럽습니다.
              실제 연결할 연락 수단은 추후 원하는 방식에 맞게 넣으면 됩니다.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/studio" variant="secondary">
              스튜디오 메인으로
            </Button>

            <Button href="/portfolio" variant="terminal">
              포트폴리오 먼저 보기
            </Button>
          </div>
        </ConceptPanel>
      </Container>
    </section>
  );
}