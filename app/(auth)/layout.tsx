import { Metadata } from "next"

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-dark-200 min-h-screen text-white flex flex-col relative overflow-x-hidden">
      <Navbar />
      
      {/* FLOATING GRADIENTS */}
      <div className="absolute top-40 -left-20 w-96 h-96 bg-green-500/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-40 -right-20 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full pointer-events-none"></div>

      <main className="flex-1 flex items-center justify-center py-24 px-6 relative z-10 w-full">
        {children}
      </main>

      <Footer />
    </div>
  )
}
