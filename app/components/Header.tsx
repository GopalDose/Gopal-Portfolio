"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Experience", href: "/experience" },
    { name: "Projects", href: "/projects" },
    { name: "Awards", href: "/awards" },
    { name: "Contact", href: "/contact" },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close menu when route changes
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 bg-white/80 backdrop-blur-md md:px-16">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-xl sm:text-2xl font-bold tracking-tight text-black hover:text-orange-500 transition-colors"
          onClick={handleLinkClick}
        >
          GD<span className="text-orange-400">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Action */}
        <a 
          href="mailto:gopaldose12345@gmail.com" 
          className="hidden md:block px-6 py-2.5 text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-all cursor-pointer shadow-md hover:shadow-lg"
        >
          Get in Touch
        </a>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-black p-2 -mr-2 mobile-menu-container"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[73px] md:hidden z-40 bg-white">
          <nav className="flex flex-col px-6 py-8 space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className="text-lg font-medium text-gray-700 hover:text-black transition-colors py-2 border-b border-gray-100"
              >
                {item.name}
              </Link>
            ))}
            <a 
              href="mailto:gopaldose12345@gmail.com" 
              onClick={handleLinkClick}
              className="mt-4 px-6 py-3 text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-all cursor-pointer shadow-md text-center"
            >
              Get in Touch
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
