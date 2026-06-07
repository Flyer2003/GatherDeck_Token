import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gatherdeck.in"),
  title: {
    default: "GatherDeck – Top Event Planners, Venues & Catering in Kerala",
    template: "%s | GatherDeck",
  },
  description:
    "GatherDeck is Kerala's premium event vendor marketplace. Book verified event managers, catering services, venues, and decorators in Kochi, Trivandrum, Kozhikode, and Thrissur for weddings, corporate events, and parties.",
  keywords: [
    "event booking platform",
    "event vendors marketplace",
    "event planners",
    "event management services",
    "wedding event planners",
    "corporate event management",
    "event catering services",
    "event venues booking",
    "best event vendors",
    "best event managers",
    "best catering services",
    "best event venues",
    "event services for weddings",
    "event services for corporate events",
    "event services for parties",
    "event services for special occasions",
    "event services for birthday parties",
  ],
  applicationName: "GatherDeck",
  authors: [{ name: "GatherDeck" }],
  creator: "GatherDeck",
  publisher: "GatherDeck",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "GatherDeck",
    title: "GatherDeck – Event Vendor Marketplace",
    description:
      "Book verified event managers, caterers, venues, and vendors for weddings, corporate events, and celebrations.",
    url: "https://www.gatherdeck.in",
    images: [
      {
        url: "/og-event-marketplace.png",
        width: 1200,
        height: 630,
        alt: "GatherDeck event vendor marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GatherDeck – Event Vendor Marketplace",
    description:
      "Find and book event planners, caterers, venues, and vendors for any event.",
    images: ["/og-event-marketplace.png"],
  },
};

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#24AE7C",
          colorBackground: "#131619",
          colorInputBackground: "#1A1D21",
          colorInputText: "#E8E9E9",
          colorText: "#E8E9E9",
          colorTextSecondary: "#76828D",
          colorDanger: "#F24E43",
          borderRadius: "12px",
        },
        elements: {
          card: "shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#363A3D] rounded-2xl bg-[#131619]",
          formButtonPrimary: "bg-[#24AE7C] hover:bg-opacity-90 transition-all font-semibold rounded-xl py-3 border border-transparent hover:border-[#24AE7C] hover:shadow-md text-white",
          formFieldInput: "bg-[#1A1D21] border-[#363A3D] focus:ring-2 focus:ring-[#24AE7C] focus:border-transparent rounded-lg transition-all",
          footerActionLink: "text-[#24AE7C] hover:text-[#0D2A1F] font-semibold",
          socialButtonsBlockButton: "border border-[#363A3D] hover:bg-[#1A1D21] transition-all rounded-xl",
          socialButtonsBlockButtonText: "font-semibold text-[#ABB8C4]",
          headerTitle: "text-[#E8E9E9] font-bold text-2xl",
          headerSubtitle: "text-[#76828D]",
          dividerLine: "bg-[#363A3D]",
          dividerText: "text-[#76828D]",
        }
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-dark-200 font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
          </ThemeProvider>
          {/* JSON-LD Schema for Organization */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "GatherDeck",
                "url": "https://www.gatherdeck.in",
                "logo": "https://www.gatherdeck.in/og-event-marketplace.png",
                "description": "GatherDeck is Kerala's leading event vendor marketplace to book trusted event managers, catering services, venues, and decorators.",
                "areaServed": ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Kerala"],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "email": "support@gatherdeck.in",
                  "availableLanguage": ["English", "Malayalam"]
                }
              })
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
