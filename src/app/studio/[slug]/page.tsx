import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import ContentDetailPage from "@/components/content-ui/ContentDetailPage";
import { getContentNavigation } from "@/lib/content-ts/navigation";
import { getAllStudios, getStudioBySlug } from "@/lib/studio";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllStudios().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getStudioBySlug(slug);

  if (!post) {
    return { title: "Not Found" };
  }

  return {
    title: `${post.title} | Studio | bitandink`,
    description: post.summary,
  };
}

export default async function StudioDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getStudioBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  const studios = getAllStudios();

  const navigation = getContentNavigation({
    items: studios,
    currentSlug: post.slug,
    getSlug: (item) => item.slug,
    getTitle: (item) => item.title,
    getHref: (item) => `/studio/${item.slug}`,
  });

  const metaLine = [post.date, post.kind].filter(Boolean).join(" · ");

  return (
    <ContentDetailPage
      header={{
        section: "studio",
        eyebrow: "STUDIO",
        title: post.title,
        summary: post.summary,
        metaLine,
      }}
      body={<MDXRemote source={post.content} />}
      navigation={navigation}
      navigationLabel="Studio"
      listHref="/studio"
    />
  );
}