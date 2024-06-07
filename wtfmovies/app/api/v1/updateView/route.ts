export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { ObjectId, mongodb, toError, toJSON } from '~/libs/func';
import { MongoUpdate } from '~/libs/interfaces';

export async function POST(request: NextRequest) {
    const data = (await request.json()) as any;
    const { epId } = data;

    if (!epId)
        return toError({ statusCode: 403, content: 'missing data' }, 200);

    const updateRes: MongoUpdate = await mongodb()
        .db('film')
        .collection('episode')
        .updateOne(
            {
                filter: {
                    _id:
                        ObjectId(epId)
                },
                update: {
                    $inc: {
                        views: 1
                    }
                },
                upsert: true,

            }

        );


    if (updateRes.matchedCount === 1)
        return toJSON({ statusCode: 200, content: 'ok' });
    else return toError({ statusCode: 404, content: 'wrong data' }, 200);
}
