import { ImageResponse } from "next/og";
import { googleFont } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const display = await googleFont("Bodoni+Moda");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f0e0d",
          color: "#efe9df",
          fontSize: 120,
          fontFamily: display ? "Display" : "serif",
        }}
      >
        N<span style={{ color: "#ff5a1f" }}>.</span>
      </div>
    ),
    { ...size, fonts: display ? [{ name: "Display", data: display, style: "normal" }] : [] },
  );
}
