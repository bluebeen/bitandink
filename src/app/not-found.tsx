import Link from "next/link";
import Container from "@/components/common/Container";
import ConceptPanel from "@/components/common/ConceptPanel";
import Button from "@/components/common/Button";

const quickLinks = [
  { href: "/writings", label: "open --writings" },
  { href: "/portfolio", label: "open --portfolio" },
  { href: "/studio", label: "open --studio" },
];

export default function NotFound() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <ConceptPanel variant="writing">
          <div className="max-w-3xl">
            <p className="font-mono text-sm text-[var(--color-accent)]">
              archive@beanlog.site:~$
            </p>

            <p className="mt-6 font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-accent)]">
              404 / lost in the archive
            </p>

            <h1 className="mt-4 max-w-[720px] break-keep text-4xl font-semibold leading-[1.18] tracking-tight text-[var(--color-text)] md:text-6xl">
              찾으시는 페이지는
              <br />
              아직 준비 중입니다.
            </h1>

            <p className="mt-6 max-w-[620px] break-keep text-sm leading-7 text-[var(--color-sub)] md:text-base">
              요청하신 페이지는 아직 작성 중이거나,
              현재 공개되지 않은 경로일 수 있습니다.
              <br />
              이 사이트의 일부 섹션은 구조를 먼저 만들고 내용을 채워가는 방식으로 작업하고 있습니다.
            </p>

            <div className="mt-8 max-w-[640px] rounded-2xl border border-white/10 bg-black/20 p-5 font-mono text-sm text-[var(--color-sub)]">
              <p>
                <span className="text-[var(--color-accent)]">$</span> open --page
              </p>
              <p className="mt-2 text-red-400">error: page not found</p>
              <p className="mt-4">
                <span className="text-[var(--color-accent)]">$</span> hint
              </p>
              <p className="mt-2">일부 콘텐츠는 현재 정리 및 작성 중입니다.</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/" variant="terminal">
                홈으로 돌아가기
              </Button>

              <Button href="/about" variant="secondary">
                about 보기
              </Button>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="paper-surface group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(34,197,94,0.28)]"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">
                    quick path
                  </p>

                  <div className="mt-4 h-px w-[76%] bg-[linear-gradient(to_right,rgba(34,197,94,0.42),rgba(100,116,139,0.10))]" />

                  <span className="mt-5 inline-flex items-center gap-2 font-mono text-sm text-[var(--color-text)]">
                    <span className="text-[var(--color-accent)]">$</span>
                    {item.label}
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </ConceptPanel>
      </Container>
    </section>
  );
}