export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { ObjectId, mongodb, toError, toJSON } from '~/libs/func';
import { MongoUpdate } from '~/libs/interfaces';
import { auth } from '~/app/api/auth/[...nextauth]/auth';

export async function POST(request: NextRequest) {
    const data = (await request.json()) as any;
    const { epId, rating } = data;
    const session = await auth();

    if (!session || !session.user || !session.user.id || !epId || !rating)
        return toError({ statusCode: 403, content: 'missing data' }, 200);

    const updateRes: MongoUpdate = await mongodb()
        .db('film')
        .collection('rating')
        .updateOne({
            filter: { id_ep: ObjectId(epId), id_user: ObjectId(session.user.id) },
            update: {
                $set: {
                    rating: { $numberDouble: String(rating) },
                },
            },
            upsert: true,
        });
    const avgRatingEp: any = await mongodb()
        .db('film')
        .collection('episode')
        .aggregate({
            pipeline: [
                {
                    $match: {
                        _id: ObjectId(epId),
                    },
                },
                {
                    $lookup: {
                        from: 'rating',
                        localField: '_id',
                        foreignField: 'id_ep',
                        as: 'reviews',
                    },
                },
                {
                    $project: {
                        rating: { $round: [{ $avg: '$reviews.rating' }, 1] },
                    },
                },
            ],
        });
    const UpdateRatingEp: MongoUpdate = await mongodb()
        .db('film')
        .collection('episode')
        .updateOne({
            filter: { _id: ObjectId(epId) },
            update: {
                $set: {
                    rating: avgRatingEp[0].rating,
                },
            },
            upsert: true,

        });

    if ((updateRes.matchedCount === 1 && UpdateRatingEp.matchedCount === 1) || (updateRes.upsertedId && UpdateRatingEp.upsertedId))
        return toJSON({ statusCode: 200, content: 'ok' });
    else return toError({ statusCode: 404, content: 'wrong data' }, 200);
}
