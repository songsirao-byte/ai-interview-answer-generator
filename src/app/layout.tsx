import type { Metadata } from "next";
import "./globals.css";

const siteName = "AI Interview Answer Generator";
const siteDescription =
  "Paste a job description and your resume to generate stage-specific interview questions, STAR answer frameworks, and key tips (mock).";
const siteUrl = "https://ai-interview-answer-generator-1.vercel.app"; // TODO: replace with your Vercel domain after deployment
const ogImage = "/opengraph.png"; // optional (we can add later)

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteName,
    description: siteDescription,
    siteName,
    images: [{ url: ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: siteName,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: siteDescription,
        url: siteUrl,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How does the generator personalize answers?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "This mock version uses templates and stage-specific rules to structure your interview prep. It does not call external AI APIs.",
            },
          },
          {
            "@type": "Question",
            name: "Is my resume data secure?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Your content stays in your browser in this mock version and is not sent to external services.",
            },
          },
          {
            "@type": "Question",
            name: "What interview stages are supported?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "HR screening, Hiring Manager, and Leadership stages.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
