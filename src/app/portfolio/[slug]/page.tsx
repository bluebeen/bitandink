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

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const navigation = getContentNavigation(
    getAllProjects().map((item) => ({
      slug: item.slug,
      title: item.title,
      href: `/portfolio/${item.slug}`,
    })),
    slug
  );

  return (
    <ContentDetailPage
      eyebrow="PORTFOLIO"
      title={project.title}
      description={project.summary}
      navigation={navigation}
      bodyClassName="writing-body"
    >
      <MDXRemote source={project.content} />
    </ContentDetailPage>
  );
}