"use client";

import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import CustomUserMenu from "./CustomUserMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass =
    "text-sm font-medium text-gray-300 hover:text-white transition-colors";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-300 ${scrolled
        ? "bg-dark-200/95 backdrop-blur-md border-dark-400"
        : "bg-transparent border-transparent"
        }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/icons/gatherdeck1.svg"
            alt="gatherdeck Logo"
            width={280}
            height={63}
            priority
          />
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className={navLinkClass}>
            Home
          </Link>

          <SignedIn>
            <Link href="/dashboard" className={navLinkClass}>
              Dashboard
            </Link>
          </SignedIn>

          <SignedOut>
            <Link href="/sign-in" className={navLinkClass}>
              Login
            </Link>

            <Link
              href="/sign-up"
              className="rounded-xl bg-green-500 px-5 py-2.5 text-sm font-bold text-black hover:bg-green-400 transition-all"
            >
              Start Booking
            </Link>
          </SignedOut>

          <SignedIn>
            <CustomUserMenu />
          </SignedIn>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-dark-200/98 backdrop-blur-xl border-t border-dark-400">
          <nav className="flex flex-col px-6 py-4 gap-4">
            <Link
              href="/"
              className={navLinkClass}
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>

            <SignedIn>
              {/* Mobile variant renders user info + Dashboard + Account + Sign Out inline */}
              <CustomUserMenu
                variant="mobile"
                onNavigate={() => setMobileOpen(false)}
              />
            </SignedIn>

            <SignedOut>
              <Link
                href="/sign-in"
                className={navLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>

              <Link
                href="/sign-up"
                className="rounded-xl bg-green-500 px-4 py-3 text-center font-semibold text-black"
                onClick={() => setMobileOpen(false)}
              >
                Start Booking
              </Link>
            </SignedOut>
          </nav>
        </div>
      )}
    </header>
  );
}