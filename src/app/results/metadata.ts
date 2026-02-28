import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generated Interview Prep (Mock)",
  description:
    "Your stage-specific interview questions, STAR answer framework, and key tips based on your pasted inputs (mock).",
  // Results depend on sessionStorage; prevent indexing empty/duplicated pages.
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/results",
  },
};
