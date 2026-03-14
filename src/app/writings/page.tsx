import ContentIndexPage from "@/components/content-ui/ContentIndexPage";
import { mapWritingsToCardItems } from "@/lib/content-ts/mappers";
import { getAllWritings } from "@/lib/writings";

export default function WritingsPage() {
  const writings = getAllWritings();
  const items = mapWritingsToCardItems(writings);

  return (
    <ContentIndexPage
      panelVariant="writing"
      eyebrow="WRITING"
      title="Thinking in Public"
      description="생각, 설계, 구현, 실험을 기록하는 글 아카이브입니다."
      items={items}
    />
  );
}