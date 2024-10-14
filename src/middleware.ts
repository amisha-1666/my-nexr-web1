// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AuthUser } from "@/context/AuthContext";

export async function middleware(request: NextRequest) {
  const nextAppToken = request.cookies.get("nextAppToken")?.value;
  const publicPaths = ["/login", "/"];

  if (!nextAppToken && !publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (nextAppToken) {
    try {
      const response = await fetch(`${request.nextUrl.origin}/api/auth/verify`, {
        method: 'GET',
        headers: {
          'Cookie': `nextAppToken=${nextAppToken}`
        }
      });

      if (response.ok) {
        const userData: AuthUser = await response.json();
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("user", JSON.stringify(userData));
        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
      } else {
        console.error("Token verification failed");
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("nextAppToken");
        return response;
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
