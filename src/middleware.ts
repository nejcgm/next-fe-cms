import { NextRequest, NextResponse } from "next/server";
import tenantConfig from "@tenant/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const tenantPrefix = `/${tenantConfig.id}`;

  // Already under /[tenantId]/... — do not rewrite again.
  if (pathname === tenantPrefix || pathname.startsWith(`${tenantPrefix}/`)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  // e.g. / → /vukans-bike/, /about → /vukans-bike/about
  url.pathname = `${tenantPrefix}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Explicit "/" — the broad pattern below often does not match "/" alone.
    "/",
    // Simpler than nested extension regex (avoids path-to-regexp edge cases on Vercel).
    "/((?!api|_next|favicon\\.ico).*)",
  ],
};
