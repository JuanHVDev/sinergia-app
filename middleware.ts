import { NextResponse, type NextRequest } from "next/server";
import { betterFetch, BetterFetch } from "@better-fetch/fetch";
import type { Session } from "@/lib/auth";

const authRoutes = ["/login", "/register"];
const passwordAuthRoutes = ["/reset-password", "/forgot-password"];
const publicRoutes = ["/"];

export default async function middleware(request: NextRequest) {
    const pathName = request.nextUrl.pathname;
    const isAuthRoute = authRoutes.includes(pathName);
    const isPasswordAuthRoute = passwordAuthRoutes.includes(pathName);
    const isPublicRoute = publicRoutes.includes(pathName);
    const { data: session } = await betterFetch<Session>(
        "api/auth/get-session",
        {
            baseURL: process.env.BETTER_AUTH_URL,
            headers: {
                cookie: request.headers.get("cookie") || "",
            },
        }
    );
    if (!session) {
        if (isAuthRoute || isPasswordAuthRoute || isPublicRoute) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/login", request.url));
    }
    if (isAuthRoute || isPasswordAuthRoute) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
}
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
