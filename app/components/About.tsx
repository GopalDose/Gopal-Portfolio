"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const [downloading, setDownloading] = React.useState(false);

    const points = [
        "Passionate about creating intuitive web experiences",
        "Focused on minimalist and functional design",
        "Always learning and exploring new technologies",
        "Committed to delivering high-quality code"
    ];

    useEffect(() => {
        if (!containerRef.current || !contentRef.current || !imageRef.current) return;

        const mainElement = document.querySelector("main");
        if (!mainElement) return;

        const ctx = gsap.context(() => {
            // Animate Left Content
            gsap.from(Array.from(contentRef.current!.children), {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: containerRef.current,
                    scroller: mainElement,
                    start: "top 80%",
                }
            });

            // Animate Right Image
            gsap.from(imageRef.current, {
                x: 50,
                opacity: 0,
                duration: 1.2,
                scrollTrigger: {
                    trigger: containerRef.current,
                    scroller: mainElement,
                    start: "top 80%",
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full min-h-screen flex items-center snap-start py-24 md:py-32 px-8 md:px-12 lg:px-16 bg-white overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20 w-full">

                {/* Left Side - Content */}
                <div ref={contentRef} className="about-content flex-1 w-full md:w-1/2 flex flex-col items-start gap-8 z-10">

                    {/* Short Intro */}
                    <div className="intro-text">
                        <h2 className="text-4xl md:text-5xl font-family-media font-bold mb-6">About Me</h2>
                        <p className="text-lg md:text-xl text-gray-700 font-sans leading-relaxed max-w-xl">
                            I am a creative developer who builds immersive digital experiences.
                            I bridge the gap between design and technology to bring ideas to life.
                        </p>
                    </div>

                    {/* Points with Ticks */}
                    <div className="points flex flex-col gap-4">
                        {points.map((point, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="w-6 h-6 flex-shrink-0 border border-black rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-base md:text-lg text-gray-600 font-sans">{point}</span>
                            </div>
                        ))}
                    </div>

                    {/* Download CV Button */}
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
                <div ref={imageRef} className="about-image flex-1 w-full md:w-1/2 flex justify-center md:justify-end relative">
                    <div className="relative w-full max-w-md aspect-square md:aspect-[4/5]">
                        <Image
                            src="/assets/about_doodle.png"
                            alt="Minimalist Sketch"
                            fill
                            className="object-contain mix-blend-multiply opacity-80"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
