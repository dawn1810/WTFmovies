export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { decryptData } from '~/libs/func';
import { getRequestContext } from '@cloudflare/next-on-pages';

export async function GET(request: NextRequest) {
    const cookiesStore = cookies();
    const account = cookiesStore.get('account')?.value;
    const decrypt = await decryptData(getRequestContext().env.privateKey, String(account));

    if (decrypt.substring(0, 8) === '18102003') {
        const oneMonth = 30 * 24 * 60 * 60 * 1000;
        cookiesStore.set('account', String(account), { expires: Date.now() + oneMonth });
    } else if (decrypt.substring(0, 8) !== '30020181') {
        cookiesStore.delete('account');
        return new Response(null, { status: 204 });
    }

    return new Response(null);
}
