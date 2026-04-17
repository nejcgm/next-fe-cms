import { NextRequest, NextResponse } from "next/server";
import tenantConfig from "@tenant/config";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Rewrite every request to the tenant's [domain] route segment
  // e.g. /about → /vukans-bike/about
  url.pathname = `/${tenantConfig.id}${url.pathname}`;

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
