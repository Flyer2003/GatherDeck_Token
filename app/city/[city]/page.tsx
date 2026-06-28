import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Link from "next/link";
import { notFound } from "next/navigation";

// Only specific cities are supported
const supportedCities = ["kochi", "trivandrum", "kozhikode", "thrissur"];

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function generateMetadata({
  params,
}: {
  params: { city: string };
}): Promise<Metadata> {
  const city = params.city.toLowerCase();

  if (!supportedCities.includes(city)) {
    return { title: "City Not Found" };
  }

  const cityName = capitalizeFirstLetter(city);

  return {
    title: `Best Event Planners & Venues in ${cityName} | gatherdeck`,
    description: `Find and book the top verified event managers, caterers, venues, and decorators in ${cityName}, Kerala. gatherdeck makes event planning in ${cityName} easy and seamless.`,
    alternates: {
      canonical: `https://www.gatherdeck.in/city/${city}`,
    },
  };
}

export default function CityPage({ params }: { params: { city: string } }) {
  const city = params.city.toLowerCase();

  if (!supportedCities.includes(city)) {
    notFound();
  }

  const cityName = capitalizeFirstLetter(city);

  return (
    <div className="bg-dark-200 min-h-screen">
      <Navbar />

      <main className="container mx-auto px-6 py-24 min-h-screen">
        <Breadcrumbs
          items={[
            { label: "Cities", href: "#" },
            { label: `Event Planners in ${cityName}`, href: `/city/${city}` },
          ]}
        />

        <div className="mt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Top Event Vendors in <span className="text-green-400">{cityName}</span>
          </h1>
          <p className="text-lg text-dark-600 max-w-2xl mb-10">
            Planning a wedding, corporate event, or birthday party in {cityName}?
            Discover GatheringDeck's premium list of verified event managers,
            luxurious venues, expert decorators, and delicious catering services operating in {cityName}, Kerala.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1A1D21] border border-[#363A3D] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Why Book in {cityName}?</h2>
              <ul className="list-disc pl-5 space-y-3 text-dark-600">
                <li>Access to exclusive traditional and modern venues.</li>
                <li>Local vendors who understand the cultural nuances of Kerala events.</li>
                <li>Zero hidden fees—transparent pricing directly from {cityName} service providers.</li>
              </ul>
            </div>

            <div className="bg-[#1A1D21] border border-[#363A3D] rounded-xl p-8 flex flex-col items-center justify-center text-center">
              <h3 className="text-xl font-bold text-white mb-4">Ready to start planning?</h3>
              <Link
                href="/register"
                className="rounded-xl bg-green-500 px-8 py-3 text-base font-bold text-black hover:bg-green-400 hover:scale-[1.02] transition-all"
              >
                Find Vendors Now
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
