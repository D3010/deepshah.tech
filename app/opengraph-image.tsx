import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Deep Shah — AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          background: "#ffffff",
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 30% 35%, rgba(255,61,127,0.18), transparent 65%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(124,92,255,0.16), transparent 70%)",
          color: "#0a0a0a",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            color: "rgba(10,10,10,0.55)",
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          deepsai.tech
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 110,
              fontWeight: 500,
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            <span style={{ display: "flex" }}>I build</span>
            <span
              style={{
                display: "flex",
                backgroundImage:
                  "linear-gradient(135deg, #ff6b4a, #ff3d7f 50%, #7c5cff)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              agentic systems.
            </span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "rgba(10,10,10,0.65)",
              maxWidth: 820,
              lineHeight: 1.4,
            }}
          >
            Deep Shah · AI Engineer · Stevens &apos;26
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
