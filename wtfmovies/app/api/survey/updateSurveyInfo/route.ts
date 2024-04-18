export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { mongodb } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';
import { auth } from '../../auth/[...nextauth]/auth';

export async function POST(request: NextRequest) {
    const session = await auth();

    if (!session) return new Response(null, { status: 403 });

    const extendedUser: ExtendedUser | undefined = session?.user;

    const { info }: { info: any } = await request.json();

    if (info) {
        await mongodb()
            .db('user')
            .collection('information')
            .updateOne({
                filter: { user_id: extendedUser?.user_id },
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
            filter: { user_id: extendedUser?.user_id },
            update: {
                $set: {
                    first: false,
                },
            },
        });

    return new Response(null);
}
