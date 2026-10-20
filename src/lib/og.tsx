import { ImageResponse } from "next/og";
import { site } from "./site";

export const ogSize = { width: 1200, height: 630 };

// Google Fonts serves TTF to clients it doesn't recognise, which is what Satori needs.
async function googleFont(query: string) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${query}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

/** The share card used on every page: a label, a big serif title and an italic accent line. */
export async function ogCard({ label, title, accent }: { label: string; title: string; accent: string }) {
  const [display, italic] = await Promise.all([googleFont("Bodoni+Moda"), googleFont("Instrument+Serif:ital@1")]);
  const fonts = [
    display && { name: "Display", data: display, style: "normal" as const },
    italic && { name: "Italic", data: italic, style: "italic" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; style: "normal" | "italic" }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(ellipse at 80% 20%, rgba(255,90,31,0.22), #0f0e0d 60%)",
          backgroundColor: "#0f0e0d",
          color: "#efe9df",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#a39b91" }}>
          {label}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Display", fontSize: title.length > 18 ? 92 : 120, lineHeight: 1, letterSpacing: -3 }}>
            {title}
          </div>
          <div style={{ fontFamily: "Italic", fontStyle: "italic", fontSize: 54, marginTop: 18, color: "#ff5a1f" }}>
            {accent}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#a39b91" }}>
          <span>{site.name}</span>
          <span>{site.url.replace("https://", "")}</span>
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}
