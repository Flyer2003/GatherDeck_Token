export default function robots() {
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/admin", "/events"],
        },
      ],
      sitemap: "https://gatherdeck.vercel.app/sitemap.xml",
    };
  }
  