"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useUser, useClerk } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  CalendarDays, 
  Settings, 
  LogOut 
} from "lucide-react";

export default function CustomUserMenu() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate position on open or window resize
  const updatePosition = () => {
    if (buttonRef.current && isOpen) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = 280; // w-72 approx 288px, matching Tailwind
      setMenuPosition({
        top: rect.bottom + 12,
        left: rect.right - dropdownWidth,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition);
      return () => {
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition);
      };
    }
  }, [isOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If click is on the button, ignore (handled by button toggle logic)
      if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
        return;
      }
      // If click is outside the menu, close
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Handle keyboard interaction
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (!isLoaded || !user) return null;

  const email = user.primaryEmailAddress?.emailAddress;
  const fullName = user.fullName || email?.split('@')[0] || "User";

  const dropdownMenu = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{ top: menuPosition.top, left: menuPosition.left }}
          className="fixed w-[280px] rounded-2xl border border-[#363A3D] bg-[#131619]/95 backdrop-blur-xl p-2 shadow-2xl z-[9999] origin-top-right dropdown-overlay md:w-72"
        >
          {/* Header info */}
          <div className="flex items-center gap-3 p-3 border-b border-[#363A3D] mb-1">
            <Image
              src={user.imageUrl}
              alt={fullName}
              width={40}
              height={40}
              className="rounded-full object-cover shrink-0"
            />
            <div className="flex flex-col overflow-hidden">
              <span className="font-semibold text-white truncate text-sm">{fullName}</span>
              <span className="text-xs text-dark-600 truncate">{email}</span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-1 py-1">
            <Link 
              href="/dashboard" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:bg-[#1A1D21] hover:text-white transition-colors"
              role="menuitem"
            >
              <CalendarDays className="w-4 h-4 text-dark-600" />
              My Bookings
            </Link>
            <Link 
              href="/account" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:bg-[#1A1D21] hover:text-white transition-colors"
              role="menuitem"
            >
              <Settings className="w-4 h-4 text-dark-600" />
              Account Settings
            </Link>
            
            <div className="h-[1px] w-full bg-[#363A3D] my-1" />
            
            <button 
              onClick={() => signOut({ redirectUrl: "/" })}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors text-left"
              role="menuitem"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center rounded-full border border-[#363A3D] bg-[#131619] p-0.5 hover:border-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-[#131619]"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Image
          src={user.imageUrl}
          alt={fullName}
          width={36}
          height={36}
          className="rounded-full object-cover"
        />
      </button>

      {mounted && createPortal(dropdownMenu, document.body)}
    </>
  );
}
