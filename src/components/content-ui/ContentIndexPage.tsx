import Container from "@/components/common/Container";
import ConceptPanel, { type ConceptPanelVariant } from "@/components/common/ConceptPanel";
import ContentCard from "@/components/content-ui/ContentCard";
import type { ContentCardItem } from "@/lib/content-ts/types";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: ContentCardItem[];
  panelVariant?: ConceptPanelVariant;
  children?: React.ReactNode;
};

export default function ContentIndexPage({
  eyebrow,
  title,
  description,
  items,
  panelVariant,
  children,
}: Props) {
  return (
    <Container>
      <section className="py-10 md:py-12">
        
        <ConceptPanel variant={panelVariant} className="mb-8">
          <p className="font-mono text-sm text-[var(--color-accent)]/80">
              bitandink@beanlog.site:~$
          </p>
          <header className="space-y-4">
            {eyebrow ? (
              <p className="text-sm tracking-[0.2em] text-neutral-500 terminal-caret">&gt; {eyebrow}</p>
            ) : null}
            <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>

            {description ? (
              <p className="max-w-2xl text-base leading-7 text-neutral-500 md:text-lg">
                {description}
              </p>
            ) : null}
          </header>
        </ConceptPanel>

        {children ? <div className="mb-8">{children}</div> : null}

        <div className="grid gap-6">
          {items.map((item) => (
            <ContentCard key={item.href} item={item} />
          ))}
        </div>
      </section>
    </Container>
  );
}