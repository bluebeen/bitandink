import ContentIndexPage from "@/components/content-ui/ContentIndexPage";
import { mapStudiosToCardItems } from "@/lib/content-ts/mappers";
import { getAllStudios } from "@/lib/studio";

export default function StudioPage() {
  const studios = getAllStudios();
  const items = mapStudiosToCardItems(studios);

  return (
    <ContentIndexPage
      panelVariant="studio"
      eyebrow="STUDIO"
      title="Visual Notes and Experiments"
      description="작업, 시도, 시각적 실험과 기록을 모아둔 공간입니다."
      items={items}
    />
  );
}