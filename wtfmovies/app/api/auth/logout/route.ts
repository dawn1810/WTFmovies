export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export function GET(request: NextRequest) {
    cookies().delete('account');
    cookies().delete('remember');
    return new Response();
}
