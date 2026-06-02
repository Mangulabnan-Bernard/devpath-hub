import type { Metadata } from "next";
import { AuthShell } from "../AuthShell";

export const metadata: Metadata = { title: "Sign up" };

export default function SignupPage() {
  return <AuthShell mode="signup" />;
}
