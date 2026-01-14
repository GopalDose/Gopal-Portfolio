"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);

    const experiences = [
        {
            role: "Full-Stack Developer Intern",
            company: "Barclays",
            period: "Jun 2025 - Aug 2025",
            description: "Developed a generic dashboard framework using Next.js and microservices, improving data rendering efficiency by 30%. Implemented secure role-based access controls and optimized service communication.",
            tech: ["Next.js", "React", "Microservices", "Security"]
        },
        {
            role: "Web Developer Intern",
            company: "Catalyst Education Consultancy",
            period: "Sep 2023 - Apr 2024",
            description: "Engineered a responsive website that increased contact submissions by 40% and improved load speed by 60%. Deployed a backend system to process 200+ monthly inquiries.",
            tech: ["MERN Stack", "React", "Tailwind CSS", "Node.js"]
        },
        {
            role: "Android Developer Intern",
            company: "iNet Solutions",
            period: "Jan 2023 - Feb 2023",
            description: "Built an attendance tracking app serving 500+ users with 98% adoption. Reduced manual processing time by 75% and integrated a real-time notification system.",
            tech: ["Flutter", "Dart", "Android", "API Integration"]
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered Entrance Animation for items
            const items = document.querySelectorAll(".experience-item");

            gsap.fromTo(items,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
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
    }, []);



    return (
        <section ref={containerRef} className="relative w-full min-h-screen bg-white py-24 px-8 md:px-16 flex flex-col items-center justify-center overflow-hidden z-10 snap-start">


            <div className="w-full max-w-7xl mx-auto z-10">
                <div className="mb-20 text-center">
                    <h2 className="text-5xl md:text-7xl font-family-media font-bold text-black mb-6">
                        Experience
                    </h2>
                    <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-sans">
                        A journey through my professional career and the projects that defined it.
                    </p>
                </div>

                <div className="flex flex-col gap-8">
                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            className="experience-item group relative w-full border-t border-gray-200 py-12 transition-all duration-500 hover:border-black"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                {/* Left: Role & Company */}
                                <div className="md:w-1/3">
                                    <h3 className="text-3xl font-family-media font-bold text-black group-hover:text-orange-500 transition-colors duration-300">
                                        {exp.role}
                                    </h3>
                                    <p className="text-xl text-gray-800 font-medium mt-1">{exp.company}</p>
                                </div>

                                {/* Middle: Description & Tech */}
                                <div className="md:w-1/3">
                                    <p className="text-gray-600 font-sans leading-relaxed mb-4">
                                        {exp.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.tech.map((t, i) => (
                                            <span key={i} className="text-xs font-bold uppercase tracking-wider text-gray-400 border border-gray-200 px-2 py-1 rounded-md group-hover:border-orange-500 group-hover:text-orange-500 transition-colors duration-300">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Right: Period */}
                                <div className="md:w-1/3 flex justify-start md:justify-end">
                                    <span className="text-lg font-bold font-sans text-gray-400 group-hover:text-black transition-colors duration-300">
                                        {exp.period}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>



        </section>
    );
}
