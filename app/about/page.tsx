import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/ComingSoon";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <ComingSoon
      emoji="🧭"
      title="About DevPath.hub"
      description="We're building the hand-holding learning platform we wish we'd had — zero assumptions, every step explained, every error solved."
    />
  );
}
