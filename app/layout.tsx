import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sfpro = localFont({
  src: "./fonts/SFPro.otf",
  variable: "--font-sfpro",
});

const media = localFont({
  src: "./fonts/Media.otf",
  variable: "--font-media",
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
    <html lang="en">
      <body
        className={`${sfpro.variable} ${media.variable} antialiased bg-white text-black`}
      >
        {children}
      </body>
    </html>
  );
}
