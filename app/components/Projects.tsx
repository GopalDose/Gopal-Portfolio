"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

import type { Project } from "../data/projects";

const ProjectCard = ({ 
    project, 
    index, 
    onMouseEnter, 
    onMouseLeave, 
    onMouseMove 
}: { 
    project: Project, 
    index: number,
    onMouseEnter: () => void,
    onMouseLeave: () => void,
    onMouseMove: (e: MouseEvent) => void
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isExternalLink = project.link.startsWith('http://') || project.link.startsWith('https://');
    const isValidLink = project.link && project.link !== '#';

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        card.addEventListener("mousemove", onMouseMove);
        card.addEventListener("mouseenter", onMouseEnter);
        card.addEventListener("mouseleave", onMouseLeave);

        return () => {
            card.removeEventListener("mousemove", onMouseMove);
            card.removeEventListener("mouseenter", onMouseEnter);
            card.removeEventListener("mouseleave", onMouseLeave);
        };
    }, [onMouseEnter, onMouseLeave, onMouseMove]);

    const cardContent = (
        <div
            ref={cardRef}
            className="group relative flex flex-col p-4 sm:p-6 bg-white border border-gray-100 hover:bg-[#111] hover:text-white transition-all duration-300 w-full md:w-[320px] h-auto md:h-[450px] min-h-[400px] md:min-h-0 shrink-0 cursor-none md:mx-4 shadow-lg rounded-xl"
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-family-media)] flex items-center gap-2 flex-1 pr-2">
                    <span className="w-3 sm:w-4 h-0.5 bg-black opacity-70 group-hover:bg-white group-hover:opacity-100 transition-colors flex-shrink-0"></span>
                    <span className="truncate">{project.title}</span>
                </h3>
                <span className="text-3xl sm:text-4xl font-[family-name:var(--font-family-media)] opacity-30 group-hover:text-orange-500 group-hover:opacity-100 transition-colors flex-shrink-0">
                    {String(index + 1).padStart(2, '0')}
                </span>
            </div>

            {/* Image */}
            <div className="relative w-full aspect-[4/3] mb-4 sm:mb-6 overflow-hidden bg-gray-100 border border-gray-200 group-hover:border-transparent rounded-lg">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        width={320}
                        height={240}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                        <div className="text-3xl sm:text-4xl font-bold text-gray-300 font-[family-name:var(--font-family-media)]">
                            {String(index + 1).padStart(2, '0')}
                        </div>
                    </div>
                )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm opacity-70 leading-relaxed mb-auto font-[family-name:var(--font-family-sans)] line-clamp-3">
                {project.description}
            </p>
        </div>
    );

    if (!isValidLink) {
        return cardContent;
    }

    if (isExternalLink) {
        return (
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
            >
                {cardContent}
            </a>
        );
    }

    return (
        <Link href={project.link} className="block">
            {cardContent}
        </Link>
    );
};

export default function Projects() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        const cursor = cursorRef.current;

        if (!section || !track) return;

        // Initialize cursor position and transforms
        if (cursor) {
            gsap.set(cursor, { 
                xPercent: -50, 
                yPercent: -50,
                scale: 0,
                opacity: 0
            });
        }

        // The "Parabola" Effect
        // We scroll horizontally.
        // As items move, we want them to follow an arc? 
        // Simplified Parabola: The middle items are higher?
        // Let's implement a Y-axis sine wave based on scroll progress.

        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray(".project-card-wrapper") as HTMLElement[];

            // 1. Horizontal Scroll
            // Determine distance: Total Width - Viewport Width
            // Only enable horizontal scroll on desktop
            if (window.innerWidth < 768) {
                return;
            }

            const totalWidth = track.scrollWidth;
            const viewportWidth = window.innerWidth;
            const scrollAmount = totalWidth - viewportWidth + 300; // Extra buffer

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: `+=${totalWidth}`, // Scroll duration based on width
                    pin: true,
                    scrub: 1,
                    // anticipatePin: 1
                }
            });

            // Move track to the left
            tl.to(track, {
                x: -scrollAmount,
                ease: "none"
            }, 0);

            // 2. Parabola / Wave Animation (The "Revel" part)
            // We want them to curve up and down as they traverse the screen?
            // Actually, let's just create a nice staggered wave effect directly on the timeline.
            // Or simpler: As the user scrolls, the y position of ALL cards sine-waves?

            // Let's link y-position to x-position.
            // Since we are scrubbing x, we can just let them be static Y in the container, 
            // OR animate them up/down.
            // Let's set initial Y positions to form a curve?
            // E.g. [0, -50, -80, -50, 0]
            // This is a static parabola.

            cards.forEach((card, i) => {
                // Static Parabola Layout
                // const yOffset = Math.sin((i / (cards.length - 1)) * Math.PI) * -100;
                // gsap.set(card, { y: yOffset });

                // Dynamic Reveal:
                // They start low, and rise up as they enter view?
                // Let's keep it simple: Sticky Horizontal. 
                // "Parabola way" might just mean the Layout is curved.
                // I'll apply a curve layout.

                const mid = (cards.length - 1) / 2;
                const dist = Math.abs(i - mid);
                const yOffset = dist * 40; // Center items higher (0 offset), edges lower (positive offset)

                gsap.set(card, { y: yOffset });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Cursor movement handlers
    const handleMouseMove = React.useCallback((e: MouseEvent) => {
        if (cursorRef.current) {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2,
                ease: "power3.out"
            });
        }
    }, []);

    const handleMouseEnter = React.useCallback(() => {
        if (cursorRef.current) {
            gsap.to(cursorRef.current, { 
                scale: 1, 
                opacity: 1, 
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        }
    }, []);

    const handleMouseLeave = React.useCallback(() => {
        if (cursorRef.current) {
            gsap.to(cursorRef.current, { 
                scale: 0, 
                opacity: 0, 
                duration: 0.3 
            });
        }
    }, []);

    return (
        <section ref={sectionRef} className="bg-white relative overflow-hidden min-h-screen md:h-screen flex flex-col justify-center py-12 md:py-0">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 absolute top-16 sm:top-20 md:top-24 lg:top-28 left-0 right-0 z-10 mb-8 md:mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-[family-name:var(--font-family-media)] tracking-tighter mb-4 md:mb-6 text-black">
                    Selected Works
                </h2>
                <div className="h-px w-24 sm:w-32 bg-black"></div>
            </div>

            {/* Mobile: Vertical Layout */}
            <div className="md:hidden w-full px-4 pt-32 pb-8 space-y-6">
                {PROJECTS.slice(0, 4).map((project, index) => (
                    <div key={index} className="w-full">
                        <ProjectCard 
                            project={project} 
                            index={index}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onMouseMove={handleMouseMove}
                        />
                    </div>
                ))}
                {PROJECTS.length > 4 && (
                    <div className="w-full">
                        <Link 
                            href="/projects"
                            className="group relative flex flex-col p-6 bg-white border border-gray-100 hover:bg-[#111] hover:text-white transition-all duration-300 w-full cursor-pointer overflow-hidden shadow-lg rounded-xl"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-xl font-bold font-[family-name:var(--font-family-media)] flex items-center gap-2">
                                    <span className="w-4 h-0.5 bg-black opacity-70 group-hover:bg-white group-hover:opacity-100 transition-colors"></span>
                                    See More
                                </h3>
                                <span className="text-4xl font-[family-name:var(--font-family-media)] opacity-30 group-hover:text-orange-500 group-hover:opacity-100 transition-colors">
                                    05
                                </span>
                            </div>

                            {/* Icon/Content Area */}
                            <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 group-hover:border-transparent rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <FiArrowUpRight className="w-16 h-16 text-gray-400 group-hover:text-orange-500 transition-colors mx-auto mb-4" />
                                    <p className="text-sm text-gray-500 group-hover:text-white transition-colors font-[family-name:var(--font-family-sans)]">
                                        {PROJECTS.length - 4} more projects
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-sm opacity-70 leading-relaxed mb-auto font-[family-name:var(--font-family-sans)]">
                                Explore all my projects and see the full range of my work and expertise.
                            </p>
                        </Link>
                    </div>
                )}
            </div>

            {/* Desktop: Horizontal Scroll Track */}
            <div ref={trackRef} className="hidden md:flex items-center pl-[5vw] lg:pl-[10vw] pr-[5vw] lg:pr-[10vw] gap-6 lg:gap-8 h-full pt-24 lg:pt-32">
                {PROJECTS.slice(0, 4).map((project, index) => (
                    <div key={index} className="project-card-wrapper transition-transform will-change-transform">
                        <ProjectCard 
                            project={project} 
                            index={index}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onMouseMove={handleMouseMove}
                        />
                    </div>
                ))}
                {PROJECTS.length > 4 && (
                    <div className="project-card-wrapper transition-transform will-change-transform">
                        <Link 
                            href="/projects"
                            className="group relative flex flex-col p-4 sm:p-6 bg-white border border-gray-100 hover:bg-[#111] hover:text-white transition-all duration-300 w-full md:w-[320px] h-auto md:h-[450px] min-h-[400px] md:min-h-0 shrink-0 cursor-pointer md:mx-4 overflow-hidden shadow-lg rounded-xl"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onMouseMove={handleMouseMove as any}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-xl font-bold font-[family-name:var(--font-family-media)] flex items-center gap-2">
                                    <span className="w-4 h-0.5 bg-black opacity-70 group-hover:bg-white group-hover:opacity-100 transition-colors"></span>
                                    See More
                                </h3>
                                <span className="text-4xl font-[family-name:var(--font-family-media)] opacity-30 group-hover:text-orange-500 group-hover:opacity-100 transition-colors">
                                    05
                                </span>
                            </div>

                            {/* Icon/Content Area */}
                            <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 group-hover:border-transparent rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <FiArrowUpRight className="w-16 h-16 text-gray-400 group-hover:text-orange-500 transition-colors mx-auto mb-4" />
                                    <p className="text-sm text-gray-500 group-hover:text-white transition-colors font-[family-name:var(--font-family-sans)]">
                                        {PROJECTS.length - 4} more projects
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-sm opacity-70 leading-relaxed mb-auto font-[family-name:var(--font-family-sans)]">
                                Explore all my projects and see the full range of my work and expertise.
                            </p>
                        </Link>
                    </div>
                )}
            </div>

            {/* Shared Custom Cursor - Desktop Only */}
            <div
                ref={cursorRef}
                className="hidden md:block fixed top-0 left-0 bg-orange-500 text-white px-4 py-2 rounded-full flex items-center gap-2 font-bold uppercase text-xs tracking-widest pointer-events-none z-[60] shadow-lg whitespace-nowrap"
            >
                <span>Visit</span>
                <FiArrowUpRight className="text-lg" />
            </div>
        </section>
    );
}
