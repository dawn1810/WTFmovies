export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { ObjectId, mongodb } from '~/libs/func';
import { MongoUpdate } from '~/libs/interfaces';

export async function POST(request: NextRequest) {
    const data = await request.json() as any;
    const { epId, rating } = data;

    if (!epId || !rating) return new Response(JSON.stringify({ 'statusCode': 403, 'content': 'missing data' }, null, 2));
    const updateRes: MongoUpdate = await mongodb()
        .db('film')
        .collection('episode')
        .updateOne({
            filter: { _id: ObjectId(epId) },
            update: {
                "$set": {
                    rating: { "$numberDouble": String(rating) }
                }
            }
        })
    if (updateRes.matchedCount > 0 && updateRes.modifiedCount > 0)
        return new Response(JSON.stringify({ 'statusCode': 200, 'content': 'ok' }, null, 2));
    else
        return new Response(JSON.stringify({ 'statusCode': 404, 'content': 'wrong data' }, null, 2));

}   
