import Link from "next/link";
import React from "react";

export default function Header() {
  const navItems = [
    { name: "Home", href: "#" },
    { name: "My Works", href: "#" },
    { name: "Case Studies", href: "#" },
    { name: "Moodboard", href: "#" },
    { name: "Psychology", href: "#" },
    { name: "Courses", href: "#" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-white/80 backdrop-blur-md md:px-16">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-tight text-black">
        GD<span className="text-orange-400">.</span>
      </div>

      {/* Navigation */}
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

      {/* Action */}
      <button className="hidden md:block px-6 py-2 text-sm font-medium text-black border border-gray-300 rounded-lg hover:bg-black hover:text-white transition-all cursor-pointer">
        Log In
      </button>

      {/* Mobile Menu Button (Placeholder) */}
      <button className="md:hidden text-black">
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
      </button>
    </header>
  );
}
