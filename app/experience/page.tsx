"use client";

import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import { experiences } from "../data/experience";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ExperiencePage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const watermarkRef = useRef<HTMLHeadingElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const experiencesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero section animations
            if (watermarkRef.current) {
                gsap.fromTo(watermarkRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
                );
            }

            if (headingRef.current) {
                gsap.fromTo(headingRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
                );
            }

            // Experience cards animations
            const experienceCards = document.querySelectorAll(".experience-card");
            experienceCards.forEach((card, index) => {
                gsap.fromTo(card,
                    { opacity: 0, y: 50, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            toggleActions: "play none none none"
                        },
                        delay: index * 0.1
                    }
                );
            });

            // Tech tags animation
            const techTags = document.querySelectorAll(".tech-tag");
            techTags.forEach((tag, index) => {
                gsap.fromTo(tag,
                    { opacity: 0, scale: 0.8 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: tag.closest(".experience-card"),
                            start: "top 75%",
                            toggleActions: "play none none none"
                        },
                        delay: 0.3 + (index % 5) * 0.05
                    }
                );
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <main className="min-h-screen bg-white">
            <Header />
            
            {/* Hero Section with Watermark Heading */}
            <section ref={heroRef} className="relative w-full bg-white min-h-[50vh] md:h-[70vh] flex items-center px-4 sm:px-8 md:px-16 py-12 md:py-0 overflow-hidden">
                <div className="w-full max-w-7xl mx-auto relative z-10">
                    {/* Watermark Heading */}
                    <div className="relative mb-8 md:mb-12 z-0">
                        {/* Light grey watermark text */}
                        <h1 
                            ref={watermarkRef}
                            className="text-5xl sm:text-6xl md:text-8xl lg:text-[12rem] font-bold font-[family-name:var(--font-family-media)] text-gray-300 absolute -top-4 sm:-top-6 md:-top-8 lg:-top-16 left-0 select-none pointer-events-none uppercase z-0 leading-none"
                            style={{ zIndex: 0 }}
                        >
                            EXPERIENCE
                        </h1>
                        {/* Main heading overlaying the watermark */}
                        <h2 
                            ref={headingRef}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-[family-name:var(--font-family-media)] text-black relative z-10 pt-6 sm:pt-8 md:pt-12 lg:pt-16"
                        >
                            My Journey
                        </h2>
                    </div>

                    {/* Description Section */}
                    <div ref={descriptionRef} className="relative z-10 max-w-3xl">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 font-[family-name:var(--font-family-sans)] leading-relaxed">
                            A journey through my professional career and the projects that defined it.
                        </p>
                    </div>
                </div>
            </section>

            {/* Experience List Section */}
            <section ref={experiencesRef} className="w-full bg-white py-10 px-8 md:px-16">
                <div className="w-full max-w-6xl mx-auto">
                    <div className="space-y-8 sm:space-y-12 md:space-y-16">
                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                className="experience-card group relative"
                            >
                                {/* Timeline indicator for desktop */}
                                <div className="hidden md:block absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 pl-0 md:pl-8 relative">
                                    {/* Timeline dot */}
                                    <div className="hidden md:block absolute left-0 top-6 w-4 h-4 rounded-full bg-white border-2 border-gray-300 group-hover:border-orange-500 group-hover:scale-125 transition-all duration-300 z-10"></div>
                                    
                                    {/* Left Column - Company & Period */}
                                    <div className="w-full md:w-1/3">
                                        <div className="mb-3 sm:mb-4">
                                            <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-bold tracking-wider uppercase rounded-full border border-gray-200 bg-gradient-to-r from-gray-50 to-white text-black shadow-sm group-hover:border-orange-300 group-hover:shadow-md transition-all duration-300">
                                                {exp.period}
                                            </span>
                                        </div>
                                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-[family-name:var(--font-family-media)] text-black mb-2 group-hover:text-orange-600 transition-colors duration-300">
                                            {exp.company}
                                        </h3>
                                        <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium font-[family-name:var(--font-family-media)] mb-3">
                                            {exp.role}
                                        </p>
                                        {exp.location && (
                                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-[family-name:var(--font-family-sans)]">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    strokeWidth={1.5} 
                                                    stroke="currentColor" 
                                                    className="w-4 h-4 flex-shrink-0"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 1.95-1.4 3.75-3 3.75s-3-1.8-3-3.75 1.4-3.75 3-3.75 3 1.8 3 3.75z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v6m0 6v6" />
                                                </svg>
                                                <span className="break-words">
                                                    {exp.location}
                                                    {exp.workType && ` • ${exp.workType}`}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right Column - Description & Tech */}
                                    <div className="w-full md:w-2/3">
                                        <p className="text-gray-700 font-[family-name:var(--font-family-sans)] leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
                                            {exp.description}
                                        </p>
                                        
                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-2 pt-3 sm:pt-4 border-t border-gray-100">
                                            {exp.tech.map((tech, tIndex) => (
                                                <span 
                                                    key={tIndex} 
                                                    className="tech-tag text-xs font-bold uppercase tracking-wider border border-gray-200 text-gray-600 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md bg-white hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all duration-300 cursor-default shadow-sm hover:shadow-md"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Back to Home Link */}
                    <div className="mt-12 sm:mt-16 md:mt-20 text-center">
                        <Link
                            href="/"
                            className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-600 transition-all duration-300 font-[family-name:var(--font-family-sans)] border border-gray-200 rounded-full hover:border-black hover:bg-black hover:text-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                                />
                            </svg>
                            <span className="font-medium">Back to Home</span>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

