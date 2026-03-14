import { notFound } from "next/navigation";
import ContentIndexPage from "@/components/content-ui/ContentIndexPage";
import { mapWritingsToCardItems } from "@/lib/content-ts/mappers";
import { getAllWritings, getWritingsByCategory } from "@/lib/writings";

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  const writings = getAllWritings();
  const categories = [...new Set(writings.map((post) => post.category))];

  return categories.map((category) => ({ category }));
}

export default async function WritingsCategoryPage({ params }: Props) {
  const { category } = await params;
  const writings = getWritingsByCategory(category);

  if (!writings.length) {
    notFound();
  }

  const items = mapWritingsToCardItems(writings);

  return (
    <ContentIndexPage
      panelVariant="writing"
      eyebrow="WRITING CATEGORY"
      title={category}
      description={`${category} 카테고리의 글을 모아봤습니다.`}
      items={items}
    />
  );
}