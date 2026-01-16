"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { FiArrowUpRight, FiSend } from "react-icons/fi"; // Using FiSend or standard Arrow
import { GoArrowRight } from "react-icons/go"; // Or simple arrow
import gsap from "gsap";



export default function Contact() {
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isSubmitting) return;

        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            // Success
            setSubmitStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
            setFormData({ name: "", email: "", message: "" });

            // Clear success message after 5 seconds
            setTimeout(() => {
                setSubmitStatus({ type: null, message: '' });
            }, 5000);

        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus({ 
                type: 'error', 
                message: error instanceof Error ? error.message : 'Failed to send message. Please try again.' 
            });

            // Clear error message after 5 seconds
            setTimeout(() => {
                setSubmitStatus({ type: null, message: '' });
            }, 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="bg-white py-24 px-4 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
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
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Hello..."
                                required
                                className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400 font-[family-name:var(--font-family-sans)]"
                            />
                        </div>
                        <div className="relative group text-black">
                            <label htmlFor="email" className="block text-sm font-bold mb-2 font-[family-name:var(--font-family-media)]">Email:*</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Where can i reply"
                                required
                                className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400 font-[family-name:var(--font-family-sans)]"
                            />
                        </div>
                    </div>


                    {/* Message Area */}
                    <div className="relative group text-black">
                        <label htmlFor="message" className="block text-sm font-bold mb-2 font-[family-name:var(--font-family-media)]">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="Tell us about your project..."
                            required
                            className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400 font-[family-name:var(--font-family-sans)] resize-none"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-8 relative">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-black text-white px-10 py-4 rounded-full font-bold text-lg flex items-center gap-2 hover:bg-gray-800 transition-colors duration-300 group font-[family-name:var(--font-family-media)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Me'}
                            {!isSubmitting && <GoArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </div>

                    {/* Status Message */}
                    {submitStatus.type && (
                        <div className={`mt-4 p-4 rounded-lg ${
                            submitStatus.type === 'success' 
                                ? 'bg-green-50 text-green-800 border border-green-200' 
                                : 'bg-red-50 text-red-800 border border-red-200'
                        }`}>
                            <p className="text-sm font-[family-name:var(--font-family-sans)]">
                                {submitStatus.message}
                            </p>
                        </div>
                    )}

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
