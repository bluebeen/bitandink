import type { ReactNode } from "react";
import Container from "@/components/common/Container";
import ContentNavigation from "@/components/content-ui/common/ContentNavigation";
import type { ContentNavigationResult } from "@/lib/content-ts/navigation";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  navigation?: ContentNavigationResult | null;
  bodyClassName?: string;
  children?: ReactNode;
};

export default function ContentDetailPage({
  eyebrow,
  title,
  description,
  navigation = null,
  bodyClassName = "",
  children,
}: Props) {
  return (
    <Container>
      <section className="py-16 md:py-20">
        <div className="space-y-3">
          {eyebrow ? (
            <p className="text-sm tracking-[0.2em] text-neutral-500">
              {eyebrow}
            </p>
          ) : null}

          <h1 className="text-4xl font-semibold leading-tight text-[var(--color-text)] md:text-5xl">
            {title}
          </h1>

          {description ? (
            <p className="max-w-3xl text-lg leading-8 text-[var(--color-sub)]">
              {description}
            </p>
          ) : null}
        </div>

        {children ? (
          <article className={`pt-10 ${bodyClassName}`}>{children}</article>
        ) : null}

        {navigation ? <ContentNavigation navigation={navigation} /> : null}
      </section>
    </Container>
  );
}