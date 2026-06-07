import Link from "next/link"
import Navbar from "@/components/Navbar"
import Reveal from "@/components/Reveal"
import dynamic from "next/dynamic"
import { PrivacyPolicyModal } from "@/components/PrivacyPolicyModal"

// Lazy load below-the-fold components
const EventCarousel = dynamic(() => import("@/components/EventCarousel"))
const Testimonials = dynamic(() => import("@/components/Testimonials"))
const FAQ = dynamic(() => import("@/components/FAQ"))
import Footer from "@/components/Footer"

export const metadata = {
  title: "GatherDeck – Event Planners & Venues in Kochi, Trivandrum, Kozhikode",
  description:
    "GatherDeck is Kerala's premium event vendor marketplace to book event managers, catering services, venues, and event requirements across Kochi, Trivandrum, Thrissur and Kozhikode.",
  alternates: {
    canonical: "/",
  },
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
      <section className="container mx-auto px-6 py-16 md:py-24 relative z-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose GatherDeck in Kerala?</h2>
            <p className="text-dark-600">
              GatherDeck simplifies the event planning process. Whether you are in Kochi, Trivandrum, Kozhikode or Thrissur, find the perfect professionals to make your event extraordinary. From elegant weddings to grand corporate events, we bring the best vendors directly to you.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <Reveal>
            <div className="h-full p-8 rounded-2xl bg-[#1A1D21] border border-[#363A3D] hover:border-green-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(34,197,94,0.1)]">
              <h3 className="text-xl font-bold tracking-tight text-white">Verified Vendors</h3>
              <p className="mt-4 text-dark-600 leading-relaxed">
                We strict-vet trusted event managers, premium venues, caterers, and decorators ensuring top-notch quality for your special day.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="h-full p-8 rounded-2xl bg-[#1A1D21] border border-[#363A3D] hover:border-green-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(34,197,94,0.1)]">
              <h3 className="text-xl font-bold tracking-tight text-white">Simple Booking</h3>
              <p className="mt-4 text-dark-600 leading-relaxed">
                Connect and book your entire event seamlessly through our mobile-first, intuitive dashboard without any hidden charges.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="h-full p-8 rounded-2xl bg-[#1A1D21] border border-[#363A3D] hover:border-green-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(34,197,94,0.1)]">
              <h3 className="text-xl font-bold tracking-tight text-white">All Event Types</h3>
              <p className="mt-4 text-dark-600 leading-relaxed">
                Specializing in luxury weddings, corporate summits, birthday parties, and unforgettable celebrations across Kerala.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EVENT SHOWCASE */}
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-6">

        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 md:mb-16">
            Events Organized by Our Vendors
          </h2>
        </Reveal>

        <EventCarousel />

      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* FAQ SECTION */}
      <FAQ />

      {/* FINAL CTA */}
      <section className="container mx-auto px-6 py-20 md:py-28">

        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-[#363A3D] bg-[#1A1D21] p-10 md:p-16 text-center">

            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-blue-500/10"></div>

            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-green-500/10 blur-[120px] rounded-full"></div>

            <div className="relative z-10">

              <span className="inline-flex items-center rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400 mb-6">
                Ready to Plan Your Event?
              </span>

              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Start Planning Your
                <span className="block text-green-400 mt-2">
                  Dream Event Today
                </span>
              </h2>

              <p className="mt-6 max-w-2xl mx-auto text-dark-600 text-lg leading-relaxed">
                Discover trusted event managers, caterers, venues, decorators
                and entertainment partners across Kerala. Book confidently and
                create unforgettable experiences with GatherDeck.
              </p>

              <Link
                href="/register"
                className="inline-flex items-center justify-center mt-10 rounded-xl bg-green-500 px-12 py-4 text-lg font-bold text-black hover:bg-green-400 hover:scale-[1.03] transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.25)] hover:shadow-[0_0_40px_rgba(34,197,94,0.5)]"
              >
                Get Started
              </Link>

            </div>

          </div>
        </Reveal>

      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  )
}