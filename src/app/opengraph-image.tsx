import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
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
          bitandink
        </div>

        <div
          style={{
            fontSize: 72,
            marginTop: 20,
            fontWeight: 700,
          }}
        >
          Code & Stories
        </div>

        <div
          style={{
            fontSize: 28,
            marginTop: 20,
            color: "#64748B",
          }}
        >
          writings · portfolio · bean web studio
        </div>
      </div>
    ),
    size
  );
}