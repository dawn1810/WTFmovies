export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
    cookies().set('haha', getRequestContext().env.publicKey, { secure: true });
    return new Response();
}
