"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollSectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const activeIndexRef = useRef<number>(0);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [showAll, setShowAll] = useState<boolean>(false);

    const experiences = [
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

    // Ensure activeIndex is within bounds when showAll changes
    useEffect(() => {
        const maxIndex = showAll ? experiences.length - 1 : 2;
        if (activeIndex > maxIndex) {
            setActiveIndex(maxIndex);
            activeIndexRef.current = maxIndex;
        }
    }, [showAll]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Wait for triggers to be rendered
            const triggerSections = document.querySelectorAll(".experience-trigger");
            
            if (triggerSections.length === 0) return;

            // Only create triggers for visible experiences
            const visibleTriggers = Array.from(triggerSections).slice(0, showAll ? experiences.length : 3);

            // Create individual triggers with better positioning
            visibleTriggers.forEach((trigger, index) => {
                ScrollTrigger.create({
                    trigger: trigger,
                    start: "top 60%",
                    end: "top 40%",
                    onEnter: () => {
                        // Only update if different from current
                        if (activeIndexRef.current !== index) {
                            activeIndexRef.current = index;
                            setActiveIndex(index);
                            // Animate content change
                            if (contentRef.current) {
                                gsap.fromTo(contentRef.current,
                                    { opacity: 0, y: 20 },
                                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                                );
                            }
                        }
                    },
                    onEnterBack: () => {
                        // Only update if different from current
                        if (activeIndexRef.current !== index) {
                            activeIndexRef.current = index;
                            setActiveIndex(index);
                            if (contentRef.current) {
                                gsap.fromTo(contentRef.current,
                                    { opacity: 0, y: 20 },
                                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                                );
                            }
                        }
                    },
                    // Prevent triggers from interfering with each other
                    invalidateOnRefresh: true
                });
            });

            // Animate company list items
            const companyItems = document.querySelectorAll(".company-item");
            gsap.fromTo(companyItems,
                { 
                    x: -30, 
                    opacity: 0
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

        }, containerRef);

        return () => {
            ctx.revert();
        };
    }, [showAll]);

    const handleCompanyClick = (index: number) => {
        const trigger = document.querySelectorAll(".experience-trigger")[index];
        if (trigger) {
            trigger.scrollIntoView({ behavior: "smooth", block: "center" });
            activeIndexRef.current = index;
            setActiveIndex(index);
        }
    };

    const handleViewMore = () => {
        const newShowAll = !showAll;
        setShowAll(newShowAll);
        // Reset active index if it's out of bounds when collapsing
        if (!newShowAll && activeIndex >= 3) {
            setActiveIndex(0);
            activeIndexRef.current = 0;
        }
        // Ensure activeIndex is within bounds
        const maxIndex = newShowAll ? experiences.length - 1 : 2;
        if (activeIndex > maxIndex) {
            setActiveIndex(maxIndex);
            activeIndexRef.current = maxIndex;
        }
    };

    const visibleExperiences = showAll ? experiences : experiences.slice(0, 3);
    const activeExperience = visibleExperiences[activeIndex] || visibleExperiences[0];

    return (
        <section 
            ref={containerRef} 
            className="relative w-full bg-gray-50 py-24 md:py-32 px-8 md:px-16 z-10 snap-start"
        >
            <div className="w-full max-w-7xl mx-auto">
                {/* Sticky Container */}
                <div className="relative">
                    {/* Sticky Content - Header + Two Column Layout */}
                    <div className="md:sticky md:top-24">
                        {/* Header Section */}
                        <div className="mb-16 md:mb-20 text-center">
                            <h2 className="text-5xl md:text-7xl font-family-media font-bold text-black mb-6">
                                Experience
                            </h2>
                            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-sans leading-relaxed">
                                A journey through my professional career and the projects that defined it.
                            </p>
                        </div>

                        {/* Two Column Layout */}
                        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
                        {/* Left Side: Company List */}
                        <div className="w-full md:w-1/3 h-fit">
                            <h3 className="text-2xl md:text-3xl font-family-media font-bold text-black mb-8 md:mb-12">
                                I've worked for
                            </h3>
                            <div className="space-y-6 md:space-y-8">
                                {visibleExperiences.map((exp, index) => (
                                    <div
                                        key={index}
                                        className={`company-item cursor-pointer transition-all duration-300 ${
                                            activeIndex === index 
                                                ? 'text-black' 
                                                : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                        onClick={() => handleCompanyClick(index)}
                                    >
                                        <div className="flex items-center gap-3 mb-1">
                                            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                activeIndex === index 
                                                    ? 'bg-orange-500 scale-150' 
                                                    : 'bg-gray-300'
                                            }`}></div>
                                            <h4 className={`text-xl md:text-2xl font-family-media font-bold underline transition-all duration-300 ${
                                                activeIndex === index 
                                                    ? 'text-black' 
                                                    : 'text-gray-400'
                                            }`}>
                                                {exp.company}
                                            </h4>
                                        </div>
                                        <p className={`text-sm md:text-base font-sans ml-5 transition-all duration-300 ${
                                            activeIndex === index 
                                                ? 'text-gray-600' 
                                                : 'text-gray-400'
                                        }`}>
                                            {exp.role}
                                        </p>
                                        <p className={`text-xs md:text-sm font-sans ml-5 mt-1 transition-all duration-300 ${
                                            activeIndex === index 
                                                ? 'text-gray-500' 
                                                : 'text-gray-400'
                                        }`}>
                                            {exp.period}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            {experiences.length > 3 && (
                                <button
                                    onClick={handleViewMore}
                                    className="mt-8 text-sm font-sans font-medium text-gray-600 hover:text-black transition-colors duration-300 underline"
                                >
                                    {showAll ? 'View less' : `View more (${experiences.length - 3} more)`}
                                </button>
                            )}
                        </div>

                        {/* Right Side: Experience Details - Single Content Area */}
                        <div className="w-full md:w-2/3">
                            <div 
                                ref={contentRef}
                                className="experience-content"
                            >
                                {/* Period */}
                                <div className="mb-6">
                                    <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full border border-gray-200 bg-gray-50 text-black">
                                        {activeExperience.period}
                                    </span>
                                </div>

                                {/* Role & Company */}
                                <div className="mb-6">
                                    <h3 className="text-2xl md:text-3xl font-family-media font-bold mb-2 text-black">
                                        {activeExperience.role}
                                    </h3>
                                    <p className="text-xl md:text-2xl text-gray-700 font-medium font-family-media mb-2">
                                        {activeExperience.company}
                                    </p>
                                    {activeExperience.location && (
                                        <p className="text-sm text-gray-500 font-sans">
                                            {activeExperience.location}
                                            {activeExperience.workType && ` • ${activeExperience.workType}`}
                                        </p>
                                    )}
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 font-sans leading-relaxed mb-6 text-base md:text-lg">
                                    {activeExperience.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                                    {activeExperience.tech.map((tech, tIndex) => (
                                        <span 
                                            key={tIndex} 
                                            className="text-xs font-bold uppercase tracking-wider border border-gray-200 text-gray-500 px-3 py-1.5 rounded-md"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Invisible Trigger Sections for Scroll Detection */}
                    <div ref={scrollSectionRef} className="relative">
                        {visibleExperiences.map((_, index) => (
                            <div
                                key={index}
                                className="experience-trigger"
                                style={{ 
                                    height: '100vh',
                                    position: 'relative'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
