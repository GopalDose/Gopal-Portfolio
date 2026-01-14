"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import {
    SiCplusplus, SiPython, SiJavascript, SiTypescript, SiPhp,
    SiHtml5, SiCss3, SiReact, SiNextdotjs, SiNodedotjs, SiExpress,
    SiDotnet, SiDjango, SiSpringboot, SiMysql, SiString, SiPostgresql,
    SiFlutter, SiAndroid, SiMongodb
} from "react-icons/si";
import { FaJava, FaDatabase, FaNetworkWired, FaServer, FaSearch } from "react-icons/fa";
import { TbSeo } from "react-icons/tb";
import { AiOutlineTeam } from "react-icons/ai";

const SKILL_CATEGORIES = [
    {
        name: "Web Technologies",
        radius: 350,
        duration: 70,
        items: [
            { icon: SiHtml5, name: "HTML" },
            { icon: SiCss3, name: "CSS" },
            { icon: SiReact, name: "React.js" },
            { icon: SiNextdotjs, name: "Next.js" },
            { icon: SiNodedotjs, name: "Node.js" },
            { icon: SiExpress, name: "Express.js" },
            { icon: SiDotnet, name: "ASP.NET" },
            { icon: SiDjango, name: "Django" },
            { icon: SiSpringboot, name: "Spring Boot" },
        ],
    },
    {
        name: "Languages & Databases",
        radius: 250,
        duration: 60,
        items: [
            { icon: SiCplusplus, name: "C++" },
            { icon: FaJava, name: "Java" },
            { icon: SiPython, name: "Python" },
            { icon: SiJavascript, name: "JavaScript" },
            { icon: SiTypescript, name: "TypeScript" },
            { icon: SiPhp, name: "PHP" },
            { icon: SiMysql, name: "MySQL" },
            { icon: SiMongodb, name: "MongoDB" },
            { icon: SiPostgresql, name: "PostgreSQL" },
        ],
    },
    {
        name: "Mobile, Core & Other",
        radius: 150,
        duration: 50,
        items: [
            { icon: SiFlutter, name: "Flutter" },
            { icon: SiAndroid, name: "Android" },
            { icon: FaServer, name: "OS" },
            { icon: FaDatabase, name: "DBMS" },
            { icon: FaNetworkWired, name: "CN" },
            { icon: TbSeo, name: "SEO" },
            { icon: AiOutlineTeam, name: "Cooperative Web Management" },
        ],
    },
];

export default function Skills() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            SKILL_CATEGORIES.forEach((category, index) => {
                const ring = `.ring-${index}`;
                const items = `.item-group-${index}`;

                // Rotate ring
                gsap.to(ring, {
                    rotation: 360,
                    duration: category.duration,
                    repeat: -1,
                    ease: "none",
                });

                // Counter-rotate items relative to their current start angle
                gsap.to(items, {
                    rotation: "-=360",
                    duration: category.duration,
                    repeat: -1,
                    ease: "none",
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="pt-32 pb-24 overflow-hidden relative min-h-screen flex flex-col items-center justify-center bg-white cursor-crosshair">

            {/* Section Title */}
            <div className="absolute top-16 z-10 text-center pointer-events-none select-none w-full">
                <h2 className="text-4xl md:text-7xl font-bold font-[family-name:var(--font-family-media)] tracking-tighter mb-4 text-black">
                    Creative Arsenal
                </h2>
                <p className="text-lg text-gray-500 font-[family-name:var(--font-family-sans)] max-w-md mx-auto">
                    The tools and technologies I use to bring ideas to life.
                </p>
            </div>

            {/* Orbit Container */}
            <div className="relative flex items-center justify-center w-[800px] h-[800px] scale-[0.55] sm:scale-75 md:scale-95 lg:scale-100 transition-transform duration-500 mt-24">
                {/* Central "Core" Doodle */}
                <div className="absolute z-20 flex items-center justify-center pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center animate-bounce shadow-xl border-2 border-black p-3">
                        <Image src="/assets/create_doodle.png" alt="Creative Doodle" width={100} height={100} className="w-full h-full object-contain" />
                    </div>
                </div>

                {SKILL_CATEGORIES.map((category, catIndex) => (
                    <div
                        key={category.name}
                        className={`ring-${catIndex} absolute border border-dashed border-gray-400 flex items-center justify-center`}
                        style={{
                            width: category.radius * 2,
                            height: category.radius * 2,
                            borderRadius: catIndex === 0 ? '45% 55% 40% 60% / 55% 45% 60% 40%' : catIndex === 1 ? '60% 40% 55% 45% / 40% 60% 45% 55%' : '50% 50% 45% 55% / 55% 45% 50% 50%',
                        }}
                    >
                        {category.items.map((item, skillIndex) => {
                            const totalSkills = category.items.length;
                            const angle = (skillIndex / totalSkills) * 360;
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.name}
                                    className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center"
                                    style={{
                                        transform: `rotate(${angle}deg) translateY(-${category.radius}px)`,
                                    }}
                                >
                                    {/* The Item wrapper that gets counter-rotated */}
                                    <div
                                        className={`item-group-${catIndex} bg-white p-3 rounded-full border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer group relative`}
                                        style={{
                                            transform: `rotate(-${angle}deg)`
                                        }}
                                        title={item.name}
                                    >
                                        <Icon className="text-2xl md:text-3xl text-black" />

                                        {/* Optional Tooltip on Hover */}
                                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                            {item.name}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </section>
    );
}
