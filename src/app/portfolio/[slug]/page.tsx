import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import Container from "@/components/common/Container";
import DetailCommandHero from "@/components/common/DetailCommandHero";
import DetailPager from "@/components/common/DetailPager";
import BeanPeek from "@/components/common/BeanPeek";

import {
  getAllProjects,
  getProjectBySlug,
  getAdjacentProjects,
} from "@/lib/portfolio";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllProjects().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.thumbnail ? [project.thumbnail] : [],
    },
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(project.slug);

  const meta = [project.year, ...(project.stack ?? []).slice(0, 4)].filter(
    Boolean
  ) as string[];

  return (
    <section className="py-14 md:py-20">
      <Container>
        <div className="space-y-8 md:space-y-10">
          <DetailCommandHero
            command={`open --project ${project.slug}`}
            status="project record loaded"
            title={project.title}
            description={project.summary}
            meta={meta}
            thumbnail={project.thumbnail}
            thumbnailAlt={project.title}
            variant="portfolio"
          />

          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] px-5 py-6 md:px-8 md:py-8">
            <BeanPeek storageKey={`portfolio:${project.slug}`} />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,rgba(34,197,94,0.35),transparent)]" />

            <article className="writing-body prose prose-invert mx-auto max-w-3xl prose-headings:text-[var(--color-text)] prose-p:text-[var(--color-sub)] prose-strong:text-[var(--color-text)] prose-li:text-[var(--color-sub)]">
              <MDXRemote source={project.content} />
            </article>

            <DetailPager
              prev={
                prev
                  ? {
                      href: `/portfolio/${prev.slug}`,
                      label: prev.title,
                    }
                  : null
              }
              next={
                next
                  ? {
                      href: `/portfolio/${next.slug}`,
                      label: next.title,
                    }
                  : null
              }
              indexHref="/portfolio"
              indexLabel="return to portfolio"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}