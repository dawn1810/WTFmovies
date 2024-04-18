export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { ObjectId, mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser, MongoUpdate } from '~/libs/interfaces';
import { auth } from '../../auth/[...nextauth]/auth';

export async function POST(request: NextRequest) {
    const data = await request.json() as any;
    const { epId, rating, userId } = data;
    const session = await auth();

    if (!session) return new Response(JSON.stringify({ 'statusCode': 200, 'content': 'ok' }, null, 2));
    ;

    const extendedUser: ExtendedUser | undefined = session?.user;

    if (!epId || !rating || !userId) return toError({ status: 403, content: "missing data" }, 200);
    const updateRes: MongoUpdate = await mongodb()
        .db('film')
        .collection('rating')
        .updateOne({
            filter: { id_ep: ObjectId(epId), id_user: ObjectId(userId) },
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
