"use client";

import React from "react";
import Link from "next/link";
import { FaLinkedinIn, FaGithub, FaInstagram, FaDribbble } from "react-icons/fa"; // Importing FontAwesome icons
import { GoArrowUp } from "react-icons/go";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: "LinkedIn", href: "#", icon: <FaLinkedinIn /> },
        { name: "GitHub", href: "#", icon: <FaGithub /> },
        { name: "Instagram", href: "#", icon: <FaInstagram /> },
        { name: "Dribbble", href: "#", icon: <FaDribbble /> },
    ];

    const sitemap = [
        { name: "Home", href: "#" },
        { name: "My Works", href: "#" },
        { name: "Case Studies", href: "#" },
        { name: "About", href: "#" },
    ];

    return (
        <footer className="bg-black text-white pt-20 pb-10 px-6 md:px-12 overflow-hidden relative">
            <div className="container mx-auto max-w-7xl relative z-10">

                {/* Top Section: Main Branding & CTA */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-10">
                    <div>
                        <h2 className="text-6xl md:text-[8rem] font-bold leading-none tracking-tighter font-[family-name:var(--font-family-media)] mb-4">
                            GOPAL DOSE<span className="text-orange-500">.</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-400 font-[family-name:var(--font-family-sans)] max-w-xl">
                            Crafting digital experiences with passion and precision. Let's build something amazing together.
                        </p>
                    </div>

                    {/* Back to Top Button */}
                    <button
                        onClick={scrollToTop}
                        className="group flex flex-col items-center gap-2 hover:text-orange-500 transition-colors duration-300"
                        aria-label="Back to Top"
                    >
                        <span className="p-4 border border-white/20 rounded-full group-hover:border-orange-500 group-hover:bg-orange-500/10 transition-all duration-300">
                            <GoArrowUp className="text-2xl" />
                        </span>
                        <span className="text-sm font-medium tracking-widest uppercase font-[family-name:var(--font-family-sans)]">Back to Top</span>
                    </button>
                </div>

                <hr className="border-white/10 mb-12" />

                {/* Middle Section: Links & Info */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold uppercase tracking-wider text-gray-500 font-[family-name:var(--font-family-sans)]">Contact</h3>
                        <p className="text-2xl font-[family-name:var(--font-family-media)] hover:text-orange-500 transition-colors">
                            <a href="mailto:hello@gopaldose.com">hello@gopaldose.com</a>
                        </p>
                        <p className="text-gray-400 font-[family-name:var(--font-family-sans)]">
                            Pune, India
                        </p>
                    </div>

                    {/* Sitemap */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold uppercase tracking-wider text-gray-500 font-[family-name:var(--font-family-sans)]">Sitemap</h3>
                        <ul className="space-y-2">
                            {sitemap.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-lg text-white hover:text-orange-500 transition-colors font-[family-name:var(--font-family-sans)]">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold uppercase tracking-wider text-gray-500 font-[family-name:var(--font-family-sans)]">Socials</h3>
                        <ul className="space-y-2">
                            {socialLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-lg text-white hover:text-orange-500 transition-colors flex items-center gap-2 font-[family-name:var(--font-family-sans)]">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter / Extra */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold uppercase tracking-wider text-gray-500 font-[family-name:var(--font-family-sans)]">Newsletter</h3>
                        <div className="flex border-b border-white/30 py-2">
                            <input
                                type="email"
                                placeholder="Type your email"
                                className="bg-transparent text-white w-full focus:outline-none placeholder-gray-500 font-[family-name:var(--font-family-sans)]"
                            />
                            <button className="text-white hover:text-orange-500 transition-colors font-[family-name:var(--font-family-media)] uppercase text-sm">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm font-[family-name:var(--font-family-sans)]">
                    <p>&copy; {currentYear} Gopal Dose. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
