"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GoArrowRight } from "react-icons/go";
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiTwitter, FiInstagram } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const watermarkRef = useRef<HTMLHeadingElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const messageInputRef = useRef<HTMLTextAreaElement>(null);
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const contactInfoRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero section animations
            if (watermarkRef.current) {
                gsap.fromTo(watermarkRef.current,
                    { opacity: 0, y: 30, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
                );
            }

            if (headingRef.current) {
                gsap.fromTo(headingRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
                );
            }

            if (descriptionRef.current) {
                gsap.fromTo(descriptionRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.4 }
                );
            }

            // Form fields animation
            const formFields = [
                nameInputRef.current,
                emailInputRef.current,
                messageInputRef.current
            ].filter(Boolean);

            formFields.forEach((field, index) => {
                if (field) {
                    gsap.fromTo(field,
                        { opacity: 0, x: -30 },
                        {
                            opacity: 1,
                            x: 0,
                            duration: 0.6,
                            ease: "power2.out",
                            delay: 0.6 + index * 0.1
                        }
                    );
                }
            });

            // Submit button animation
            if (submitButtonRef.current) {
                gsap.fromTo(submitButtonRef.current,
                    { opacity: 0, scale: 0.8, y: 20 },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "back.out(1.7)",
                        delay: 1
                    }
                );
            }

            // Contact info animation
            if (contactInfoRef.current) {
                const contactItems = contactInfoRef.current.querySelectorAll(".contact-info-item");
                contactItems.forEach((item, index) => {
                    gsap.fromTo(item,
                        { opacity: 0, x: 30 },
                        {
                            opacity: 1,
                            x: 0,
                            duration: 0.6,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: item,
                                start: "top 85%",
                                toggleActions: "play none none none"
                            },
                            delay: index * 0.1
                        }
                    );
                });
            }

            // Floating particles animation
            const particles = document.querySelectorAll(".floating-particle");
            particles.forEach((particle, index) => {
                gsap.to(particle, {
                    y: "random(-50, 50)",
                    x: "random(-30, 30)",
                    rotation: "random(-180, 180)",
                    duration: "random(3, 6)",
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                    delay: index * 0.2
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Animate input on change
        if (e.target.value.length > 0) {
            gsap.to(e.target, {
                scale: 1.02,
                duration: 0.2,
                yoyo: true,
                repeat: 1
            });
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        gsap.to(e.target, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        gsap.to(e.target, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Button animation on submit
        if (submitButtonRef.current) {
            gsap.to(submitButtonRef.current, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    // Reset form
                    setFormData({ name: "", email: "", message: "" });
                    // Success animation
                    gsap.to(submitButtonRef.current, {
                        scale: 1.1,
                        duration: 0.3,
                        yoyo: true,
                        repeat: 1
                    });
                }
            });
        }
        
        console.log("Form submitted", formData);
    };

    return (
        <main className="min-h-screen bg-white relative overflow-hidden">
            <Header />
            
            {/* Floating Particles Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="floating-particle absolute w-2 h-2 bg-orange-400/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            {/* Hero Section */}
            <section ref={heroRef} className="relative w-full bg-white py-24 md:py-32 px-8 md:px-16 z-10">
                <div className="w-full max-w-7xl mx-auto">
                    {/* Watermark Heading */}
                    <div className="relative mb-12 z-0">
                        <h1 
                            ref={watermarkRef}
                            className="text-8xl md:text-[12rem] font-bold font-[family-name:var(--font-family-media)] text-gray-300 absolute -top-8 md:-top-16 left-0 select-none pointer-events-none uppercase z-0"
                            style={{ zIndex: 0 }}
                        >
                            CONTACT
                        </h1>
                        <h2 
                            ref={headingRef}
                            className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-family-media)] text-black relative z-10 pt-8 md:pt-16"
                        >
                            Get in Touch
                        </h2>
                    </div>

                    {/* Description */}
                    <div ref={descriptionRef} className="relative z-10 max-w-3xl mb-16">
                        <p className="text-xl md:text-2xl text-gray-700 font-[family-name:var(--font-family-sans)] leading-relaxed">
                            Let's collaborate and bring your ideas to life. Whether you have a project in mind or just want to connect, I'd love to hear from you.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section ref={containerRef} className="relative w-full bg-white py-12 md:py-24 px-8 md:px-16 z-10">
                <div className="w-full max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
                        {/* Contact Form */}
                        <div className="relative">
                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                                {/* Name Input */}
                                <div className="relative group">
                                    <label 
                                        htmlFor="name" 
                                        className="block text-sm font-bold mb-3 font-[family-name:var(--font-family-media)] text-black"
                                    >
                                        Name *
                                    </label>
                                    <input
                                        ref={nameInputRef}
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        placeholder="Your name"
                                        required
                                        className="w-full border-b-2 border-gray-300 py-4 focus:outline-none focus:border-orange-500 transition-all duration-300 bg-transparent placeholder-gray-400 font-[family-name:var(--font-family-sans)] text-lg"
                                    />
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-focus-within:w-full transition-all duration-300"></div>
                                </div>

                                {/* Email Input */}
                                <div className="relative group">
                                    <label 
                                        htmlFor="email" 
                                        className="block text-sm font-bold mb-3 font-[family-name:var(--font-family-media)] text-black"
                                    >
                                        Email *
                                    </label>
                                    <input
                                        ref={emailInputRef}
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        placeholder="gopaldose12345@gmail.com"
                                        required
                                        className="w-full border-b-2 border-gray-300 py-4 focus:outline-none focus:border-orange-500 transition-all duration-300 bg-transparent placeholder-gray-400 font-[family-name:var(--font-family-sans)] text-lg"
                                    />
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-focus-within:w-full transition-all duration-300"></div>
                                </div>

                                {/* Message Textarea */}
                                <div className="relative group">
                                    <label 
                                        htmlFor="message" 
                                        className="block text-sm font-bold mb-3 font-[family-name:var(--font-family-media)] text-black"
                                    >
                                        Message *
                                    </label>
                                    <textarea
                                        ref={messageInputRef}
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        rows={6}
                                        placeholder="Tell me about your project..."
                                        required
                                        className="w-full border-b-2 border-gray-300 py-4 focus:outline-none focus:border-orange-500 transition-all duration-300 bg-transparent placeholder-gray-400 font-[family-name:var(--font-family-sans)] text-lg resize-none"
                                    />
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-focus-within:w-full transition-all duration-300"></div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        ref={submitButtonRef}
                                        type="submit"
                                        className="group bg-black text-white px-10 py-4 rounded-full font-bold text-lg flex items-center gap-3 hover:bg-orange-500 transition-all duration-300 font-[family-name:var(--font-family-media)] shadow-lg hover:shadow-xl hover:scale-105"
                                    >
                                        Send Message
                                        <GoArrowRight className="text-xl group-hover:translate-x-2 transition-transform duration-300" />
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div ref={contactInfoRef} className="space-y-8">
                            <div>
                                <h3 className="text-3xl font-bold font-[family-name:var(--font-family-media)] text-black mb-8">
                                    Let's Connect
                                </h3>
                                <p className="text-gray-600 font-[family-name:var(--font-family-sans)] text-lg leading-relaxed mb-12">
                                    Feel free to reach out through any of these channels. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                                </p>
                            </div>

                            {/* Contact Items */}
                            <div className="space-y-6">
                                <div className="contact-info-item group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                                    <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300">
                                        <FiMail className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold font-[family-name:var(--font-family-media)] text-black mb-1">Email</h4>
                                        <a href="mailto:gopaldose12345@gmail.com" className="text-gray-600 font-[family-name:var(--font-family-sans)] hover:text-orange-500 transition-colors">
                                            gopaldose12345@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="contact-info-item group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                                    <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300">
                                        <FiPhone className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold font-[family-name:var(--font-family-media)] text-black mb-1">Phone</h4>
                                        <a href="tel:+918605961162" className="text-gray-600 font-[family-name:var(--font-family-sans)] hover:text-orange-500 transition-colors">
                                            +91 8605961162
                                        </a>
                                    </div>
                                </div>

                                <div className="contact-info-item group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                                    <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300">
                                        <FiMapPin className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold font-[family-name:var(--font-family-media)] text-black mb-1">Location</h4>
                                        <p className="text-gray-600 font-[family-name:var(--font-family-sans)]">
                                            Pune, Maharashtra, India
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="pt-8">
                                <h4 className="font-bold font-[family-name:var(--font-family-media)] text-black mb-4">Follow Me</h4>
                                <div className="flex gap-4">
                                    {[
                                        { icon: FiGithub, href: "https://github.com/GopalDose", label: "GitHub" },
                                        { icon: FiLinkedin, href: "https://www.linkedin.com/in/gopaldose21 ", label: "LinkedIn" },
                                        { icon: FiInstagram, href: "https://www.instagram.com/gopaldose", label: "Instagram" },
                                        { icon: FiTwitter, href: "https://twitter.com/dose_gopal", label: "Twitter" }
                                    ].map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-orange-500 hover:scale-110 transition-all duration-300 group"
                                            aria-label={social.label}
                                        >
                                            <social.icon className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back to Home Link */}
                    <div className="mt-20 text-center">
                        <Link
                            href="/"
                            className="group inline-flex items-center gap-3 px-6 py-3 transition-all duration-300 font-[family-name:var(--font-family-sans)] border border-gray-200 rounded-full hover:border-black hover:bg-black hover:text-white text-gray-600"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                                />
                            </svg>
                            <span className="font-medium">Back to Home</span>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

