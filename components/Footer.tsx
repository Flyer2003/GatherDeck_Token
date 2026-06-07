import Link from "next/link";
import Image from "next/image";
import { PrivacyPolicyModal } from "@/components/PrivacyPolicyModal";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#0B0E12]">
      {/* Main Footer */}
      <div className="container mx-auto max-w-7xl px-6 py-16">

        <div className="grid grid-cols-12 gap-8">

          {/* Brand */}
          <div className="col-span-12 lg:col-span-5">

            <Link href="/" className="inline-block">
              <Image
                src="/assets/icons/GatherDeck.svg"
                alt="GatherDeck logo"
                width={220}
                height={60}
                priority
                className="h-12 w-auto"
              />
            </Link>

            <p className="mt-6 max-w-md text-sm leading-8 text-gray-400">
              Kerala's premium marketplace for booking event planners,
              venues, caterers, decorators and event services.
              Plan weddings, corporate events and celebrations
              effortlessly.
            </p>

          </div>

          {/* Cities */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">

            <h3 className="text-lg font-semibold text-white mb-6">
              Top Cities
            </h3>

            <ul className="space-y-4 text-sm text-gray-400">

              <li>
                <Link
                  href="/city/kochi"
                  className="hover:text-green-400 transition-colors"
                >
                  Event Planners in Kochi
                </Link>
              </li>

              <li>
                <Link
                  href="/city/trivandrum"
                  className="hover:text-green-400 transition-colors"
                >
                  Event Planners in Trivandrum
                </Link>
              </li>

              <li>
                <Link
                  href="/city/kozhikode"
                  className="hover:text-green-400 transition-colors"
                >
                  Event Planners in Kozhikode
                </Link>
              </li>

              <li>
                <Link
                  href="/city/thrissur"
                  className="hover:text-green-400 transition-colors"
                >
                  Event Planners in Thrissur
                </Link>
              </li>

            </ul>

          </div>

          {/* Legal */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-2">

            <h3 className="text-lg font-semibold text-white mb-6">
              Legal
            </h3>

            <PrivacyPolicyModal>
              <button className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                Privacy Policy
              </button>
            </PrivacyPolicyModal>

          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">

        <div className="container mx-auto max-w-7xl px-6 py-6">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} GatherDeck. All rights reserved.
            </p>

            <PrivacyPolicyModal>
              <button className="text-sm text-gray-500 hover:text-green-400 transition-colors">
                Privacy Policy
              </button>
            </PrivacyPolicyModal>

          </div>

        </div>

      </div>
    </footer>
  );
}