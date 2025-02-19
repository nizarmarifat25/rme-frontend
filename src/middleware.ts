import { NextResponse } from "next/server";
import { JWTExtended } from "./types/Auth";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import environment from "./config/environment";

export async function middleware(request: NextRequest) {
    const token: JWTExtended | null = await getToken({
        req: request,
        secret: environment.AUTH_SECRET
    })

    const { pathname } = request.nextUrl

    if (pathname === "/auth/login") {
        if (token) {
            return NextResponse.redirect(new URL("/", request.url))
        }
    }

    if (pathname.startsWith("/admin")) {
        if (!token) {
            const url = new URL("/auth/login", request.url)
            url.searchParams.set("callbackUrl", encodeURI(request.url))

            return NextResponse.redirect(url)
        }
    }

    if (pathname === "/admin") {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }


}


export const config = {
    matcher: ['/auth/:path*', "/admin/:path*"]
}
