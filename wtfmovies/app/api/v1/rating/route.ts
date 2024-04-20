export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { ObjectId, mongodb, toError, toJSON } from '~/libs/func';
import { MongoUpdate } from '~/libs/interfaces';
import { auth } from '../../auth/[...nextauth]/auth';

export async function POST(request: NextRequest) {
    const data = await request.json() as any;
    const { epId, rating } = data;
    const session = await auth();

    if (!session || !session.user || !session.user.id) return toError({ statusCode: 403, content: "missing data" }, 200);
    if (!epId || !rating) return toError({ statusCode: 403, content: "missing data" }, 200);

    const updateRes: MongoUpdate = await mongodb()
        .db('film')
        .collection('rating')
        .updateOne({
            filter: { id_ep: ObjectId(epId), id_user: ObjectId(session.user.id) },
            update: {
                "$set": {
                    rating: { "$numberDouble": String(rating) }
                }
            },
            upsert: true
        })

    if (updateRes.matchedCount === 1)
        return toJSON({ statusCode: 200, content: "ok" });
    else
        return toError({ statusCode: 404, content: "wrong data" }, 200);

}   
