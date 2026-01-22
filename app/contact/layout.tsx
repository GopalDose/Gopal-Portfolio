import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Gopal Dose Portfolio - Get in Touch",
  description: "Contact Gopal Dose - Full Stack Developer. Get in touch for web development projects, collaborations, or opportunities. Based in Pune, India.",
  keywords: [
    "Contact Gopal Dose",
    "Gopal Dose email",
    "Hire Gopal Dose",
    "Full Stack Developer contact",
    "Web Developer Pune",
    "Gopal Dose portfolio contact"
  ],
  openGraph: {
    title: "Contact | Gopal Dose Portfolio",
    description: "Contact Gopal Dose for web development projects and opportunities.",
    url: "https://gopaldose.vercel.app/contact",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

