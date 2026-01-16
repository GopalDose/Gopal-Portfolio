export interface Project {
    title: string;
    description: string;
    image: string;
    link: string;
}

export const PROJECTS: Project[] = [
    {
        title: "ShetNiyojan",
        description: "Smart farming end to end solution. ShetNiyojan is a comprehensive agricultural management system designed to empower farmers with data-driven insights for optimizing crop cultivation, health monitoring, and supply chain management.",
        image: "/assets/projects/shetniyojan.png",
        link: "https://github.com/GopalDose/ShetNiyojan",
    },
    {
        title: "LegiFy",
        description: "AI-driven tool that simplifies legal documents with automated summaries, key clause extraction using NER, and real-time Q&A with RAG. Supports 10+ regional languages.",
        image: "/assets/projects/legify.jpg",
        link: "https://github.com/GopalDose/LegiFy",
    },
    {
        title: "WarCast",
        description: "AI-powered news aggregator delivering real-time defense and geopolitical insights. Features custom web scraping, MongoDB integration, and sentiment analysis for trend monitoring.",
        image: "/assets/projects/warcast.jpg",
        link: "https://github.com/GopalDose/WarCast",
    },
    {
        title: "Canto",
        description: "Comprehensive canteen management platform with admin controls for product management and real-time order tracking. Features seamless customer experience with menu browsing and order management.",
        image: "/assets/projects/canto.jpg",
        link: "https://github.com/GopalDose/Canto",
    },
    {
        title: "FLOW",
        description: "Dynamic task tracking application built with MERN stack. Features intuitive UI, real-time updates, and efficient task management for both teams and individuals.",
        image: "",
        link: "https://github.com/GopalDose/flow",
    },
    {
        title: "Feedback Management System",
        description: "Web-based system that modernizes feedback collection with an interactive platform. Replaces paper forms with real-time reporting and enhanced data analysis.",
        image: "",
        link: "#",
    },
    {
        title: "College Website",
        description: "Fully dynamic college website with integrated admin panel, enabling independent content management. Replaced developer-dependent system with self-service capabilities.",
        image: "",
        link: "#",
    }
];

