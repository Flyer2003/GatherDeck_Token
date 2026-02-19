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
  metadataBase: new URL("https://gatherdeck.vercel.app"),
  title: {
    default: "GatherDeck – Book Event Vendors, Venues & Catering",
    template: "%s | GatherDeck",
  },
  description:
    "GatherDeck is an event vendor marketplace to book event managers, caterers, venues, decorators, and other event services for weddings, corporate events, and parties.",
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
    url: "https://gatherdeck.vercel.app",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
      </body>
    </html>
  );
}
