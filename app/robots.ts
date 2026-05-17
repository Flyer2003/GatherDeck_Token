export default function robots() {
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/admin"],
        },
      ],
      sitemap: "https://gatherdeck.in/sitemap.xml",
    };
  }
  