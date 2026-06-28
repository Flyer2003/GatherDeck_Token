import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/register(.*)",
  "/dashboard(.*)",
  "/bookings(.*)",
]);

const isBot = (req: NextRequest) => {
  const ua = req.headers.get("user-agent") ?? "";
  return /bot|crawl|spider|google|bing|yahoo|duckduck|baidu|yandex|facebookexternalhit/i.test(ua);
};

export default clerkMiddleware((auth, req) => {
  // Let bots through without any Clerk processing
  if (isBot(req)) return NextResponse.next();

  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};