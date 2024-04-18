export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { mongodb, reply } from '~/libs/func';

export async function POST(request: NextRequest) {
    const { userID, info }: { userID: string; info: any } = await request.json();

    if (info) {
        await mongodb()
            .db('user')
            .collection('information')
            .updateOne({
                filter: { user_id: userID },
                update: {
                    $set: {
                        directors: info.directors,
                        genres: info.genres,
                        languages: info.languages,
                        actors: info.actors,
                    },
                },
                upsert: true,
            });
    }

    await mongodb()
        .db('user')
        .collection('auth')
        .updateOne({
            filter: { user_id: userID },
            update: {
                $set: {
                    first: false,
                },
            },
        });

    return reply();
}
