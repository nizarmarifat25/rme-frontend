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
            const url = new URL(request.url);
            const callbackUrl = url.searchParams.get("callbackUrl") || `${url.protocol}//${url.host}/`;

            return Response.redirect(callbackUrl);
        } else {
            const url = new URL(request.url);
            url.searchParams.set("callbackUrl", encodeURI(request.url));
        }
    }
    
    if (pathname === "/") {
        if (!token) {
            return NextResponse.redirect(new URL("/owner/dashboard", request.url))
        }
    }

    if (pathname.startsWith("/owner")) {
        if (!token) {
            const url = new URL("/auth/login", request.url)
            url.searchParams.set("callbackUrl", encodeURI(request.url))

            return NextResponse.redirect(url)
        }
    }

    if (pathname.startsWith("/master-data")) {
        if (!token) {
            const url = new URL("/auth/login", request.url)
            url.searchParams.set("callbackUrl", encodeURI(request.url))

            return NextResponse.redirect(url)
        }
    }

    if (pathname === "/owner") {
        return NextResponse.redirect(new URL('/owner/dashboard', request.url))
    }


}


export const config = {
    matcher: ['/auth/:path*', "/owner/:path*", "/master-data/:path*", "/:path*"]
}
