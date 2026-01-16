"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";


const MarqueeRow = ({ items, className, textClassName, separatorColor = "text-white/50", reverse = false }: { items: string[], className?: string, textClassName?: string, separatorColor?: string, reverse?: boolean }) => {
    const firstTextRef = useRef<HTMLDivElement>(null);
    const secondTextRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    let xPercent = 0;
    const speed = 0.05;

    useEffect(() => {
        let animationId: number;
        const animate = () => {
            if (reverse) {
                if (xPercent >= 0) xPercent = -100;
                xPercent += speed;
            } else {
                if (xPercent <= -100) xPercent = 0;
                xPercent -= speed;
            }

            if (firstTextRef.current && secondTextRef.current) {
                gsap.set(firstTextRef.current, { xPercent: xPercent });
                gsap.set(secondTextRef.current, { xPercent: xPercent });
            }
            animationId = requestAnimationFrame(animate);
        };
        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [reverse]);

    return (
        <div className={`w-full overflow-hidden py-6 relative z-30 ${className}`}>
            <div ref={sliderRef} className="relative flex whitespace-nowrap overflow-hidden">
                <div ref={firstTextRef} className={`flex items-center gap-12 pr-12 ${reverse ? '-ml-1' : ''}`}>
                    {items.map((item, index) => (
                        <React.Fragment key={`group1-${index}`}>
                            <span className={`text-4xl md:text-5xl font-[family-name:var(--font-family-media)] font-bold tracking-wider ${textClassName}`}>
                                {item}
                            </span>
                            <span className={`${separatorColor} text-2xl`}>✦</span>
                        </React.Fragment>
                    ))}
                    <span className={`${separatorColor} text-2xl`}>✦</span>
                </div>
                <div ref={secondTextRef} className="flex items-center gap-12 pr-12">
                    {items.map((item, index) => (
                        <React.Fragment key={`group2-${index}`}>
                            <span className={`text-4xl md:text-5xl font-[family-name:var(--font-family-media)] font-bold tracking-wider ${textClassName}`}>
                                {item}
                            </span>
                            <span className={`${separatorColor} text-2xl`}>✦</span>
                        </React.Fragment>
                    ))}
                    <span className={`${separatorColor} text-2xl`}>✦</span>
                </div>
            </div>
        </div>
    );
};

export default function MarqueeBanner() {
    const services = [
        "WEB DESIGN", "APP DESIGN", "DEVELOPMENT",
    ];

    const expertise = [
        "USER EXPERIENCE", "INTERACTION", "STRATEGY", "CREATIVE DIRECTION", "PROTOTYPING"
    ];

    return (
        <div className="flex flex-col">
            {/* Expertise Row (White BG, White Text with Black Border) */}
            <MarqueeRow
                items={expertise}
                className="bg-white border-y border-black"
                textClassName="text-white [-webkit-text-stroke:2px_black]"
                separatorColor="text-black/50"
                reverse={true}
            />
            {/* Services Row (Black BG, White Text) */}
            <MarqueeRow
                items={services}
                className="bg-black border-t border-white/10"
                textClassName="text-white"
            />
        </div>
    );
}
