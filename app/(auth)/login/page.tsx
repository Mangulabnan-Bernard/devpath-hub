import type { Metadata } from "next";
import { AuthShell } from "../AuthShell";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return <AuthShell mode="login" />;
}
