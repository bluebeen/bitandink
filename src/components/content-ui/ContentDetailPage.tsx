import type { ReactNode } from "react";
import Container from "@/components/common/Container";
import ContentHeader from "@/components/content-ui/ContentHeader";
import ContentActions from "@/components/content-ui/common/ContentActions";
import ContentNavigation from "@/components/content-ui/common/ContentNavigation";
import type {
  ContentAction,
  ContentDetailMeta,
  ContentNavigationResult,
} from "@/lib/content-ts/types";

type Props = {
  header: ContentDetailMeta;
  intro?: ReactNode;
  body: ReactNode;
  actions?: ContentAction[];
  navigation?: ContentNavigationResult | null;
  navigationLabel?: string;
  listHref?: string;
};

export default function ContentDetailPage({
  header,
  intro,
  body,
  actions = [],
  navigation,
  navigationLabel,
  listHref,
}: Props) {
  return (
    <>
      <ContentHeader meta={header} />

      {intro ? (
        <Container>
          <section className="space-y-6 pb-8">{intro}</section>
        </Container>
      ) : null}

      <Container>
        <article className="writing-body pt-8 pb-16">{body}</article>
      </Container>

      <Container>
        <ContentActions actions={actions} />
        {navigation ? (
          <ContentNavigation
            navigation={navigation}
            sectionLabel={navigationLabel}
            listHref={listHref}
          />
        ) : null}
      </Container>
    </>
  );
}