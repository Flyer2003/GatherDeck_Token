import Link from "next/link"
import Navbar from "@/components/Navbar"
import Reveal from "@/components/Reveal"
import dynamic from "next/dynamic"

// Lazy load below-the-fold components
const EventCarousel = dynamic(() => import("@/components/EventCarousel"))
const Testimonials = dynamic(() => import("@/components/Testimonials"))

export const metadata = {
  title: "GatherDeck – Book Event Vendors, Venues & Catering",
  description:
    "GatherDeck is an event vendor marketplace to book event managers, catering services, venues, and event requirements.",
}

export default async function LandingPage() {

  /* Optional: redirect logged in users to dashboard */

  return (
    <main className="bg-dark-200 text-white overflow-x-hidden relative">

      <Navbar />

      {/* FLOATING GRADIENTS */}
      <div className="absolute top-40 -left-20 w-96 h-96 bg-green-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-40 -right-20 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full"></div>

      {/* HERO */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">

        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src="/assets/hero/GD_Logo.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-dark-200 to-transparent"></div>

        <Reveal>
          <div className="relative text-center max-w-5xl px-6">

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Book Trusted Event Vendors
              <span className="block text-green-400">
                For Every Occasion
              </span>
            </h1>

            <p className="mt-6 text-lg text-dark-600 max-w-2xl mx-auto">
              Discover event managers, caterers, venues and everything
              needed to create unforgettable celebrations.
            </p>

            <Link
              href="/register"
              className="inline-block mt-10 rounded-xl bg-green-500 px-10 py-4 text-lg font-semibold text-black hover:bg-green-400 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
            >
              Start Booking
            </Link>

          </div>
        </Reveal>

      </section>

      {/* FEATURES */}
      <section className="container mx-auto px-6 py-24 grid md:grid-cols-3 gap-8 text-center relative z-10">

        <Reveal>
          <div className="h-full p-8 rounded-2xl bg-[#1A1D21] border border-[#363A3D] hover:border-green-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(34,197,94,0.1)]">
            <h3 className="text-xl font-bold tracking-tight text-white">Verified Vendors</h3>
            <p className="mt-4 text-dark-600 leading-relaxed">
              Trusted event managers and venues verified for quality.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="h-full p-8 rounded-2xl bg-[#1A1D21] border border-[#363A3D] hover:border-green-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(34,197,94,0.1)]">
            <h3 className="text-xl font-bold tracking-tight text-white">Simple Booking</h3>
            <p className="mt-4 text-dark-600 leading-relaxed">
              Book your entire event seamlessly through one intuitive platform.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="h-full p-8 rounded-2xl bg-[#1A1D21] border border-[#363A3D] hover:border-green-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(34,197,94,0.1)]">
            <h3 className="text-xl font-bold tracking-tight text-white">All Event Types</h3>
            <p className="mt-4 text-dark-600 leading-relaxed">
              Weddings, corporate events and unforgettable celebrations.
            </p>
          </div>
        </Reveal>

      </section>

      {/* EVENT SHOWCASE */}
      <section className="py-24 container mx-auto px-6">

        <Reveal>
          <h2 className="text-3xl font-bold text-center mb-16">
            Events Organized by Our Vendors
          </h2>
        </Reveal>

        <EventCarousel />

      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* FINAL CTA */}
      <section className="container mx-auto px-6 py-28 text-center">

        <Reveal>

          <h2 className="text-4xl font-bold">
            Start Planning Your Event Today
          </h2>

          <p className="mt-6 text-dark-600">
            Discover trusted vendors instantly.
          </p>

          <Link
            href="/register"
            className="inline-block mt-10 rounded-xl bg-green-500 px-12 py-4 text-lg font-semibold text-black hover:bg-green-400 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:shadow-[0_0_40px_rgba(34,197,94,0.5)]"
          >
            Get Started
          </Link>

        </Reveal>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-dark-400 py-10 text-center">

        <p className="text-dark-600 text-sm">
          © 2025 GatherDeck
        </p>

        <div className="flex justify-center gap-6 mt-4 text-sm text-dark-600">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy</a>
        </div>

      </footer>

    </main>
  )
}