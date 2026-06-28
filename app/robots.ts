export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/dashboard", "/bookings", "/register", "/sign-in", "/sign-up"],
      },
    ],
    sitemap: "https://www.gatherdeck.in/sitemap.xml",
  };
}