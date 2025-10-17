import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NotebookLM Clone",
  description:
    "Open-source NotebookLM clone with multimodal ingest, memory, and podcast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="liquid-bg min-h-screen">
          <header className="sticky top-0 z-50">
            <nav className="mx-auto max-w-6xl p-4 glass">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-lg font-semibold">
                  NotebookLM
                </Link>
                <div className="flex items-center gap-4 text-sm">
                  <Link className="hover:opacity-80" href="/sources">
                    Sources
                  </Link>
                  <Link className="hover:opacity-80" href="/chat">
                    Chat
                  </Link>
                  <Link className="hover:opacity-80" href="/memory">
                    Memory
                  </Link>
                  <Link className="hover:opacity-80" href="/podcast">
                    Podcast
                  </Link>
                </div>
              </div>
            </nav>
          </header>
          <main className="mx-auto max-w-6xl p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
