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
          background: "#111111",
          color: "#ffffff",
          padding: "64px 72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: 280,
            height: 8,
            background: "#FF383C",
            borderRadius: 999,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.06,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Реклама в подкастах</span>
            <span>Либо/Либо и продакшен</span>
          </div>

          <div
            style={{
              marginTop: 10,
              fontSize: 44,
              lineHeight: 1.2,
              color: "#D6D6D6",
              display: "flex",
            }}
          >
            Подкасты, которые работают на ваш бренд
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "flex-end",
            gap: 12,
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: "0.02em",
          }}
        >
          <span
            style={{
              width: 10,
              height: 32,
              background: "#FF383C",
              borderRadius: 4,
              display: "flex",
            }}
          />
          <span>ЛИБО/ЛИБО</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
