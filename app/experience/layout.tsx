import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience | Gopal Dose Portfolio - Full Stack Developer",
  description: "Explore Gopal Dose's professional experience as a Full Stack Developer. Work history at Barclays, Astraeus Next Gen, and freelance projects. React, Next.js, Node.js expertise.",
  keywords: [
    "Gopal Dose experience",
    "Gopal Dose work history",
    "Full Stack Developer experience",
    "React Developer portfolio",
    "Next.js Developer",
    "Gopal Dose career",
    "Portfolio experience"
  ],
  openGraph: {
    title: "Experience | Gopal Dose Portfolio",
    description: "Explore Gopal Dose's professional experience as a Full Stack Developer.",
    url: "https://gopaldose.vercel.app/experience",
  },
  alternates: {
    canonical: "/experience",
  },
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

