export interface Experience {
    role: string;
    company: string;
    period: string;
    location: string;
    workType: string;
    description: string;
    tech: string[];
}

export const experiences: Experience[] = [
    {
        role: "Technology Summer Intern",
        company: "Barclays",
        period: "Jun 2025 - Aug 2025",
        location: "Pune, Maharashtra, India",
        workType: "On-site",
        description: "Built and integrated a scalable, interactive dashboard for data management and anomaly detection. Improved operational workflows by reducing manual intervention through automation and self-service capabilities. Ensured consistent UI/UX across the platform with seamless integration. Worked in an Agile environment, collaborating with engineers, analysts, and SMEs.",
        tech: ["Next.js", "REST APIs", "D3.js", "Data Visualization", "Agile Environment"]
    },
    {
        role: "Full-stack Developer",
        company: "Astraeus Next Gen Pvt. Ltd.",
        period: "Jan 2025 - Apr 2025",
        location: "",
        workType: "",
        description: "As a Full Stack Developer Intern, I worked on two key projects—DeepSea, where I created FastAPI endpoints, conducted backend testing, and deployed the application on Google Cloud; and Vajra, where I implemented both the backend and frontend. Both projects were collaborative efforts that enhanced my skills in full-stack development and teamwork.",
        tech: ["Node.js", "Google Cloud Platform (GCP)", "Postman", "Django REST Framework"]
    },
    {
        role: "Freelance Web Developer",
        company: "Self-employed",
        period: "Jan 2024 - Jan 2025",
        location: "Pune, Maharashtra, India",
        workType: "Remote",
        description: "Worked as a Freelance Web Developer delivering full-stack solutions using React.js, Django REST Framework, and Tailwind CSS. Deployed scalable apps on Amazon EC2 and integrated APIs using AWS API Gateway. Focused on building responsive UIs and efficient backend systems for remote clients.",
        tech: ["React.js", "Django REST Framework", "Tailwind CSS", "Amazon EC2", "AWS API Gateway"]
    },
    {
        role: "Web Developer",
        company: "Catalyst Education Consultancy",
        period: "Sep 2023 - Mar 2024",
        location: "Pune, Maharashtra, India",
        workType: "Hybrid",
        description: "Developed and optimized web applications using MERN, improving performance. Enhanced user experience by implementing responsive design with Tailwind CSS, leading to improved engagement and usability. Collaborated with a cross-functional team to deliver projects on schedule and within scope.",
        tech: ["Search Engine Optimization (SEO)", "Web Content Management", "React.js", "Node.js", "Express.js", "MongoDB", "Web Hosting", "MERN Stack"]
    },
    {
        role: "Android Developer",
        company: "iNet Solutions",
        period: "Jan 2023 - Feb 2023",
        location: "Kolhapur, Maharashtra, India",
        workType: "On-site",
        description: "Built and deployed Android applications using Flutter, improving the client's mobile engagement. Integrated APIs and backend services to enable real-time data syncing, providing users with a seamless experience. Troubleshot and debugged issues within the app, ensuring a smooth and bug-free performance.",
        tech: ["Flutter", "Firebase", "Android Development", "Mobile Application Development", "Android Framework"]
    },
    {
        role: "Full Stack Developer",
        company: "Government Polytechnic, Kolhapur",
        period: "Jan 2022 - Feb 2023",
        location: "",
        workType: "",
        description: "Led a team in deploying full-stack solutions for institutional needs, incorporating user feedback to improve functionality and usability. Provided ongoing support and troubleshooting, ensuring the stability and reliability of applications in a dynamic academic environment. Optimized codebase and implemented testing practices to ensure high performance and maintainability, reducing bugs and improving overall code quality.",
        tech: ["Search Engine Optimization (SEO)", "PHP", "HTML5", "Cascading Style Sheets (CSS)", "JS", "Web Hosting"]
    },
    {
        role: "Web Developer",
        company: "Revolution IT Solutions",
        period: "Jul 2022 - Aug 2022",
        location: "Kolhapur, Maharashtra, India",
        workType: "On-site",
        description: "Designed and developed responsive websites with HTML, CSS, and JavaScript. Worked closely with designers and project managers to ensure accurate implementation of client requirements. Utilized SEO best practices to increase site visibility and attract more organic traffic for clients.",
        tech: ["HTML5", "Cascading Style Sheets (CSS)", "JavaScript", "Bootstrap (Framework)", "Web Hosting"]
    }
];

