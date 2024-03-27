export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
    const cookiesStore = cookies();
    const account = cookiesStore.get('account');

    const oneMonth = 30 * 24 * 60 * 60 * 1000;
    cookiesStore.set('account', String(account), { expires: Date.now() + oneMonth });
    return new Response();
}
