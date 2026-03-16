import { ImageResponse } from "next/og";
import {
  getWritingPost,
  isWritingCategory,
  getCategoryLabel,
} from "@/lib/writings";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export default async function Image({ params }: Props) {
  const { category, slug } = await params;

  const validCategory = isWritingCategory(category);
  const post = validCategory ? getWritingPost(category, slug) : null;

  const title = post?.title ?? "Beanlog";
  const summary =
    post?.summary ?? "Code, stories, and records from beanlog.site";
  const categoryLabel = validCategory
    ? getCategoryLabel(category)
    : "WRITINGS";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0F172A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          color: "#E5E7EB",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 20%, rgba(34,197,94,0.14), transparent 32%)",
          }}
        />

        <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.22em",
              color: "#22C55E",
              textTransform: "uppercase",
            }}
          >
            beanlog.site / {categoryLabel}
          </div>

          <div
            style={{
              fontSize: 64,
              marginTop: 28,
              fontWeight: 700,
              lineHeight: 1.2,
              maxWidth: "900px",
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: 28,
              marginTop: 22,
              color: "#94A3B8",
              maxWidth: "900px",
              lineHeight: 1.45,
            }}
          >
            {summary}
          </div>
        </div>
      </div>
    ),
    size
  );
}