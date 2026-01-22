import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Gopal Dose Portfolio - Full Stack Developer",
  description: "View Gopal Dose's portfolio projects. Web applications built with React, Next.js, Node.js. Full stack development projects showcasing technical skills and problem-solving abilities.",
  keywords: [
    "Gopal Dose projects",
    "Gopal Dose portfolio projects",
    "React projects",
    "Next.js projects",
    "Full Stack Developer projects",
    "Web development projects",
    "Gopal Dose work"
  ],
  openGraph: {
    title: "Projects | Gopal Dose Portfolio",
    description: "View Gopal Dose's portfolio projects built with modern web technologies.",
    url: "https://gopaldose.vercel.app/projects",
  },
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

