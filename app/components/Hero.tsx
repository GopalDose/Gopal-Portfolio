"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const [hoveredItem, setHoveredItem] = React.useState<null | 'passion1' | 'passion2'>(null);
    const [isClicked, setIsClicked] = React.useState(false);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Set initial states - using scoped selectors within container
            const welcomeText = containerRef.current!.querySelector(".welcome-text");
            const passion1 = containerRef.current!.querySelector(".passion-1");
            const passion2 = containerRef.current!.querySelector(".passion-2");
            const letsTalkBtn = containerRef.current!.querySelector(".lets-talk-btn");
            const scrollDown = containerRef.current!.querySelector(".scroll-down");
            const sideText = containerRef.current!.querySelector(".side-text");

            if (welcomeText) gsap.set(welcomeText, { y: 20, opacity: 0 });
            if (passion1) gsap.set(passion1, { x: -50, opacity: 0 });
            if (passion2) gsap.set(passion2, { x: -50, opacity: 0 });
            if (letsTalkBtn) gsap.set(letsTalkBtn, { y: 20, opacity: 0 });
            if (scrollDown) gsap.set(scrollDown, { y: -10, opacity: 0 });
            if (sideText) {
                gsap.set(sideText, {
                    rotation: -90,
                    transformOrigin: "right bottom",
                    y: 50,
                    opacity: 0
                });
            }

            if (imageRef.current) {
                gsap.set(imageRef.current, { opacity: 0, x: 50 });
            }

            // Animate Welcome Text
            if (welcomeText) {
                tl.to(welcomeText, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                });
            }
            // Animate Passion 1
            if (passion1) {
                tl.to(passion1, {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                }, "-=0.4");
            }
            // Animate Passion 2
            if (passion2) {
                tl.to(passion2, {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                }, "-=0.6");
            }
            // Animate Button
            if (letsTalkBtn) {
                tl.to(letsTalkBtn, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                }, "-=0.4");
            }
            // Animate Image
            if (imageRef.current) {
                tl.to(imageRef.current, {
                    x: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                }, "-=0.8");
            }
            // Animate Scroll Down
            if (scrollDown) {
                tl.to(scrollDown, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                }, "-=0.4");
            }
            // Animate Side Text
            if (sideText) {
                tl.to(sideText, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                }, "-=0.6");
            }

            // Continuous bounce animation for scroll down
            if (scrollDown) {
                gsap.to(scrollDown, {
                    y: 10,
                    duration: 1.5,
                    ease: "power1.inOut",
                    repeat: -1,
                    yoyo: true
                });
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[95vh] bg-white overflow-hidden snap-start"
        >
            {/* Container for split layout */}
            <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-between px-8 md:px-12 lg:px-16">
                {/* Left Side - Passion Text */}
                <div className="passion-text flex-1 flex flex-col justify-center items-start w-full md:w-3/5 h-full z-10 gap-4 md:gap-6 overflow-hidden">
                    {/* Welcome Text */}
                    <div className="welcome-text bg-black text-white px-4 md:px-6 py-2 md:py-3 inline-block">
                        <p className="text-base md:text-lg lg:text-xl font-sans">
                            Welcome, I'm Gopal Vijay Dose
                        </p>
                    </div>

                    {/* Passion 1 - Webdesigner */}
                    <h1
                        className={`font-semibold passion-1 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-family-media uppercase select-none transition-all duration-500 whitespace-nowrap ${hoveredItem === 'passion2' ? 'text-gray-500' : 'text-black'
                            }`}
                        style={{ letterSpacing: '0px' }}
                        onMouseEnter={() => setHoveredItem('passion1')}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        Full Stack Developer
                    </h1>

                    {/* Passion 2 - & Photographer */}
                    <h1
                        className={`font-semibold passion-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-family-media uppercase select-none transition-all duration-500 whitespace-nowrap ${hoveredItem === 'passion2' ? 'text-black' : 'text-gray-500'
                            }`}
                        style={{ letterSpacing: '0px' }}
                        onMouseEnter={() => setHoveredItem('passion2')}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        & Problem Solver
                    </h1>

                    {/* Let's Talk Button */}
                    <Link
                        href="/#contact"
                        className={`lets-talk-btn mt-6 md:mt-8 px-6 md:px-8 py-3 md:py-4 bg-transparent text-black font-sans text-base md:text-lg lg:text-xl border-none outline-none transition-all duration-300 hover:opacity-70 relative inline-block ${isClicked ? 'scale-95' : 'scale-100'}`}
                        style={{
                            cursor: isClicked ? 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\' viewBox=\'0 0 24 24\'%3E%3Cpath d=\'M8 5v14l11-7z\' fill=\'%23000\'/%3E%3C/svg%3E") 10 10, pointer' : 'pointer'
                        }}
                        onMouseDown={() => setIsClicked(true)}
                        onMouseUp={() => {
                            setTimeout(() => setIsClicked(false), 150);
                        }}
                        onMouseLeave={() => setIsClicked(false)}
                    >
                        Let's talk →
                    </Link>
                </div>

                {/* Right Side - Photo */}
                <div className="flex-1 flex justify-center md:justify-end items-center w-full md:w-2/5 h-full relative z-10">
                    <div
                        ref={imageRef}
                        className="relative w-full max-w-sm md:max-w-md lg:max-w-lg h-[50vh] md:h-[60vh]"
                    >
                        <Image
                            src="/assets/Gopal.png"
                            alt="Gopal"
                            fill
                            className="object-contain transition-all duration-300"
                            priority
                            sizes="(max-width: 768px) 80vw, 40vw"
                        />
                    </div>
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className="scroll-down absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
                <span className="text-sm text-gray-600 font-sans">Scroll down</span>
                <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                </svg>
            </div>

            {/* Side Text - Think Design Develop */}
            {/* <div className="side-text absolute bottom-24 right-0 z-20 hidden md:block">
                <p className="text-xs font-sans tracking-[0.2em] text-gray-500 font-bold uppercase whitespace-nowrap flex gap-4">
                    <span>Think</span>
                    <span>Design</span>
                    <span>Develop</span>
                </p>
            </div> */}

        </section>
    );
}
