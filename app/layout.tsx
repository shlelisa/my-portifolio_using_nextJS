import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lelisa Portfolio | Full Stack Developer",
  description:
    "Explore Lelisa's portfolio showcasing projects, blogs, and skills in React, Next.js, and Supabase.",
  keywords:
    "Lelisa, portfolio, React developer, Next.js projects, Supabase, web development",
  openGraph: {
    title: "Lelisa Portfolio",
    description:
      "Showcasing my work as a React & Next.js developer with blogs, projects, and skills.",
    url: "https://lelisa.netlify.app/",
    siteName: "Lelisa Portfolio",
    images: [
      {
        url: "https://geszspddfczwhyrnwdbe.supabase.co/storage/v1/object/public/photo/profile-photos/1-1755332356697.jpg", // replace with your OG image
        width: 1200,
        height: 630,
        alt: "Lelisa Portfolio Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lelisa Portfolio",
    description:
      "Discover my portfolio with Next.js, React, and Supabase projects.",
    images: ["https://geszspddfczwhyrnwdbe.supabase.co/storage/v1/object/public/photo/profile-photos/1-1755332356697.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Add structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Lelisa",
              url: "https://lelisa.netlify.app/",
              image: "https://geszspddfczwhyrnwdbe.supabase.co/storage/v1/object/public/photo/profile-photos/1-1755332356697.jpg", // replace with your real profile image
              jobTitle: "Full Stack Developer",
              sameAs: [
                "https://github.com/shlelisa", // replace with your real links
                "https://linkedin.com/in/lelisa",
              ],
            }),
          }}
        />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
