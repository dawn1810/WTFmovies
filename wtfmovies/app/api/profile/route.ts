export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { mongodb } from '~/libs/func';

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);

    const text = await mongodb()
        .db('user')
        .collection('information')
        .findOne({ filter: { user_id: searchParams.get('id') } });

    return new Response(JSON.stringify(text, null, 2));
}
