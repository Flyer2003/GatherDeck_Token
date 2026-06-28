import Link from "next/link";
import Image from "next/image";
import { PrivacyPolicyModal } from "@/components/PrivacyPolicyModal";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#0B0E12] overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-24 bg-green-500/5 blur-[100px] pointer-events-none" />

      {/* Main Footer */}
      <div className="relative container mx-auto max-w-7xl px-6 py-10 lg:py-12">

        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-12">

          {/* Brand */}
          <div className="flex flex-col lg:max-w-sm">

            <Link href="/" className="inline-flex items-center group w-fit">
              <Image
                src="/assets/icons/gatherdeck2.svg"
                alt="gatherdeck logo"
                width={260}
                height={46}
                priority
                className="h-9 sm:h-10 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md"
              />
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-gray-400 font-light">
              Kerala's premium marketplace for booking event planners,
              venues, caterers, decorators and event services.
              Plan weddings, corporate events and celebrations
              effortlessly.
            </p>

          </div>

          <div className="flex flex-col sm:flex-row gap-10 sm:gap-20 lg:gap-24">
            {/* Cities */}
            <div>

              <h3 className="text-sm font-semibold tracking-wider text-white uppercase mb-4">
                Top Cities
              </h3>

              <ul className="space-y-3 text-sm text-gray-400">

                <li>
                  <Link
                    href="/city/kochi"
                    className="hover:text-green-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/0 group-hover:bg-green-500/50 transition-colors" />
                    Event Planners in Kochi
                  </Link>
                </li>

                <li>
                  <Link
                    href="/city/trivandrum"
                    className="hover:text-green-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/0 group-hover:bg-green-500/50 transition-colors" />
                    Event Planners in Trivandrum
                  </Link>
                </li>

                <li>
                  <Link
                    href="/city/kozhikode"
                    className="hover:text-green-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/0 group-hover:bg-green-500/50 transition-colors" />
                    Event Planners in Kozhikode
                  </Link>
                </li>

                <li>
                  <Link
                    href="/city/thrissur"
                    className="hover:text-green-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/0 group-hover:bg-green-500/50 transition-colors" />
                    Event Planners in Thrissur
                  </Link>
                </li>

              </ul>

            </div>

            {/* Legal */}
            <div>

              <h3 className="text-sm font-semibold tracking-wider text-white uppercase mb-4">
                Legal
              </h3>

              <PrivacyPolicyModal>
                <button className="text-sm text-gray-400 hover:text-green-400 transition-colors inline-flex items-center gap-2 group text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500/0 group-hover:bg-green-500/50 transition-colors" />
                  Privacy Policy
                </button>
              </PrivacyPolicyModal>

            </div>
          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">

        <div className="container mx-auto max-w-7xl px-6 py-4">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} gatherdeck. All rights reserved.
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