import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './app/api/auth/[...nextauth]/auth';
// import { ExtendedUser } from './libs/interfaces';
const editer_path = ['film', 'overview', 'comment'];
const admin_path = ['overview', 'users', 'report', 'evaluate', 'userevaluate', 'films', 'comment'];
const login_path = ['/profile', '/editor'];

export async function middleware(request: NextRequest) {
    // const userSession = await auth();
    // const extendedUser: any | undefined = userSession?.user;

    // if (!!userSession && request.nextUrl.pathname.startsWith('/register')) {
    //     return NextResponse.redirect(new URL('/', request.url));
    // }

    // if (!userSession && !login_path.some((path) => request.nextUrl.pathname.startsWith(path))) {
    //     return NextResponse.redirect(new URL('/', request.url));
    // }

    // if (request.nextUrl.pathname.startsWith('/admin') && (!userSession || extendedUser?.role !== 'admin')) {
    //     return NextResponse.redirect(new URL('/', request.url));
    // }

    if (
        request.nextUrl.pathname.startsWith('/editor') &&
        !editer_path.some((path) => request.nextUrl.pathname.endsWith(path))
    ) {
        return NextResponse.redirect(new URL('/editor/overview', request.url));
    }

    if (
        request.nextUrl.pathname.startsWith('/admin') &&
        !admin_path.some((path) => request.nextUrl.pathname.endsWith(path))
    ) {
        return NextResponse.redirect(new URL('/admin/overview', request.url));
    }

    if (request.nextUrl.pathname.startsWith('/watch') && !/tap.*/.test(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL(request.nextUrl.pathname + '/tap1', request.url));
    }

    // const url = request.nextUrl;
    // const { device } = userAgent(request);
    // const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';
    // url.searchParams.set('viewport', viewport);

    return NextResponse.next();
}
