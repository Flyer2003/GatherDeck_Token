import Link from "next/link";
import Navbar from "@/components/Navbar";
import EventCarousel from "@/components/EventCarousel";
import Testimonials from "@/components/Testimonials";
import Reveal from "@/components/Reveal";
import VendorGrid from "@/components/VendorGrid";

export const metadata = {
  title: "GatherDeck – Book Event Vendors, Venues & Catering",
  description:
    "GatherDeck is an event vendor marketplace to book event managers, catering services, venues, and event requirements.",
};

export default function LandingPage() {
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
          className="absolute inset-0 w-full h-full object-cover"
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
              href="/login"
              className="inline-block mt-10 rounded-xl bg-green-500 px-10 py-4 text-lg font-semibold text-black"
            >
              Start Booking
            </Link>

          </div>
        </Reveal>

      </section>

      {/* FEATURES */}
      <section className="container mx-auto px-6 py-24 grid md:grid-cols-3 gap-12 text-center">

        <Reveal>
          <div className="p-8 rounded-xl bg-dark-300">
            <h3 className="text-xl font-semibold">Verified Vendors</h3>
            <p className="mt-4 text-dark-600">
              Trusted event managers and venues verified for quality.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="p-8 rounded-xl bg-dark-300">
            <h3 className="text-xl font-semibold">Simple Booking</h3>
            <p className="mt-4 text-dark-600">
              Book your entire event through one platform.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="p-8 rounded-xl bg-dark-300">
            <h3 className="text-xl font-semibold">All Event Types</h3>
            <p className="mt-4 text-dark-600">
              Weddings, corporate events and celebrations.
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
            href="/login"
            className="inline-block mt-10 rounded-xl bg-green-500 px-12 py-4 text-lg font-semibold text-black"
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
  );
}