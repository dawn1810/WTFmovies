import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './app/api/auth/[...nextauth]/auth';

export async function middleware(request: NextRequest) {
    const isLogged = await auth();

    if (isLogged && request.nextUrl.pathname.startsWith('/register')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}
