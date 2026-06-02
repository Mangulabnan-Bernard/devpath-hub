import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/ComingSoon";

export const metadata: Metadata = { title: "AI Assistant" };

export default function AiHelpPage() {
  return (
    <ComingSoon
      emoji="🤖"
      title="DevPath AI Assistant"
      description="A context-aware helper that knows the tech and step you're on — ask questions, debug errors, and get project ideas."
      bullets={[
        "Answers questions about your current guide or step",
        "Paste an error and get an explained fix",
        "Suggests the next project based on your progress",
      ]}
    />
  );
}
