import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavBar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Sanam's Kitchen | Home Cooking, Recipes & Videos",
  description:
    "Discover Sanam's Kitchen: modern home cooking recipes, videos, and collections inspired by vibrant flavors and everyday cooking joy.",
  openGraph: {
    title: "Sanam's Kitchen",
    description:
      "Premium recipe and video hub for Sanam's Kitchen with curated collections, tips, and step-by-step guides.",
    url: "https://sanamskitchen.example.com",
    siteName: "Sanam's Kitchen",
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("https://sanamskitchen.example.com"),
};

export const viewport: Viewport = {
  themeColor: "#8b5dc4",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(display.variable, body.variable)}>
      <body className="min-h-screen bg-white text-slate-900">
        <NavBar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
