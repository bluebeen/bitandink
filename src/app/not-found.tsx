import Link from "next/link";
import Container from "@/components/common/Container";
import ConceptPanel from "@/components/common/ConceptPanel";
import BeanAvatar from "@/components/common/BeanAvatar";

const quickLinks = [
  { href: "/writings", label: "open --writings" },
  { href: "/portfolio", label: "open --portfolio" },
  { href: "/studio", label: "open --studio" },
];

export default function NotFound() {
  return (
    <Container className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative h-28 w-28 md:h-32 md:w-32">
              <BeanAvatar variant="confused" className="h-full w-full" />
            </div>
          </div>

          <p className="mb-3 text-[11px] uppercase tracking-[0.26em] text-[var(--color-sub)]">
            archive@beanlog.site:~$
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-text)] md:text-4xl">
            404 / lost in the archive
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-sub)] md:text-base">
            요청하신 페이지는 아직 작성 중이거나, 현재 공개되지 않은 경로일 수 있어요.
            구조를 먼저 만들고 내용을 채워가는 섹션도 있어서 잠시 비어 보일 수 있습니다.
          </p>
        </div>

        <ConceptPanel>
          <div className="space-y-5">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-sub)]">
                $ open --page
              </p>
              <p className="text-sm text-[var(--color-text)]">error: page not found</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-sub)]">
                $ hint
              </p>
              <p className="text-sm leading-7 text-[var(--color-sub)]">
                일부 콘텐츠는 현재 정리 및 작성 중입니다.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/"
                className="rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-4 py-2 text-sm text-[var(--color-text)] transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/15"
              >
                홈으로 돌아가기
              </Link>

              <Link
                href="/about"
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-[var(--color-text)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                about 보기
              </Link>
            </div>
          </div>
        </ConceptPanel>

        <div className="grid gap-3 md:grid-cols-3">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-[var(--color-text)] transition hover:border-[var(--color-accent)]/50 hover:bg-white/10"
            >
              <div className="mb-2 text-[10px] uppercase tracking-[0.22em] text-[var(--color-sub)]">
                quick path
              </div>
              <div className="font-medium">$ {item.label}</div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}