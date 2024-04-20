export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { ObjectId, mongodb, toError, toJSON } from '~/libs/func';
import { MongoUpdate } from '~/libs/interfaces';
import { auth } from '../../auth/[...nextauth]/auth';
import { User } from 'next-auth';

export async function POST(request: NextRequest) {
    const data = await request.json() as any;
    const { epId, rating, userId } = data;
    const session = await auth();
    if (!session || !session.user || !session.user.id) return toError({ status: 403, content: "missing data" }, 200);
    if (!epId || !rating || !userId) return toError({ status: 403, content: "missing data" }, 200);
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
        return toJSON({ status: 200, content: "ok" });
    else
        return toError({ status: 404, content: "wrong data" }, 200);

}   
