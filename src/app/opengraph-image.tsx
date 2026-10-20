import { ogCard, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const size = ogSize;
export const contentType = "image/png";
export const alt = site.title;

export default function Image() {
  return ogCard({
    label: `${site.role} · ${site.location}`,
    title: site.name,
    accent: "Full-stack products, GenAI pipelines & 3D web",
  });
}
