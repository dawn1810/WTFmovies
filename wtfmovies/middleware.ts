import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    let isLogged = request.cookies.has('account');

    if (isLogged && request.nextUrl.pathname.startsWith('/signup')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}
