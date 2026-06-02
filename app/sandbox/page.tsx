import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/ComingSoon";

export const metadata: Metadata = { title: "Sandbox" };

export default function SandboxPage() {
  return (
    <ComingSoon
      emoji="🧪"
      title="Interactive Sandbox"
      description="Try tools without any local setup — an embedded terminal and code playground right in the browser."
      bullets={[
        "Run commands in a browser terminal (xterm.js)",
        "Edit and run code in an embedded editor (Monaco)",
        "Pre-configured environments per technology",
      ]}
    />
  );
}
