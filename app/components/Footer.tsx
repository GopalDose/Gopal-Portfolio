"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GoArrowUp } from "react-icons/go";
import { FiX } from "react-icons/fi";

export default function Footer() {
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const currentYear = new Date().getFullYear();

    const closeModal = () => {
        setShowPrivacy(false);
        setShowTerms(false);
        document.body.style.overflow = '';
    };

    const openPrivacy = () => {
        setShowPrivacy(true);
        document.body.style.overflow = 'hidden';
    };

    const openTerms = () => {
        setShowTerms(true);
        document.body.style.overflow = 'hidden';
    };

    return (
        <>
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

                    {/* Bottom Section: Copyright */}
                    <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm font-[family-name:var(--font-family-sans)]">
                        <p>&copy; {currentYear} Gopal Dose. All rights reserved.</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <button onClick={openPrivacy} className="hover:text-white transition-colors">Privacy Policy</button>
                            <button onClick={openTerms} className="hover:text-white transition-colors">Terms of Service</button>
                        </div>
                    </div>

                </div>
            </footer>

            {/* Privacy Policy Modal */}
            {showPrivacy && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeModal}>
                    <div className="bg-white text-black rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-2xl font-bold font-[family-name:var(--font-family-media)]">Privacy Policy</h2>
                            <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <FiX className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 md:p-8 space-y-6 font-[family-name:var(--font-family-sans)]">
                            <div>
                                <p className="text-sm text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            
                            <section>
                                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-family-media)]">1. Introduction</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Welcome to Gopal Dose's portfolio website. I am committed to protecting your privacy and ensuring you have a positive experience on my website. This Privacy Policy explains how I collect, use, and safeguard your information when you visit my portfolio site.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-family-media)]">2. Information I Collect</h3>
                                <p className="text-gray-700 leading-relaxed mb-2">
                                    I may collect the following types of information:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                    <li>Contact information (name, email address) when you submit forms</li>
                                    <li>Usage data and analytics to improve website performance</li>
                                    <li>Cookies and similar tracking technologies</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-family-media)]">3. How I Use Your Information</h3>
                                <p className="text-gray-700 leading-relaxed mb-2">
                                    I use the information collected to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                    <li>Respond to your inquiries and provide requested services</li>
                                    <li>Improve and optimize my website experience</li>
                                    <li>Send you updates about my work (with your consent)</li>
                                    <li>Analyze website usage and trends</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-family-media)]">4. Data Security</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    I implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-family-media)]">5. Your Rights</h3>
                                <p className="text-gray-700 leading-relaxed mb-2">
                                    You have the right to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                    <li>Access your personal information</li>
                                    <li>Request correction of inaccurate data</li>
                                    <li>Request deletion of your personal information</li>
                                    <li>Opt-out of communications</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-family-media)]">6. Contact Me</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    If you have any questions about this Privacy Policy, please contact me at <a href="mailto:gopaldose12345@gmail.com" className="text-orange-500 hover:underline">gopaldose12345@gmail.com</a>.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            )}

            {/* Terms of Service Modal */}
            {showTerms && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeModal}>
                    <div className="bg-white text-black rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-2xl font-bold font-[family-name:var(--font-family-media)]">Terms of Service</h2>
                            <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <FiX className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 md:p-8 space-y-6 font-[family-name:var(--font-family-sans)]">
                            <div>
                                <p className="text-sm text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            
                            <section>
                                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-family-media)]">1. Acceptance of Terms</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    By accessing and using this portfolio website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use this website.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-family-media)]">2. Use License</h3>
                                <p className="text-gray-700 leading-relaxed mb-2">
                                    Permission is granted to temporarily view the materials on this website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                    <li>Modify or copy the materials</li>
                                    <li>Use the materials for any commercial purpose or for any public display</li>
                                    <li>Attempt to reverse engineer any software contained on the website</li>
                                    <li>Remove any copyright or other proprietary notations from the materials</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-family-media)]">3. Intellectual Property</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    All content, including but not limited to text, graphics, logos, images, and software, is the property of Gopal Dose and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without explicit written permission.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-family-media)]">4. Disclaimer</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    The materials on this website are provided on an 'as is' basis. Gopal Dose makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-family-media)]">5. Limitations</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    In no event shall Gopal Dose or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-family-media)]">6. Revisions</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Gopal Dose may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-family-media)]">7. Contact Information</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    If you have any questions about these Terms of Service, please contact me at <a href="mailto:gopaldose12345@gmail.com" className="text-orange-500 hover:underline">gopaldose12345@gmail.com</a>.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
