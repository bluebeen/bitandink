import Container from "@/components/common/Container";
import type { ContentDetailMeta } from "@/lib/content-ts/types";

type Props = {
  meta: ContentDetailMeta;
};

export default function ContentHeader({ meta }: Props) {
  return (
    <Container>
      <header className="space-y-4 py-16">
        {meta.eyebrow ? (
          <p className="text-sm tracking-[0.2em] text-neutral-500">
            {meta.eyebrow}
          </p>
        ) : null}

        <div className="space-y-3">
          <h1 className="text-4xl font-semibold">{meta.title}</h1>
          <p className="text-lg text-neutral-600">{meta.summary}</p>
        </div>

        {meta.metaLine ? (
          <p className="text-sm text-neutral-500">{meta.metaLine}</p>
        ) : null}
      </header>
    </Container>
  );
}