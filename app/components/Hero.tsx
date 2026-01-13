"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = React.useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Animate Intro Text
            tl.from(".intro-text", {
                y: 20,
                opacity: 0,
                duration: 0.8,
            })
                // Animate Bottom Text (Passion 2) - Comes deeper
                .from(".passion-2", {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                }, "-=0.4")
                // Animate Top Text (Passion 1)
                .from(".passion-1", {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                }, "-=0.8")
                // Animate Image
                .from(imageRef.current, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 1.2,
                    ease: "back.out(1.2)",
                }, "-=0.8");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Helper for Passion 1 Styles ("Webdesigner")
    // Default: Black Fill (Back), White Stroke (Front)
    // Hovered: White Fill + Black Stroke (Back??), Transparent + Black Stroke (Front)
    // User: "white font with black border -> image"

    // Helper for Passion 2 Styles ("& Photographer")
    // Default: White Fill + Black Stroke (Back), Transparent + Black Stroke (Front)
    // Hovered: Black Fill (Back), White Stroke (Front)
    // User: "black text -> image -> white border"

    // Style Constants
    const PRIMARY_COLOR = "rgb(29, 29, 29)"; // Dark Gray from reference

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[85vh] mt-[80px] bg-white overflow-hidden"
        >
            {/* Intro Text */}
            <div className="intro-text absolute top-[13%] left-0 w-full flex justify-center items-center h-[25px] z-50">
                <p className="text-[min(22px,4vw)] md:text-[min(22px,2vw)] text-black font-sans flex items-center gap-2">
                    👋 , my name is Gopal and I am a freelance
                </p>
            </div>

            {/* 1. Bottom Text Layer (Solid/Back) - "& Photographer" */}
            <div className="passion-2 absolute top-[43%] left-1/2 -translate-x-1/2 flex justify-center items-center z-0 w-full">
                <h1
                    className={`text-[9vw] font-family-media uppercase text-nowrap select-none transition-all duration-500`}
                    style={{
                        color: isHovered ? PRIMARY_COLOR : 'white',
                        WebkitTextStroke: isHovered ? "0px" : `1px ${PRIMARY_COLOR}`,
                        letterSpacing: '0.1em'
                    }}
                >
                    & Photographer
                </h1>
            </div>

            {/* 2. Top Text Layer (Solid/Back) - "Webdesigner" */}
            <div className="passion-1 absolute top-[18%] left-1/2 -translate-x-1/2 flex justify-center items-center z-0 w-full">
                <h1
                    className={`text-[9vw] font-family-media uppercase text-nowrap select-none transition-all duration-500`}
                    style={{
                        color: isHovered ? 'white' : PRIMARY_COLOR,
                        WebkitTextStroke: isHovered ? `1px ${PRIMARY_COLOR}` : "0px",
                        letterSpacing: '0.1em'
                    }}
                >
                    Webdesigner
                </h1>
            </div>

            {/* 3. Image Layer */}
            <div
                ref={imageRef}
                className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[80%] md:w-[35%] h-[65%] z-10 pointer-events-none"
            >
                <Image
                    src="/assets/Gopal.png"
                    alt="Gopal"
                    fill
                    className="object-contain hover:z-30 transition-all duration-300"
                    priority
                    sizes="(max-width: 768px) 60vw, 25vw"
                />
            </div>

            {/* 4. Top Text Layer (Outline/Front) - "Webdesigner" */}
            <div className="passion-1-out absolute top-[18%] left-1/2 -translate-x-1/2 flex justify-center items-center z-20 w-full pointer-events-none">
                <h1
                    className={`text-[9vw] font-family-media text-transparent uppercase text-nowrap transition-all duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                    style={{ WebkitTextStroke: "1px white", letterSpacing: '0.1em' }}
                >
                    Webdesigner
                </h1>
            </div>

            {/* 5. Bottom Text Layer (Outline/Front) - "& Photographer" */}
            <div className="passion-2-out absolute top-[43%] left-1/2 -translate-x-1/2 flex justify-center items-center z-20 w-full pointer-events-none">
                <h1
                    className={`text-[9vw] font-family-media text-transparent uppercase text-nowrap transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    style={{ WebkitTextStroke: "1px white", letterSpacing: '0.1em' }}
                >
                    & Photographer
                </h1>
            </div>

            {/* Interaction Layer for "Photographer" */}
            <div
                className="absolute top-[43%] left-1/2 -translate-x-1/2 w-full h-[15vh] z-50 cursor-pointer flex justify-center items-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Invisible text to match size exactly for hover area */}
                <h1 className="text-[9vw] font-family-media tracking-tighter uppercase text-nowrap opacity-0">
                    & Photographer
                </h1>
            </div>

        </section>
    );
}
