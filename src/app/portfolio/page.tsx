import Container from "@/components/common/Container";
import SectionCommandHeader from "@/components/common/SectionCommandHeader";
import ContentIndexPage from "@/components/content-ui/ContentIndexPage";
import { getAllProjects } from "@/lib/portfolio";

export default function PortfolioPage() {
  const items = getAllProjects().map((project) => ({
    href: `/portfolio/${project.slug}`,
    title: project.title,
    summary: project.summary,
    eyebrow: project.year || "project",
    tags: project.stack ?? [],
    date: project.date,
    thumbnail: project.thumbnail,
  }));

  return (
    <section className="py-14 md:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(to_bottom,rgba(15,23,42,0.98),rgba(2,6,23,0.95))]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(34,197,94,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.04)_1px,transparent_1px)] bg-[size:24px_24px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,rgba(34,197,94,0.75),rgba(100,116,139,0.10),transparent)]"
          />

          <div className="relative space-y-8 px-4 py-4 md:space-y-10 md:px-5 md:py-5">
            <SectionCommandHeader
              command="open --portfolio"
              status="> selected works loaded"
              title="Portfolio"
              description="문제를 정의하고 구조를 설계한 뒤, 화면과 흐름으로 구현한 작업들."
              variant="portfolio"
            />

            <ContentIndexPage
              items={items}
              variant="portfolio"
              withContainer={false}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}