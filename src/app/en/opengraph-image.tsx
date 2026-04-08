import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          backgroundColor: "#111111",
          backgroundImage:
            "radial-gradient(circle at 75% 20%, rgba(255,56,60,0.18), rgba(17,17,17,0) 45%)",
          color: "#FFFFFF",
          fontFamily: "Arial, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "320px",
            height: "4px",
            background: "#FF383C",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "940px" }}>
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.78)",
            }}
          >
            Libo/Libo Studio
          </div>
          <div style={{ fontSize: 76, lineHeight: 1.03, fontWeight: 700 }}>
            Podcasts that work for your brand
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          <div style={{ fontSize: 32, lineHeight: 1.25, color: "rgba(255,255,255,0.84)", maxWidth: "790px" }}>
            Advertising and production from concept to launch
          </div>
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.25)",
              padding: "12px 16px",
              fontSize: 18,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.84)",
            }}
          >
            libolibo.me
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
