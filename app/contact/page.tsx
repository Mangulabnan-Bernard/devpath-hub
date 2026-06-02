import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/ComingSoon";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <ComingSoon
      emoji="📬"
      title="Get in touch"
      description="A contact form is on the way. In the meantime, feedback and ideas are always welcome."
    />
  );
}
