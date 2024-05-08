import { ObjectId, mongodb, toJSON } from '~/libs/func';
export const runtime = 'edge';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const data: any[] = await mongodb()
        .db('film')
        .collection('information')
        .aggregate({
            pipeline: [
                {
                    $lookup: {
                        from: 'episode',
                        localField: 'film_id',
                        foreignField: 'film_id',
                        as: 'reviews',
                    },
                },
                {
                    $project: {
                        _id: 0,
                        name: 1,
                        views: '$weekViews',
                        likes: 1,
                        rating: { $round: [{ $avg: '$reviews.rating' }, 1] },
                    },
                },
                { $sort: { weekViews: -1, likes: -1, rating: -1 } },
                // { $limit: 5 },
            ],
        });

    return toJSON(data);
}
