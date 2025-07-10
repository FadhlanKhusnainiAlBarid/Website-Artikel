import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isAuthRoute = pathname.startsWith("/auth");
  const isProtectedRoute = !isAuthRoute && pathname !== "/_next";

  if (pathname === "/auth/login" && token) {
    // Jika sudah login dan ke /auth/login → redirect ke beranda
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isProtectedRoute && !token) {
    // Belum login, akses halaman yang diproteksi → redirect ke login
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"], // Proteksi semua kecuali resource internal
};
