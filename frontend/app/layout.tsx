import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "AI Resume Builder",
  title: {
    default: "AI Resume Builder | Professional ATS Resume Maker",
    template: "%s | AI Resume Builder",
  },
  description:
    "Build professional, ATS-friendly resumes with AI assistance, real-time resume scoring, modern templates, and PDF export.",
  keywords: [
    "AI resume builder",
    "ATS resume builder",
    "resume maker",
    "professional resume template",
    "resume PDF export",
    "AI CV builder",
    "job resume builder",
    "ATS score checker",
    "resume optimizer",
  ],
  authors: [{ name: "AI Resume Builder" }],
  creator: "AI Resume Builder",
  publisher: "AI Resume Builder",
  category: "Productivity",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "AI Resume Builder",
    title: "AI Resume Builder | Professional ATS Resume Maker",
    description:
      "Create ATS-friendly resumes with AI suggestions, professional templates, resume scoring, and PDF export.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Resume Builder | Professional ATS Resume Maker",
    description:
      "Create ATS-friendly resumes with AI suggestions, professional templates, resume scoring, and PDF export.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
