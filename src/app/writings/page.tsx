import Link from "next/link";
import Container from "@/components/common/Container";
import BaseCard from "@/components/common/BaseCard";
import {
  getWritingCategories,
} from "@/lib/writings";

export default function WritingsPage() {
  const categories = getWritingCategories();

  return (
    <section className="py-16 md:py-20">
      <Container>
        <section className="manuscript-paper overflow-hidden rounded-[28px] px-6 py-8 md:px-8 md:py-10">
          <div className="space-y-3">
            <p className="font-mono text-sm tracking-[0.2em] text-[var(--color-accent)]">
              writings
            </p>

            <h1 className="text-4xl font-semibold leading-tight text-[var(--color-text)] md:text-5xl">
              장르별 글 모음
            </h1>

            <p className="max-w-3xl text-lg leading-8 text-[var(--color-sub)]">
              글을 장르별로 나눠 읽을 수 있도록 정리했습니다.
              원하는 결의 문장으로 들어가 보세요.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/writings/${category.slug}`}
                className="block group"
              >
                <BaseCard className="bg-slate-950/68 backdrop-blur-[1px]">
                  <div className="space-y-4">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
                      {category.slug}
                    </p>

                    <h2 className="text-2xl font-semibold text-[var(--color-text)] transition group-hover:text-[var(--color-accent)]">
                      {category.title}
                    </h2>

                    <p className="text-sm leading-7 text-[var(--color-sub)]">
                      {category.description}
                    </p>
                  </div>
                </BaseCard>
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </section>
  );
}