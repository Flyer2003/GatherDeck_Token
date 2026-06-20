"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { 
  Settings, 
  LogOut 
} from "lucide-react";

export default function ProfileSidebar() {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded || !user) {
    return (
      <div className="w-64 shrink-0 hidden lg:block p-6 rounded-2xl border border-[#363A3D] bg-[#131619] animate-pulse">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-[#1A1D21] rounded-full"></div>
          <div className="space-y-2">
            <div className="w-24 h-4 bg-[#1A1D21] rounded"></div>
            <div className="w-32 h-3 bg-[#1A1D21] rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const email = user.primaryEmailAddress?.emailAddress;
  const fullName = user.fullName || email?.split('@')[0] || "User";

  const navItems = [
    { name: "Account Settings", href: "/account", icon: Settings },
  ];

  return (
    <div className="w-64 shrink-0 hidden lg:flex flex-col rounded-2xl border border-[#363A3D] bg-[#131619] overflow-hidden sticky top-24 h-fit">
      
      {/* Profile Header */}
      <div className="p-6 border-b border-[#363A3D]">
        <div className="flex items-center gap-4">
          <Image
            src={user.imageUrl}
            alt={fullName}
            width={48}
            height={48}
            className="rounded-full object-cover border border-[#363A3D]"
          />
          <div className="flex flex-col overflow-hidden">
            <span className="font-semibold text-white truncate text-base">{fullName}</span>
            <span className="text-xs text-dark-600 truncate">{email}</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive 
                  ? "bg-green-500/10 text-green-500" 
                  : "text-gray-400 hover:bg-[#1A1D21] hover:text-white"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-green-500" : "text-dark-600"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[#363A3D]">
        <button
          onClick={() => signOut({ redirectUrl: "/" })}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>

    </div>
  );
}
