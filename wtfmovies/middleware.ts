import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
    const isLogged = request.cookies.has('account');

    if (isLogged && request.nextUrl.pathname.startsWith('/signup')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}
