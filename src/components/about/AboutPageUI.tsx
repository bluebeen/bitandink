import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import GhostIllustration from "@/components/common/GhostIllustration";
import BeanTapTarget from "@/components/common/BeanTapTarget";

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

function ContactBox() {
  return (
    <div className="mt-8 paper-surface code-rain-soft scanline rounded-2xl px-6 py-5 font-mono text-xs leading-6 text-[var(--color-sub)] md:px-7 md:py-6">
      <p>
        <span className="text-[var(--color-accent)]">$</span> domain &gt;{" "}
        <span className="text-[var(--color-text)]">beanlog.site</span>
      </p>

      <p className="mt-2">
        <span className="text-[var(--color-accent)]">$</span> contact &gt;{" "}
        <span className="text-[var(--color-text)]">bitandink@naver.com</span>
        {" / "}
        <a
          href="https://open.kakao.com/o/sQs1t5ki"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-text)] underline-offset-4 transition-colors duration-200 hover:text-[var(--color-accent)] hover:underline"
        >
          카카오톡
        </a>
        {" / "}
        <a
          href="https://instagram.com/eunbeenchoei"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-text)] underline-offset-4 transition-colors duration-200 hover:text-[var(--color-accent)] hover:underline"
        >
          인스타(@eunbeenchoei)
        </a>
      </p>

      <p className="mt-2">
        <span className="text-[var(--color-accent)]">$</span> offline &gt;{" "}
        <span className="text-[var(--color-text)]">
          서울 기반 / 오프라인 미팅 가능
        </span>
      </p>
    </div>
  );
}

export default function AboutPageUI() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <section className="relative overflow-hidden rounded-[28px] border border-white/10 paper-surface manuscript-paper">
          <div className="px-8 py-10 md:px-12 md:py-14">
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">
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
                      만들고, 쓰고, 정리하는 과정을 하나의 흐름으로 묶습니다.
                      <br />
                      화면을 설계할 때도, 문장을 다듬을 때도 구조와 흐름을 먼저
                      생각합니다.
                    </>
                  }
                  className="mt-6"
                  titleClassName="max-w-[700px] md:text-[3.1rem]"
                  descriptionClassName="max-w-[620px]"
                />

                <IdentityTags />
                <ContactBox />
              </div>
              <BeanTapTarget>
                <GhostIllustration
                  variant="about"
                  className="hidden lg:block self-end"
                />
              </BeanTapTarget>
            </div>
          </div>
        </section>
      </Container>
    </section>
  );
}
