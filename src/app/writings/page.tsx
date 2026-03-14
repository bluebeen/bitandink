import ContentIndexPage from "@/components/content-ui/ContentIndexPage";
import { getAllWritings } from "@/lib/writings";

export default function WritingsPage() {
  const writings = getAllWritings();

  const items = writings.map((post) => ({
    href: `/writings/${post.category}/${post.slug}`,
    title: post.title,
    summary: post.summary,
    eyebrow: post.category,
    tags: post.tags ?? [],
    slug: post.slug,
    date: post.date,
  }));

  return (
    <ContentIndexPage
      eyebrow="WRITING"
      title="Thinking in Public"
      description="생각, 설계, 구현, 실험을 기록하는 글 아카이브입니다."
      items={items}
    />
  );
}