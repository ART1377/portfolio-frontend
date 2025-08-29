import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(req: any) {
  const { pathname } = req.nextUrl;

  // only protect /admin routes
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  // read token from cookie instead of header
  const token = req.cookies.get("token")?.value;

  if (!token || !(await verifyToken(token))) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
