"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export type SignupResult = { ok: true } | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Creates a credentials user. Sign-in itself happens on the client (via
 * next-auth/react `signIn`) so the session updates reactively in the navbar.
 */
export async function signupAction(formData: FormData): Promise<SignupResult> {
  if (!prisma) return { ok: false, error: "Database is not configured." };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (name.length < 2) return { ok: false, error: "Please enter your name." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (password.length < 8) return { ok: false, error: "Password must be at least 8 characters." };

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { ok: false, error: "An account with that email already exists." };

  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { email, name, password: hashed } });
  return { ok: true };
}
