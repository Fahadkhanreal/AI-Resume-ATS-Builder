import type { Metadata } from "next";
import { HomePageClient } from "./page-client";

export const metadata: Metadata = {
  title: "AI Resume Builder | ATS-Friendly Resume Maker with AI",
  description:
    "Create professional ATS-friendly resumes with AI suggestions, real-time ATS scoring, modern templates, and PDF export.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI Resume Builder | ATS-Friendly Resume Maker with AI",
    description:
      "Build professional resumes faster with AI assistance, ATS scoring, modern resume templates, and PDF export.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Resume Builder | ATS-Friendly Resume Maker with AI",
    description:
      "Build professional resumes faster with AI assistance, ATS scoring, modern resume templates, and PDF export.",
  },
};

export default function Home() {
  return <HomePageClient />;
}
