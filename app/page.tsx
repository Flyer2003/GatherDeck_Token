import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "GatherDeck – Book Event Vendors, Venues & Catering",
  description:
    "GatherDeck is an event vendor marketplace to book event managers, catering services, venues, and event requirements for weddings, corporate events, and celebrations.",
};

export default function LandingPage() {
  return (
    <main className="bg-dark-200 text-white">

      {/* ================= NAVBAR ================= */}
      <header className="container mx-auto px-6 py-6 flex justify-between items-center">
        <Image
          src="/assets/icons/GatherDeck.svg"
          alt="GatherDeck logo"
          width={160}
          height={40}
        />

        <Link
          href="/login"
          className="rounded-lg bg-green-500 px-6 py-2 font-medium text-black"
        >
          Start Booking
        </Link>
      </header>

      {/* ================= HERO ================= */}
      <section className="container mx-auto px-6 py-24 text-center max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Book Trusted Event Vendors for Every Occasion
        </h1>

        <p className="mt-6 text-lg text-dark-600">
          Find event managers, caterers, venues, and complete event services for
          weddings, corporate events, and celebrations — all in one place.
        </p>

        <Link
          href="/login"
          className="inline-block mt-10 rounded-xl bg-green-500 px-10 py-4 text-lg font-semibold text-black"
        >
          Start Booking
        </Link>
      </section>

      {/* ================= DETAILS SECTION ================= */}
      <section className="container mx-auto px-6 py-20 grid md:grid-cols-3 gap-10 text-center">
        <div>
          <h3 className="text-xl font-semibold">Verified Vendors</h3>
          <p className="mt-2 text-dark-600">
            Trusted event managers, caterers, and venues.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Simple Booking</h3>
          <p className="mt-2 text-dark-600">
            Tell us your event needs and we handle the rest.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">All Event Types</h3>
          <p className="mt-2 text-dark-600">
            Weddings, corporate events, parties, and more.
          </p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-10 text-center text-dark-600">
        © 2025 GatherDeck
      </footer>

      {/* ================= STRUCTURED DATA ================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "GatherDeck Event Booking Platform",
            provider: {
              "@type": "Organization",
              name: "GatherDeck",
              url: "https://gatherdeck.vercel.app",
            },
            serviceType: "Event Vendor Booking",
            areaServed: "IN",
          }),
        }}
      />
    </main>
  );
}
