"use client";

import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import { AWARDS } from "../data/awards";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AwardsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLHeadingElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animations
      if (watermarkRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
      }

      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
        );
      }

      if (descriptionRef.current) {
        gsap.fromTo(
          descriptionRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.4 }
        );
      }

      // Award cards animations
      const awardCards = document.querySelectorAll(".award-card-item");
      awardCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            delay: index * 0.08,
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section with Watermark Heading */}
      <section ref={heroRef} className="relative w-full bg-white min-h-[50vh] md:h-[70vh] flex items-center px-4 sm:px-8 md:px-16 py-12 md:py-0 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto relative z-10">
          {/* Watermark Heading */}
          <div className="relative mb-8 md:mb-12 z-0">
            {/* Light grey watermark text */}
            <h1
              ref={watermarkRef}
              className="text-5xl sm:text-6xl md:text-8xl lg:text-[12rem] font-bold font-[family-name:var(--font-family-media)] text-gray-300 absolute -top-4 sm:-top-6 md:-top-8 lg:-top-16 left-0 select-none pointer-events-none uppercase z-0 leading-none"
              style={{ zIndex: 0 }}
            >
              AWARDS
            </h1>
            {/* Main heading overlaying the watermark */}
            <h2
              ref={headingRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-[family-name:var(--font-family-media)] text-black relative z-10 pt-6 sm:pt-8 md:pt-12 lg:pt-16"
            >
              Honors & Awards
            </h2>
          </div>

          {/* Description Section */}
          <div ref={descriptionRef} className="relative z-10 max-w-3xl">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 font-[family-name:var(--font-family-sans)] leading-relaxed">
              Recognition of achievements and excellence in competitions,
              hackathons, and technical challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Awards Grid Section */}
      <section
        ref={containerRef}
        className="relative w-full bg-white py-10 px-8 md:px-16 z-10"
      >
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {AWARDS.map((award, index) => (
                  <div
                    key={index}
                    className={`award-card-item group relative ${
                      index % 2 === 1 ? "mt-12 md:mt-16" : ""
                    }`}
                  >
                    <div className="aspect-square bg-white border border-gray-100 hover:border-gray-300 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                      {/* Image Thumbnail */}
                      {award.image ? (
                        <div className="w-full h-2/3 overflow-hidden bg-gray-100">
                          <Image
                            src={award.image}
                            alt={award.teamName || award.title}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-2/3 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                          <div className="text-4xl font-bold text-gray-300 font-[family-name:var(--font-family-media)]">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Award Title */}
                          <h3 className="text-lg md:text-xl font-bold font-[family-name:var(--font-family-media)] text-black mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                            {award.title}
                          </h3>

                          {/* Issuer */}
                          {award.issuer && (
                            <p className="text-xs md:text-sm text-gray-500 font-[family-name:var(--font-family-sans)] mb-2 line-clamp-1">
                              {award.issuer}
                            </p>
                          )}

                          {/* Team Name */}
                          {award.teamName && (
                            <p className="text-xs md:text-sm text-gray-700 font-medium font-[family-name:var(--font-family-sans)]">
                              Team:{" "}
                              <span className="text-gray-900">
                                {award.teamName}
                              </span>
                            </p>
                          )}
                        </div>

                        {/* Date */}
                        {award.date && (
                          <p className="text-xs text-gray-400 font-[family-name:var(--font-family-sans)] mt-2">
                            {award.date}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
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
