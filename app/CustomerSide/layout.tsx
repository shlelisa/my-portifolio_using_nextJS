// app/CustomerSide/layout.tsx or app/CustomerSide/CustomerLayout.tsx

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
