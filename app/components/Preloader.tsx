"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
    const topHalfRef = useRef<HTMLDivElement>(null);
    const bottomHalfRef = useRef<HTMLDivElement>(null);
    const messageRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Initial state: Message hidden
            gsap.set(messageRef.current, { opacity: 0 });

            tl.to(messageRef.current, {
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
            })
                .to({}, { duration: 1.5 }) // Hold the message for 1.5 seconds
                .to(messageRef.current, {
                    opacity: 0,
                    duration: 0.8,
                    y: "-50px", // Float up slightly on exit
                    ease: "power2.in",
                })
                .to(
                    topHalfRef.current,
                    {
                        yPercent: -100,
                        duration: 1,
                        ease: "power2.inOut",
                    },
                    "-=0.2" // Overlap slightly with message fade out
                )
                .to(
                    bottomHalfRef.current,
                    {
                        yPercent: 100,
                        duration: 1,
                        ease: "power2.inOut",
                        onComplete: () => {
                            setIsVisible(false);
                        },
                    },
                    "<" // Start at same time as top half
                );
        });

        return () => ctx.revert();
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[1000] overflow-hidden flex flex-col pointer-events-none">
            {/* Top Half Background */}
            <div
                ref={topHalfRef}
                className="absolute top-0 left-0 w-full h-1/2 bg-[#060606] z-20 pointer-events-auto"
            />

            {/* Bottom Half Background */}
            <div
                ref={bottomHalfRef}
                className="absolute bottom-0 left-0 w-full h-1/2 bg-[#060606] z-20 pointer-events-auto"
            />

            {/* Content Container (Above backgrounds) */}
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8 pointer-events-none">
                {/* Intro Message */}
                <div
                    ref={messageRef}
                    className="flex flex-col md:flex-row items-center justify-center gap-2 text-white text-2xl md:text-4xl font-light text-center opacity-0"
                    style={{ fontFamily: 'var(--font-media)' }}
                >
                    welcome to <span className="text-orange-400 font-bold ml-1">MY PORTFOLIO</span>.
                </div>
            </div>
        </div>
    );
}
