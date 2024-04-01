export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { mongodb } from '~/libs/func';

export async function GET(request: NextRequest) {
    let genre = await mongodb()
        .db('film')
        .collection('gerne')
        .find({ projection: { name: 1 } });

    const language = await mongodb()
        .db('film')
        .collection('language')
        .find({ projection: { name: 1 } });

    return new Response(JSON.stringify({ genre, language }, null, 2));
}
