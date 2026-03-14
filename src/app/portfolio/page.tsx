import ContentIndexPage from "@/components/content-ui/ContentIndexPage";
import { mapProjectsToCardItems } from "@/lib/content-ts/mappers";
import { getAllProjects } from "@/lib/portfolio";

export default function PortfolioPage() {
  const projects = getAllProjects();
  const items = mapProjectsToCardItems(projects);

  return (
    <ContentIndexPage
      eyebrow="PORTFOLIO"
      title="Selected Work"
      description="문제를 정의하고 구조로 해결한 프로젝트 기록입니다."
      items={items}
    />
  );
}