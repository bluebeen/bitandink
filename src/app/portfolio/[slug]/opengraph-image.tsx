import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/portfolio";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Image({ params }: Props) {
  const project = getProjectBySlug(params.slug);

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
        {/* 브랜드 */}
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.2em",
            color: "#22C55E",
          }}
        >
          bitandink · portfolio
        </div>

        {/* 프로젝트 제목 */}
        <div
          style={{
            fontSize: 64,
            marginTop: 30,
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          {project?.title ?? "Project"}
        </div>

        {/* 요약 */}
        <div
          style={{
            fontSize: 28,
            marginTop: 20,
            color: "#64748B",
            maxWidth: 900,
          }}
        >
          {project?.summary ?? "Selected work"}
        </div>
      </div>
    ),
    size
  );
}