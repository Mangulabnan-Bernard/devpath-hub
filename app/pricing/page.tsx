import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/ComingSoon";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <ComingSoon
      emoji="💸"
      title="Simple, fair pricing"
      description="The core guides, roadmaps, projects, and error solver are free. Optional extras like certificates and mentorship are coming."
      bullets={[
        "Free forever: guides, roadmaps, projects, error solver",
        "Pro (planned): certificates and progress analytics",
        "Mentorship (planned): 1-on-1 sessions and reviews",
      ]}
    />
  );
}
