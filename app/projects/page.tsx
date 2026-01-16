"use client";

import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import { PROJECTS } from "../data/projects";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const watermarkRef = useRef<HTMLHeadingElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);

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

            if (descriptionRef.current) {
                gsap.fromTo(descriptionRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.4 }
                );
            }

            // Project cards animations
            const projectCards = document.querySelectorAll(".project-card-item");
            projectCards.forEach((card, index) => {
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

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <main className="min-h-screen bg-white">
            <Header />
            
            {/* Hero Section with Watermark Heading - 80vh */}
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
                            PROJECTS
                        </h1>
                        {/* Main heading overlaying the watermark */}
                        <h2 
                            ref={headingRef}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-[family-name:var(--font-family-media)] text-black relative z-10 pt-6 sm:pt-8 md:pt-12 lg:pt-16"
                        >
                            My Works
                        </h2>
                    </div>

                    {/* Description Section */}
                    <div ref={descriptionRef} className="relative z-10 max-w-3xl">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 font-[family-name:var(--font-family-sans)] leading-relaxed">
                            Projects showcase my technical expertise, design thinking, and ability to transform ideas into elegant digital solutions that solve real-world problems.
                        </p>
                    </div>
                </div>
            </section>

            {/* Projects Grid Section */}
            <section ref={projectsRef} className="w-full bg-white py-8 sm:py-10 md:py-12 px-4 sm:px-8 md:px-16">
                <div className="w-full max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
                        {PROJECTS.map((project, index) => (
                            <div
                                key={index}
                                className="project-card-item group relative"
                            >
                                <Link
                                    href={project.link}
                                    className="block h-full"
                                >
                                    <div className="relative flex flex-col h-full bg-white border border-gray-100 hover:bg-[#111] hover:text-white transition-all duration-300 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl">
                                        {/* Image */}
                                        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                                            {project.image ? (
                                                <>
                                                    <Image
                                                        src={project.image}
                                                        alt={project.title}
                                                        width={400}
                                                        height={300}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                </>
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                                                    <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-300 font-[family-name:var(--font-family-media)]">
                                                        {String(index + 1).padStart(2, '0')}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-4 sm:p-6 flex flex-col flex-grow">
                                            {/* Header */}
                                            <div className="flex justify-between items-start mb-3 sm:mb-4">
                                                <h3 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-family-media)] flex items-center gap-2 flex-1 pr-2">
                                                    <span className="w-3 sm:w-4 h-0.5 bg-black opacity-70 group-hover:bg-white group-hover:opacity-100 transition-colors flex-shrink-0"></span>
                                                    <span className="truncate">{project.title}</span>
                                                </h3>
                                                <span className="text-xl sm:text-2xl font-[family-name:var(--font-family-media)] opacity-30 group-hover:text-orange-500 group-hover:opacity-100 transition-colors flex-shrink-0">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                            </div>

                                            {/* Description */}
                                            <p className="text-xs sm:text-sm opacity-70 leading-relaxed mb-3 sm:mb-4 font-[family-name:var(--font-family-sans)] flex-grow line-clamp-3">
                                                {project.description}
                                            </p>

                                            {/* Link Icon */}
                                            <div className="flex items-center gap-2 text-gray-400 group-hover:text-orange-500 transition-colors mt-auto">
                                                <span className="text-xs font-bold uppercase tracking-wider font-[family-name:var(--font-family-sans)]">
                                                    View Project
                                                </span>
                                                <FiArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform flex-shrink-0" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Back to Home Link */}
                    <div className="mt-12 sm:mt-16 md:mt-20 text-center">
                        <Link
                            href="/"
                            className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 transition-all duration-300 font-[family-name:var(--font-family-sans)] border border-gray-200 rounded-full hover:border-black hover:bg-black hover:text-white text-gray-600 text-sm sm:text-base"
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

