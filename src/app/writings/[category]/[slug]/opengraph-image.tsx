import { ImageResponse } from "next/og";
import { getWritingPost } from "@/lib/writings";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: {
    category: string;
    slug: string;
  };
};

export default async function Image({ params }: Props) {
  const post = getWritingPost(params.category, params.slug);

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
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.2em",
            color: "#22C55E",
          }}
        >
          bitandink · writings
        </div>

        <div
          style={{
            fontSize: 64,
            marginTop: 30,
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          {post?.title ?? "Untitled"}
        </div>

        <div
          style={{
            fontSize: 28,
            marginTop: 20,
            color: "#64748B",
          }}
        >
          {post?.category ?? "writing"}
        </div>
      </div>
    ),
    size
  );
}