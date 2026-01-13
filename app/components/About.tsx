"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollTrackRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const [downloading, setDownloading] = React.useState(false);
    const [activeSection, setActiveSection] = React.useState<'who-i-am' | 'education'>('who-i-am');

    const points = [
        "Passionate about creating intuitive web experiences",
        "Focused on minimalist and functional design",
        "Always learning and exploring new technologies",
        "Committed to delivering high-quality code"
    ];

    // Sorted Reverse Chronological
    const educationData = [
        {
            year: "2023 - 2026",
            degree: "B.E. Computer Engineering",
            institution: "Pune Institute of Computer Technology",
            description: "Currently pursuing. CGPA: 9.4"
        },
        {
            year: "2020 - 2023",
            degree: "Diploma in Information Technology",
            institution: "Government Polytechnic, Kolhapur",
            description: "Achieved 96.53%"
        },
        {
            year: "2019 - 2020",
            degree: "Secondary School Certificate",
            institution: "M. S. M. English School",
            description: "Scored 90.00%"
        }
    ];

    useEffect(() => {
        // Only run animations on Desktop (check logic via media query match or simplified width check)
        // We will use ScrollTrigger.matchMedia for clean handling

        let ctx = gsap.context(() => {
            // Setup for Desktop Timeline
            ScrollTrigger.matchMedia({
                // Desktop
                "(min-width: 768px)": function () {
                    const scrollTrack = scrollTrackRef.current;
                    const scrollContainer = scrollContainerRef.current;
                    if (!scrollTrack || !scrollContainer) return;

                    // Set initial position
                    gsap.set(scrollTrack, { x: 0, force3D: true });

                    const getScrollDistance = () => window.innerWidth;
                    const scrollDistance = getScrollDistance();

                    // Header Visibility Animation
                    ScrollTrigger.create({
                        trigger: scrollContainer,
                        start: "top top",
                        end: () => `+=${getScrollDistance()}`,
                        onToggle: self => {
                            if (headerRef.current) {
                                gsap.to(headerRef.current, { autoAlpha: self.isActive ? 1 : 0, duration: 0.1 });
                            }
                        }
                    });

                    // Horizontal Scroll
                    const horizontalTween = gsap.to(scrollTrack, {
                        x: -scrollDistance, // Move left by 1 screen width
                        ease: "none",
                        scrollTrigger: {
                            trigger: scrollContainer,
                            pin: true,
                            scrub: 1,
                            start: "top top",
                            end: () => `+=${getScrollDistance()}`,
                            anticipatePin: 1,
                            invalidateOnRefresh: true,
                            onUpdate: (self) => {
                                // Switch active section based on progress
                                if (self.progress < 0.5) {
                                    setActiveSection('who-i-am');
                                } else {
                                    setActiveSection('education');
                                }
                            }
                        }
                    });

                    // Desktop Timeline: Drawing the curved line
                    // The line is static in shape, we just animate the "mask" width
                    const timelineMaskRect = document.querySelector("#timeline-mask-rect") as SVGRectElement;
                    if (timelineMaskRect) {
                        gsap.set(timelineMaskRect, { width: 0 });
                        gsap.to(timelineMaskRect, {
                            width: 1000,
                            ease: "none",
                            scrollTrigger: {
                                trigger: ".education-section-desktop",
                                containerAnimation: horizontalTween,
                                start: "left 90%", // Starts when left edge enters 10% from right
                                end: "right 90%",
                                scrub: true,
                            }
                        });
                    }

                    // Desktop Timeline: Animate Items appearing
                    const timelineItems = document.querySelectorAll(".desktop-timeline-item");
                    timelineItems.forEach((item, index) => {
                        const content = item.querySelector(".card-content");
                        const line = item.querySelector(".connector-line");

                        // Animation: Fade in and scale up/slide
                        gsap.fromTo([content, line],
                            { opacity: 0, scale: 0.8, y: 20 },
                            {
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                duration: 0.5,
                                ease: "back.out(1.7)",
                                scrollTrigger: {
                                    trigger: item,
                                    containerAnimation: horizontalTween,
                                    start: "left 85%", // Appear slightly later than the line
                                    toggleActions: "play reverse play reverse"
                                }
                            }
                        );
                    });
                },
                // Mobile
                "(max-width: 767px)": function () {
                    // No horizontal scroll pin. Just standard vertical flow.
                    // Animate items as they scroll into view
                    const items = document.querySelectorAll(".mobile-timeline-item");
                    items.forEach((item) => {
                        gsap.fromTo(item,
                            { opacity: 0, x: -20 },
                            {
                                opacity: 1, x: 0, duration: 0.6, ease: "power2.out",
                                scrollTrigger: {
                                    trigger: item,
                                    start: "top 85%",
                                }
                            }
                        );
                    });
                }
            });

        }, scrollContainerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="w-full snap-start">
            {/* Desktop Wrapper handling the pinned horizontal scroll */}
            <div ref={scrollContainerRef} className="relative w-full md:h-screen overflow-hidden bg-white">

                {/* Desktop Fixed Header */}
                <div ref={headerRef} className="hidden md:flex fixed top-24 left-0 w-full px-16 z-40 flex-row justify-between items-center pointer-events-none opacity-0 invisible">
                    <h2 className="text-5xl font-family-media font-bold pointer-events-auto">About Me</h2>
                    <nav className="flex items-center gap-4 text-xl font-family-media font-light pointer-events-auto">
                        <button
                            onClick={() => {
                                const st = ScrollTrigger.getAll().find(st => st.pin); // Find the pinned trigger
                                if (st) window.scrollTo({ top: st.start, behavior: 'smooth' });
                            }}
                            className={`transition-colors duration-300 ${activeSection === 'who-i-am' ? 'text-black font-semibold' : 'text-gray-400 hover:text-black'}`}
                        >
                            who i am <span className={`${activeSection === 'who-i-am' ? 'inline-block text-orange-500' : 'hidden'}`}>↗</span>
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                            onClick={() => {
                                const st = ScrollTrigger.getAll().find(st => st.pin);
                                if (st) window.scrollTo({ top: st.end, behavior: 'smooth' });
                            }}
                            className={`transition-colors duration-300 ${activeSection === 'education' ? 'text-black font-semibold' : 'text-gray-400 hover:text-black'}`}
                        >
                            education <span className={`${activeSection === 'education' ? 'inline-block text-orange-500' : 'hidden'}`}>↗</span>
                        </button>
                    </nav>
                </div>

                {/* Mobile Header (Static) */}
                <div className="block md:hidden px-8 pt-24 pb-8">
                    <h2 className="text-4xl font-family-media font-bold mb-8">About Me</h2>
                </div>


                <div ref={scrollTrackRef} className="flex flex-col md:flex-row w-full md:w-[200vw] h-auto md:h-full">

                    {/* Section 1: Who I Am */}
                    <div className="w-full md:w-screen h-auto md:h-full flex items-center justify-center px-8 md:px-16 py-12 md:py-0 shrink-0">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12 w-full max-w-7xl mx-auto">
                            {/* Left Side */}
                            <div className="flex-1 w-full md:w-1/2 flex flex-col items-start gap-8 z-10">
                                <div className="intro-text">
                                    <p className="text-lg md:text-xl text-gray-700 font-sans leading-relaxed max-w-xl">
                                        I am a creative developer who builds immersive digital experiences.
                                        I bridge the gap between design and technology to bring ideas to life.
                                    </p>
                                </div>
                                <div className="points flex flex-col gap-4">
                                    {points.map((point, index) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <div className="w-6 h-6 shrink-0 border border-black rounded-full flex items-center justify-center">
                                                <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-base md:text-lg text-gray-600 font-sans">{point}</span>
                                        </div>
                                    ))}
                                </div>
                                <a
                                    href="/assets/Gopal_Dose_Resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group mt-4 relative pb-1 text-lg font-family-media font-semibold tracking-wide flex items-center gap-2 overflow-hidden cursor-pointer"
                                    onMouseEnter={() => setDownloading(true)}
                                    onMouseLeave={() => setDownloading(false)}
                                >
                                    <span className="relative z-10 border-b-2 border-black pb-1">Download Cv</span>
                                    <svg
                                        className={`w-5 h-5 text-black transition-transform duration-300 ${downloading ? 'translate-y-1' : 'translate-y-0'}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </a>
                            </div>

                            {/* Right Side - Sketch Image */}
                            <div className="flex-1 w-full md:w-1/2 flex justify-center md:justify-end relative">
                                <div className="relative w-full max-w-xs md:max-w-md aspect-square md:aspect-4/5">
                                    <Image
                                        src="/assets/about_doodle.png"
                                        alt="Minimalist Sketch"
                                        fill
                                        className="object-contain mix-blend-multiply opacity-80"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Education (Desktop Horizontal / Mobile Vertical) */}
                    <div className="education-section-desktop w-full md:w-screen h-auto md:h-full flex items-center justify-center px-8 md:px-16 py-12 md:py-0 shrink-0 bg-white">

                        {/* Mobile View: Vertical Timeline */}
                        <div className="block md:hidden w-full max-w-lg mx-auto">
                            <h3 className="text-3xl font-family-media font-bold mb-12 text-center">Education</h3>
                            <div className="relative border-l-2 border-gray-200 ml-4 space-y-12">
                                {educationData.map((edu, index) => (
                                    <div key={index} className="mobile-timeline-item relative pl-8">
                                        {/* Dot */}
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black border-2 border-white"></div>
                                        {/* Content */}
                                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                            <span className="text-xs font-bold tracking-wider text-orange-500 uppercase mb-2 block">{edu.year}</span>
                                            <h4 className="text-xl font-family-media font-bold text-black mb-1">{edu.degree}</h4>
                                            <p className="font-medium text-sm text-gray-600 mb-3">{edu.institution}</p>
                                            <p className="text-sm text-gray-500 leading-relaxed font-sans">{edu.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Desktop View: Horizontal Animated Timeline */}
                        <div className="hidden md:flex w-full max-w-7xl mx-auto flex-col gap-12 items-center justify-center h-full">

                            <div className="relative w-full px-4 h-[500px] flex items-center justify-center">
                                {/* SVG Curve */}
                                <svg className="absolute left-0 top-1/2 w-full h-[300px] transform -translate-y-1/2 pointer-events-none z-0" viewBox="0 0 1000 300" preserveAspectRatio="none">
                                    <defs>
                                        <mask id="timeline-mask">
                                            <rect id="timeline-mask-rect" x="0" y="0" width="0" height="300" fill="white" />
                                        </mask>
                                    </defs>
                                    {/* Dashed background path */}
                                    <path
                                        d="M 50,150 C 200,50 350,250 500,150 C 650,50 800,250 950,150"
                                        fill="none" stroke="#f0f0f0" strokeWidth="4"
                                    />
                                    {/* Animated black path */}
                                    <path
                                        d="M 50,150 C 200,50 350,250 500,150 C 650,50 800,250 950,150"
                                        fill="none" stroke="#000" strokeWidth="3" strokeDasharray="8 8"
                                        mask="url(#timeline-mask)"
                                    />
                                </svg>

                                {/* Items positioned absolutely along the curve */}
                                <div className="relative w-full h-full max-w-6xl mx-auto">
                                    {educationData.map((edu, index) => {
                                        // Precise Positioning relative to SVG
                                        // Item 0: x=50 (5%)
                                        // Item 1: x=500 (50%)
                                        // Item 2: x=950 (95%)
                                        // All items are centered vertically on the line (y=150)
                                        // We use top-1/2 and specific left-% to position.

                                        const isMiddle = index === 1;

                                        return (
                                            <div
                                                key={index}
                                                // w-80 (20rem) is card width. 
                                                // We position the CENTER of this div at the specific point.
                                                // left-[5%] matches x=50 in viewBox 1000.
                                                className={`desktop-timeline-item absolute flex w-80 text-center h-0 items-center overflow-visible
                                                    ${index === 0 ? 'left-[10%]' : index === 1 ? 'left-[50%]' : 'left-[90%]'}
                                                    top-1/2 -translate-x-1/2
                                                    ${isMiddle ? 'flex-col' : 'flex-col-reverse'} 
                                                `}
                                            >
                                                {/* Connecting Line to Curve */}
                                                <div className={`connector-line w-[2px] h-12 bg-gray-200`}></div>

                                                {/* Card Content - Pushed away by flex layout */}
                                                <div className="card-content bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-lg transition-shadow duration-300 w-full relative z-20 my-4">
                                                    <span className="inline-block px-3 py-1 bg-gray-50 text-xs font-bold tracking-wider text-black uppercase rounded-full mb-3 border border-gray-100">{edu.year}</span>
                                                    <h4 className="text-xl font-family-media font-bold text-black leading-tight mb-1">{edu.degree}</h4>
                                                    <p className="font-medium text-sm text-gray-500 font-sans mb-3">{edu.institution}</p>
                                                    <p className="text-sm text-gray-500 leading-relaxed font-sans">{edu.description}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
