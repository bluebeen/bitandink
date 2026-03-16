import Container from "@/components/common/Container";
import SectionCommandHeader from "@/components/common/SectionCommandHeader";
import StudioMasonry from "@/components/studio-ui/StudioMasonry";
import { getAllStudios } from "@/lib/studio";

export default function StudioPage() {
  const items = getAllStudios().map((item) => ({
    href: `/studio/${item.slug}`,
    title: item.title,
    summary: item.summary,
    thumbnail: item.thumbnail,
    tags: item.tags ?? [],
  }));

  return (
    <section className="py-14 md:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(to_bottom,rgba(15,23,42,0.97),rgba(2,6,23,0.94))]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_14%_18%,rgba(34,197,94,0.12),transparent_26%),radial-gradient(circle_at_76%_24%,rgba(255,255,255,0.06),transparent_22%),radial-gradient(circle_at_58%_74%,rgba(34,197,94,0.06),transparent_24%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,rgba(34,197,94,0.72),rgba(100,116,139,0.10),transparent)]"
          />

          <div className="relative space-y-8 px-4 py-4 md:space-y-10 md:px-5 md:py-5">
            <SectionCommandHeader
              command="open --studio"
              status="> visual archive ready"
              title="Studio"
              description="실험, 기록, 시각적 메모를 모아두는 작업실 아카이브."
              variant="studio"
            />

            <StudioMasonry items={items} />
          </div>
        </div>
      </Container>
    </section>
  );
}