"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { experiences } from "../data/experience";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollSectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const activeIndexRef = useRef<number>(0);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [showAll, setShowAll] = useState<boolean>(false);

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

            // Animate company list items (desktop only)
            const companyItems = document.querySelectorAll(".company-item");
            if (companyItems.length > 0) {
                const isDesktop = window.innerWidth >= 768;
                if (isDesktop) {
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
                }
            }

            // Animate mobile experience items
            const mobileItems = document.querySelectorAll(".experience-item-mobile");
            if (mobileItems.length > 0) {
                const isMobile = window.innerWidth < 768;
                if (isMobile) {
                    gsap.fromTo(mobileItems,
                        { 
                            y: 30, 
                            opacity: 0
                        },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.6,
                            stagger: 0.15,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: containerRef.current,
                                start: "top 80%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                }
            }

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


    const visibleExperiences = showAll ? experiences : experiences.slice(0, 3);
    const activeExperience = visibleExperiences[activeIndex] || visibleExperiences[0];

    return (
        <section 
            ref={containerRef} 
            className="relative w-full bg-gray-50 py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-16 z-10 snap-start"
        >
            <div className="w-full max-w-7xl mx-auto">
                {/* Sticky Container */}
                <div className="relative">
                    {/* Sticky Content - Header + Two Column Layout */}
                    <div className="md:sticky md:top-24">
                        {/* Header Section */}
                        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-center">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-family-media font-bold text-black mb-4 sm:mb-6">
                                Experience
                            </h2>
                            <p className="text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto font-sans leading-relaxed px-4">
                                A journey through my professional career and the projects that defined it.
                            </p>
                        </div>

                        {/* Mobile: Vertical List Layout */}
                        <div className="md:hidden space-y-8">
                            {visibleExperiences.map((exp, index) => (
                                <div
                                    key={index}
                                    className="experience-item-mobile bg-white rounded-lg p-6 border border-gray-100 shadow-sm"
                                >
                                    {/* Period */}
                                    <div className="mb-4">
                                        <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full border border-gray-200 bg-gray-50 text-black">
                                            {exp.period}
                                        </span>
                                    </div>

                                    {/* Role & Company */}
                                    <div className="mb-4">
                                        <h3 className="text-xl font-family-media font-bold mb-2 text-black">
                                            {exp.role}
                                        </h3>
                                        <p className="text-lg text-gray-700 font-medium font-family-media mb-2">
                                            {exp.company}
                                        </p>
                                        {exp.location && (
                                            <p className="text-xs text-gray-500 font-sans">
                                                {exp.location}
                                                {exp.workType && ` • ${exp.workType}`}
                                            </p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 font-sans leading-relaxed mb-4 text-sm">
                                        {exp.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                                        {exp.tech.map((tech, tIndex) => (
                                            <span 
                                                key={tIndex} 
                                                className="text-xs font-bold uppercase tracking-wider border border-gray-200 text-gray-500 px-2 py-1 rounded-md"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {experiences.length > 3 && (
                                <Link
                                    href="/experience"
                                    className="block text-center text-sm font-sans font-medium text-gray-600 hover:text-black transition-colors duration-300 underline"
                                >
                                    View more ({experiences.length - 3} more)
                                </Link>
                            )}
                        </div>

                        {/* Desktop: Two Column Layout */}
                        <div className="hidden md:flex flex-row gap-12 lg:gap-16 items-start">
                        {/* Left Side: Company List */}
                        <div className="w-1/3 h-fit">
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
                                            <div className={`w-2 h-2 rounded-full transition-all duration-300 flex-shrink-0 ${
                                                activeIndex === index 
                                                    ? 'bg-orange-500 scale-150' 
                                                    : 'bg-gray-300'
                                            }`}></div>
                                            <h4 className={`text-xl md:text-2xl font-family-media font-bold underline transition-all duration-300 break-words ${
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
                                        <p className={`text-xs font-sans ml-5 mt-1 transition-all duration-300 ${
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
                                <Link
                                    href="/experience"
                                    className="mt-8 inline-block text-sm font-sans font-medium text-gray-600 hover:text-black transition-colors duration-300 underline"
                                >
                                    View more ({experiences.length - 3} more)
                                </Link>
                            )}
                        </div>

                        {/* Right Side: Experience Details - Single Content Area */}
                        <div className="w-2/3">
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

                    {/* Invisible Trigger Sections for Scroll Detection - Desktop Only */}
                    <div ref={scrollSectionRef} className="relative hidden md:block">
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
