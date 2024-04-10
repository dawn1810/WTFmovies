import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './app/api/auth/[...nextauth]/auth';

export async function middleware(request: NextRequest) {
    const isLogged = await auth();

    if (isLogged && request.nextUrl.pathname.startsWith('/register')) {
        return NextResponse.redirect(new URL('/survey', request.url));
    }

    // const { device } = userAgent(request);
    // const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';

    return NextResponse.next();
}
