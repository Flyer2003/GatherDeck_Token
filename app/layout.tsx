import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gatherdeck.in"),
  title: {
    default: "gatherdeck – Book Event Planners, Venues & Caterers in Kerala",
    template: "%s | gatherdeck",
  },
  description:
    "gatherdeck is Kerala's #1 event vendor marketplace. Book verified event managers, caterers, venues & decorators in Kochi, Trivandrum, Kozhikode & Thrissur for weddings, corporate events & parties.",
  keywords: [
    "event booking platform Kerala",
    "event vendors marketplace Kerala",
    "event planners Kochi",
    "event planners Trivandrum",
    "event planners Kozhikode",
    "event planners Thrissur",
    "wedding event planners Kerala",
    "corporate event management Kerala",
    "event catering services Kerala",
    "event venues booking Kerala",
    "best event managers Kerala",
    "best catering services Kerala",
    "best event venues Kerala",
    "wedding planners Kochi",
    "wedding planners Trivandrum",
  ],
  applicationName: "gatherdeck",
  authors: [{ name: "gatherdeck", url: "https://www.gatherdeck.in" }],
  creator: "gatherdeck",
  publisher: "gatherdeck",
  category: "Event Planning",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.gatherdeck.in",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "gatherdeck",
    title: "gatherdeck – Book Event Planners, Venues & Caterers in Kerala",
    description:
      "Kerala's #1 marketplace to book verified event managers, caterers, venues & vendors for weddings, corporate events & celebrations.",
    url: "https://www.gatherdeck.in",
    images: [
      {
        url: "https://www.gatherdeck.in/og-event-marketplace.png",
        width: 1200,
        height: 630,
        alt: "gatherdeck – Kerala's Event Vendor Marketplace",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@gatherdeck",
    creator: "@gatherdeck",
    title: "gatherdeck – Book Event Planners, Venues & Caterers in Kerala",
    description:
      "Find & book verified event planners, caterers, venues & vendors across Kerala for any occasion.",
    images: ["https://www.gatherdeck.in/og-event-marketplace.png"],
  },
  verification: {
    google: "SEI6ZtBP9YXYTOf6Eggi0XUDJs8fV1kqqyE5dqNEXY",
  },
};

const clerkAppearance = {
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
    formButtonPrimary:
      "bg-[#24AE7C] hover:bg-opacity-90 transition-all font-semibold rounded-xl py-3 border border-transparent hover:border-[#24AE7C] hover:shadow-md text-white",
    formFieldInput:
      "bg-[#1A1D21] border-[#363A3D] focus:ring-2 focus:ring-[#24AE7C] focus:border-transparent rounded-lg transition-all",
    footerActionLink: "text-[#24AE7C] hover:text-[#0D2A1F] font-semibold",
    socialButtonsBlockButton:
      "border border-[#363A3D] hover:bg-[#1A1D21] transition-all rounded-xl",
    socialButtonsBlockButtonText: "font-semibold text-[#ABB8C4]",
    headerTitle: "text-[#E8E9E9] font-bold text-2xl",
    headerSubtitle: "text-[#76828D]",
    dividerLine: "bg-[#363A3D]",
    dividerText: "text-[#76828D]",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.gatherdeck.in/#organization",
      name: "gatherdeck",
      url: "https://www.gatherdeck.in",
      logo: {
        "@type": "ImageObject",
        url: "https://www.gatherdeck.in/og-event-marketplace.png",
        width: 1200,
        height: 630,
      },
      description:
        "gatherdeck is Kerala's leading event vendor marketplace to book trusted event managers, catering services, venues, and decorators.",
      areaServed: [
        { "@type": "City", name: "Kochi" },
        { "@type": "City", name: "Thiruvananthapuram" },
        { "@type": "City", name: "Kozhikode" },
        { "@type": "City", name: "Thrissur" },
        { "@type": "State", name: "Kerala" },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "support@gatherdeck.in",
        availableLanguage: ["English", "Malayalam"],
      },
      sameAs: [
        "https://www.instagram.com/gatherdeck/",
        "https://www.linkedin.com/company/gatherdeck",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.gatherdeck.in/#website",
      url: "https://www.gatherdeck.in",
      name: "gatherdeck",
      description: "Kerala's #1 event vendor marketplace",
      publisher: {
        "@id": "https://www.gatherdeck.in/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://www.gatherdeck.in/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={clerkAppearance}>
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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
