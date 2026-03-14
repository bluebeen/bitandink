import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import ContentDetailPage from "@/components/content-ui/ContentDetailPage";
import { getContentNavigation } from "@/lib/content-ts/navigation";
import { getAllStudios, getStudioBySlug } from "@/lib/studio";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllStudios().map((studio) => ({
    slug: studio.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const studio = getStudioBySlug(slug);

  if (!studio) {
    return { title: "Not Found" };
  }

  return {
    title: `${studio.title} | Studio | bitandink`,
    description: studio.summary,
  };
}

export default async function StudioDetailPage({ params }: Props) {
  const { slug } = await params;
  const studio = getStudioBySlug(slug);

  if (!studio) {
    notFound();
  }

  const navigation = getContentNavigation(
    getAllStudios().map((item) => ({
      slug: item.slug,
      title: item.title,
      href: `/studio/${item.slug}`,
    })),
    slug
  );

  return (
    <ContentDetailPage
      eyebrow="STUDIO"
      title={studio.title}
      description={studio.summary}
      navigation={navigation}
      bodyClassName="writing-body"
    >
      <MDXRemote source={studio.content} />
    </ContentDetailPage>
  );
}