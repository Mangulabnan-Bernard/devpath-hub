import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Providers } from "@/components/auth/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DevPath.hub — From Zero to Hero Developer",
    template: "%s · DevPath.hub",
  },
  description:
    "A fully guided, interactive platform to master any tech stack from scratch — step-by-step explanations, built-in error solving, and project-based learning.",
  keywords: ["learn to code", "Next.js", "Flutter", "CI/CD", "developer roadmap", "coding tutorials"],
  openGraph: {
    title: "DevPath.hub — From Zero to Hero Developer",
    description: "Every step explained, every error solved, every project built.",
    type: "website",
  },
};

// Runs before paint to set the theme class, avoiding a flash of the wrong
// theme. Also swaps `no-js` → `js` so scroll-reveal animations are enabled
// only when JavaScript is actually running.
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
  document.documentElement.classList.remove('no-js');
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} no-js h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
