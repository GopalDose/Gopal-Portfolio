"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { FiArrowUpRight, FiSend } from "react-icons/fi"; // Using FiSend or standard Arrow
import { GoArrowRight } from "react-icons/go"; // Or simple arrow
import gsap from "gsap";



export default function Contact() {
    const formRef = useRef<HTMLFormElement>(null);

    // Form submission logic can be expanded here


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle submission logic here
        console.log("Form submitted");
    };

    return (
        <section className="bg-white py-24 px-4 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
            {/* Decorative Doodles/Arrows could go here absolutely positioned */}

            <div className="container mx-auto max-w-4xl relative z-10">
                {/* Header */}
                <div className="text-center mb-16 relative">
                    <h2 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-family-media)] tracking-tight leading-tight">
                        <span className="text-gray-300">Connect</span> <span className="text-black">and let's</span>
                        <br />
                        <span className="relative inline-block">
                            Discuss
                        </span>
                    </h2>
                    <p className="mt-6 text-gray-500 text-lg md:text-xl font-[family-name:var(--font-family-sans)]">
                        Have a nice works? reach out and let's chat.
                    </p>
                </div>

                {/* Form */}
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">

                    {/* Top Row: Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-black">
                        <div className="relative group">
                            <label htmlFor="name" className="block text-sm font-bold mb-2 font-[family-name:var(--font-family-media)]">Name:*</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Hello..."
                                className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400 font-[family-name:var(--font-family-sans)]"
                            />
                        </div>
                        <div className="relative group text-black">
                            <label htmlFor="email" className="block text-sm font-bold mb-2 font-[family-name:var(--font-family-media)]">Email:*</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Where can i reply"
                                className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400 font-[family-name:var(--font-family-sans)]"
                            />
                        </div>
                    </div>


                    {/* Message Area */}
                    <div className="relative group text-black">
                        <label htmlFor="message" className="block text-sm font-bold mb-2 font-[family-name:var(--font-family-media)]">Message</label>
                        <textarea
                            id="message"
                            rows={4}
                            placeholder="Tell us about your project..."
                            className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400 font-[family-name:var(--font-family-sans)] resize-none"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-8 relative">

                        <button
                            type="submit"
                            className="bg-black text-white px-10 py-4 rounded-full font-bold text-lg flex items-center gap-2 hover:bg-gray-800 transition-colors duration-300 group font-[family-name:var(--font-family-media)]"
                        >
                            Send Me
                            <GoArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                </form>
            </div>

            {/* Right side dot pattern decoration */}
            <div className="absolute right-0 top-1/3 hidden lg:block opacity-20 pointer-events-none">
                <svg width="100" height="200" className="text-black fill-current">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <circle key={i} cx={(i % 5) * 20 + 10} cy={Math.floor(i / 5) * 20 + 10} r="2" />
                    ))}
                </svg>
            </div>

        </section>
    );
}
