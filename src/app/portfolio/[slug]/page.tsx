import { notFound } from "next/navigation";
import Container from "@/components/common/Container";
import DetailCommandHero from "@/components/common/DetailCommandHero";
import { getAllProjects, getProjectBySlug } from "@/lib/portfolio";

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

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

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
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,rgba(34,197,94,0.35),transparent)]" />
            <article className="prose prose-invert max-w-none">
              <div>{project.content}</div>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}