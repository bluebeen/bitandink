import Container from "@/components/common/Container";
import ContentCard from "@/components/content-ui/ContentCard";
import type { ContentCardItem } from "@/lib/content-ts/types";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: ContentCardItem[];
  children?: React.ReactNode;
};

export default function ContentIndexPage({
  eyebrow,
  title,
  description,
  items,
  children,
}: Props) {
  return (
    <Container>
      <section className="space-y-10 py-16">
        <header className="space-y-4">
          {eyebrow ? (
            <p className="text-sm tracking-[0.2em] text-neutral-500">
              {eyebrow}
            </p>
          ) : null}

          <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>

          {description ? (
            <p className="max-w-2xl text-lg leading-8 text-neutral-500">
              {description}
            </p>
          ) : null}
        </header>

        {children ? <div>{children}</div> : null}

        <div className="grid gap-6">
          {items.map((item) => (
            <ContentCard key={item.href} item={item} />
          ))}
        </div>
      </section>
    </Container>
  );
}