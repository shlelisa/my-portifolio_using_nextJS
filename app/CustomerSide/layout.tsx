import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/app/CustomerSide/components/Header";
import Footer from "./components/Footer";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Add metadata for SEO
export const metadata = {
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
        url: "https://lelisa.netlify.app/og-image.jpg", // Replace with your OG image
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
    images: ["https://lelisa.netlify.app/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
