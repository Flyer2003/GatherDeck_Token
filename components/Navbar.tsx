"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled
          ? "bg-dark-200/95 backdrop-blur-md border-b border-dark-400"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">

        <Image
          src="/assets/icons/GatherDeck.svg"
          alt="GatherDeck logo"
          width={130}
          height={32}
          priority
        />

        <nav className="flex items-center gap-6">

          <Link
            href="/login"
            className="text-sm font-medium hover:text-green-400"
          >
            Login
          </Link>

          <Link
            href="/login"
            className="rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-black hover:bg-green-400"
          >
            Start Booking
          </Link>

        </nav>
      </div>
    </header>
  );
}