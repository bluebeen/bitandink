import ContentIndexPage from "@/components/content-ui/ContentIndexPage";
import { getAllProjects } from "@/lib/portfolio";

export default function PortfolioPage() {
  const projects = getAllProjects();

  const items = projects.map((project) => ({
    href: `/portfolio/${project.slug}`,
    title: project.title,
    summary: project.summary,
    eyebrow: project.year || "PROJECT",
    tags: project.stack ?? [],
    slug: project.slug,
    date: project.date,
  }));

  return (
    <ContentIndexPage
      eyebrow="PORTFOLIO"
      title="Selected Work"
      description="문제를 정의하고 구조로 해결한 프로젝트 기록입니다."
      items={items}
    />
  );
}