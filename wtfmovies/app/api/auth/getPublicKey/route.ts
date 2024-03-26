export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export async function GET(request: NextRequest) {
    return new Response(JSON.stringify(getRequestContext().env.publicKey, null, 2));
}
