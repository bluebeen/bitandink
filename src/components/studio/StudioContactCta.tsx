import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

export default function StudioContactCta() {
  return (
    <section className="pb-24">
      <Container>
        <div className="paper-surface rounded-[28px] px-8 py-10 md:px-12 md:py-14">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-accent)]">
            contact
          </p>

          <h2 className="mt-4 max-w-[700px] text-3xl font-semibold leading-[1.35] tracking-tight text-[var(--color-text)] md:text-[2.8rem]">
            브랜드와 작업이 잘 보이는
            <br />
            홈페이지가 필요하다면
          </h2>

          <p className="mt-6 max-w-[560px] text-sm leading-7 text-[var(--color-sub)] md:text-base">
            필요한 페이지 수와 목적, 참고하고 싶은 분위기만 알려주셔도
            방향을 함께 정리할 수 있습니다.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/studio/contact" variant="primary">
              문의하기
            </Button>

            <Button href="/portfolio" variant="secondary">
              포트폴리오 먼저 보기
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}