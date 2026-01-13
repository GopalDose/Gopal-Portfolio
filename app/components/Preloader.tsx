"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const words = containerRef.current!.querySelectorAll(".word");
            
            if (words.length === 0) {
                setShowLoader(false);
                return;
            }

            const tl = gsap.timeline({
                onComplete: () => {
                    setShowLoader(false);
                }
            });

            // Initial states
            gsap.set(containerRef.current, { display: "flex" });
            gsap.set(words, { opacity: 0, y: 20 });

            // Animation Sequence
            tl.to(words, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.4, // Reveal one by one
                ease: "power3.out"
            })
                // Hold for a moment to let the user see the full message
                .to({}, { duration: 1.5 })
                // Slide up exit
                .to(containerRef.current, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: "power3.inOut"
                });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    if (!showLoader) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
            <div className="relative flex flex-col items-center justify-center gap-2 md:gap-4 p-8">
                <div className="flex flex-wrap justify-center gap-x-3 md:gap-x-6 gap-y-2 max-w-4xl text-center">
                    {["WELCOME", "TO", "MY", "PORTFOLIO"].map((word, index) => (
                        <span
                            key={index}
                            className="word text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter"
                            style={{
                                fontFamily: 'var(--font-media)',
                                backgroundImage: 'url(/assets/loader.png)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: 'transparent',
                                WebkitTextFillColor: 'transparent', // Crucial for some browsers
                            }}
                        >
                            {word}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
