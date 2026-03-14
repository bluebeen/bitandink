import ContentIndexPage from "@/components/content-ui/ContentIndexPage";
import { getAllStudios } from "@/lib/studio";

export default function StudioPage() {
  const studios = getAllStudios();

  const items = studios.map((studio) => ({
    href: `/studio/${studio.slug}`,
    title: studio.title,
    summary: studio.summary,
    eyebrow: studio.year || "STUDIO",
    tags: studio.tags ?? [],
    slug: studio.slug,
    date: studio.date,
  }));

  return (
    <ContentIndexPage
      eyebrow="STUDIO"
      title="Visual Notes and Experiments"
      description="작업, 시도, 시각적 실험과 기록을 모아둔 공간입니다."
      items={items}
    />
  );
}