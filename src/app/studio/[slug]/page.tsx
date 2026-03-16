import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import Container from "@/components/common/Container";
import DetailCommandHero from "@/components/common/DetailCommandHero";
import DetailPager from "@/components/common/DetailPager";
import BeanPeek from "@/components/common/BeanPeek";

import {
  getAllStudios,
  getStudioBySlug,
  getAdjacentStudios,
} from "@/lib/studio";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllStudios().map((item) => ({
    slug: item.slug,
  }));
}

export default async function StudioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getStudioBySlug(slug);

  if (!item) {
    notFound();
  }

  const { prev, next } = getAdjacentStudios(item.slug);

  const meta = [item.year, ...(item.tags ?? []).slice(0, 4)].filter(
    Boolean
  ) as string[];

  return (
    <section className="py-14 md:py-20">
      <Container>
        <div className="space-y-8 md:space-y-10">
          <DetailCommandHero
            command={`open --note ${item.slug}`}
            status="studio note ready"
            title={item.title}
            description={item.summary}
            meta={meta}
            thumbnail={item.thumbnail}
            thumbnailAlt={item.title}
            variant="studio"
          />

          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] px-5 py-6 md:px-8 md:py-8">
            <BeanPeek storageKey={`studio:${item.slug}`} />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,rgba(34,197,94,0.35),transparent)]" />

            <article className="writing-body prose prose-invert mx-auto max-w-3xl prose-headings:text-[var(--color-text)] prose-p:text-[var(--color-sub)] prose-strong:text-[var(--color-text)] prose-li:text-[var(--color-sub)]">
              <MDXRemote source={item.content} />
            </article>

            <DetailPager
              prev={
                prev
                  ? {
                      href: `/studio/${prev.slug}`,
                      label: prev.title,
                    }
                  : null
              }
              next={
                next
                  ? {
                      href: `/studio/${next.slug}`,
                      label: next.title,
                    }
                  : null
              }
              indexHref="/studio"
              indexLabel="return to studio"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}