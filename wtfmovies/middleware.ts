import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './app/api/auth/[...nextauth]/auth';
const editer_path = ['film', 'overview'];
export async function middleware(request: NextRequest) {
    const isLogged = await auth();

    if (isLogged && request.nextUrl.pathname.startsWith('/register')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (
        request.nextUrl.pathname.startsWith('/editer') &&
        !editer_path.some((path) => request.nextUrl.pathname.endsWith(path))
    ) {
        return NextResponse.redirect(new URL('/editer/overview', request.url));
    }

    if (request.nextUrl.pathname.startsWith('/watch') && !/tap.*/.test(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL(request.nextUrl.pathname + '/tap1', request.url));
    }

    // const { device } = userAgent(request);
    // const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';

    return NextResponse.next();
}
