import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google"; // Using Google Fonts for better performance and style
import "./globals.css";
import Preloader from "./components/Preloader"; // Import Preloader

import Footer from "./components/Footer";

const sfpro = Inter({
  subsets: ["latin"],
  variable: "--font-sfpro", // Mapping Inter to the existing variable key
  display: "swap",
});

const media = Oswald({ // Oswald is a strong, condensed sans-serif - great for impact
  subsets: ["latin"],
  variable: "--font-media", // Mapping to existing variable key
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gopal | Webdesigner & Photographer",
  description: "Portfolio of Gopal - Webdesigner & Photographer based in India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sfpro.variable} ${media.variable} antialiased bg-white text-black`}
      >
        <Preloader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
