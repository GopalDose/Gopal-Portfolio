import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google"; // Using Google Fonts for better performance and style
import "./globals.css";
import Preloader from "./components/Preloader"; // Import Preloader
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  title: "Gopal Dose | Portfolio - Full Stack Developer & Problem Solver",
  description: "Gopal Dose portfolio - Full Stack Developer based in Pune, India. Explore Gopal's projects, experience, and skills in React, Next.js, Node.js, and modern web development. Contact Gopal Dose for web development opportunities.",
  keywords: [
    "Gopal",
    "Gopal Dose",
    "Gopal Vijay Dose",
    "Portfolio",
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Pune Developer",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Portfolio Website",
    "Developer Portfolio"
  ],
  authors: [{ name: "Gopal Vijay Dose" }],
  creator: "Gopal Vijay Dose",
  publisher: "Gopal Vijay Dose",
  metadataBase: new URL('https://gopaldose.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gopaldose.vercel.app',
    siteName: 'Gopal Dose Portfolio',
    title: 'Gopal Dose | Portfolio - Full Stack Developer & Problem Solver',
    description: 'Portfolio of Gopal Dose - Full Stack Developer based in Pune, India. Explore projects, experience, and skills in modern web development.',
    images: [
      {
        url: '/assets/Gopal.png',
        width: 1200,
        height: 630,
        alt: 'Gopal Dose - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gopal Dose | Portfolio - Full Stack Developer',
    description: 'Portfolio of Gopal Dose - Full Stack Developer based in Pune, India. Explore projects and experience.',
    images: ['/assets/Gopal.png'],
    creator: '@gopaldose',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '72d62fc50894e5f9',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Gopal Vijay Dose",
    "alternateName": "Gopal Dose",
    "jobTitle": "Full Stack Developer",
    "description": "Full Stack Developer and Problem Solver based in Pune, India. Specializing in React, Next.js, Node.js, and modern web development.",
    "url": "https://gopaldose.vercel.app",
    "image": "https://gopaldose.vercel.app/assets/Gopal.png",
    "email": "gopaldose12345@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://gopaldose.vercel.app"
    ],
    "knowsAbout": [
      "Web Development",
      "Full Stack Development",
      "React",
      "Next.js",
      "Node.js",
      "JavaScript",
      "TypeScript",
      "Python",
      "Java"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Pune Institute of Computer Technology"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${sfpro.variable} ${media.variable} antialiased bg-white text-black`}
      >
        <Preloader />
        {children}
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
