import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import ContentDetailPage from "@/components/content-ui/ContentDetailPage";
import { getContentNavigation } from "@/lib/content-ts/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/portfolio";

type Props = {
  params: Promise<{ slug: string }>;
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
    return { title: "Not Found" };
  }

  return {
    title: `${project.title} | Portfolio | bitandink`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || !project.published) {
    notFound();
  }

  const projects = getAllProjects();

  const navigation = getContentNavigation({
    items: projects,
    currentSlug: project.slug,
    getSlug: (item) => item.slug,
    getTitle: (item) => item.title,
    getHref: (item) => `/portfolio/${item.slug}`,
  });

  const metaLine = [project.year, project.date, project.stack?.join(" · ")]
    .filter(Boolean)
    .join(" · ");

  return (
    <ContentDetailPage
      header={{
        section: "portfolio",
        eyebrow: "PROJECT",
        title: project.title,
        summary: project.summary,
        metaLine,
      }}
      intro={
        <>
          {project.problem ? (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold tracking-[0.18em] text-neutral-500">
                PROBLEM
              </h3>
              <p>{project.problem}</p>
            </div>
          ) : null}

          {project.approach ? (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold tracking-[0.18em] text-neutral-500">
                APPROACH
              </h3>
              <p>{project.approach}</p>
            </div>
          ) : null}

          {project.result ? (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold tracking-[0.18em] text-neutral-500">
                RESULT
              </h3>
              <p>{project.result}</p>
            </div>
          ) : null}
        </>
      }
      body={<MDXRemote source={project.content} />}
      actions={[
        ...(project.github
          ? [{ label: "GitHub", href: project.github, external: true as const }]
          : []),
        ...(project.link
          ? [{ label: "Live", href: project.link, external: true as const }]
          : []),
      ]}
      navigation={navigation}
      navigationLabel="Project"
      listHref="/portfolio"
    />
  );
}