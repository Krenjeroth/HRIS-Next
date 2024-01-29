// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const url = request.nextUrl.clone();

    // redirect to login page if not logged in
    if (pathname != "/login" && !request.cookies.has('token')) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }


    // redirect to home page
    if (pathname === "/login" && request.cookies.has('token')) {
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    const response = NextResponse.next();
    return response;
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [/*
        * Match all request paths except for the ones starting with:
        * - api (API routes)
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico (favicon file)
        */
        '/((?!api|_next/static|_next/image|favicon.ico|public).*)'
    ]
}