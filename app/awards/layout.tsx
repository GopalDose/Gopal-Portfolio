import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Awards | Gopal Dose Portfolio - Achievements & Recognition",
  description: "Awards and recognition received by Gopal Dose. Hackathons, competitions, and technical achievements showcasing excellence in software development.",
  keywords: [
    "Gopal Dose awards",
    "Gopal Dose achievements",
    "Developer awards",
    "Hackathon winner",
    "Gopal Dose recognition",
    "Portfolio awards"
  ],
  openGraph: {
    title: "Awards | Gopal Dose Portfolio",
    description: "Awards and recognition received by Gopal Dose in software development.",
    url: "https://gopaldose.vercel.app/awards",
  },
  alternates: {
    canonical: "/awards",
  },
};

export default function AwardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

