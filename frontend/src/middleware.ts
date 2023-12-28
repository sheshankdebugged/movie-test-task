import { NextResponse, NextRequest } from 'next/server';

const protectedRoutes = ['/add-new-movie', '/edit-movie/'];

const publicRoutes = ['/sign-in',]

export default function middleware(req: NextRequest) {
    let isLogin = req.cookies.get("token");

    if (!isLogin && protectedRoutes.includes(req.nextUrl.pathname)) {
        const absoluteURL = new URL('/', req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString())
    }

    if (isLogin && publicRoutes.includes(req.nextUrl.pathname)) {
        const absoluteURL = new URL('/', req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString())
    }
}