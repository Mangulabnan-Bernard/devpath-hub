import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/ComingSoon";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <ComingSoon
      emoji="✍️"
      title="The DevPath Blog"
      description="Deep dives, learning tips, and behind-the-scenes on how we build guides. Posts are on the way."
    />
  );
}
