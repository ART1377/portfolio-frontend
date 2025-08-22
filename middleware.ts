import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Verify JWT with jose
async function verifyToken(token: string) {
  try {
    // IMPORTANT: use the same secret you sign with in backend
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    // verify token — throws if invalid or expired
    await jwtVerify(token, secret);

    return true;
  } catch (err) {
    console.error("JWT verification failed in middleware:", err);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // only protect /admin routes (matcher already ensures this)
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (!token || !(await verifyToken(token))) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("from", pathname); // preserve redirect path
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
