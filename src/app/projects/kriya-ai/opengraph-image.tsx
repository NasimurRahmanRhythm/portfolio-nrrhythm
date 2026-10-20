import { ogCard, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Kriya AI: AI Marketing Co-pilot, a case study";

export default function Image() {
  return ogCard({ label: "Case study · ShellBeeHaken", title: "Kriya AI", accent: "AI Marketing Co-pilot" });
}
