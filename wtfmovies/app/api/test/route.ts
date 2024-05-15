import { ObjectId, mongodb, toJSON } from '~/libs/func';
export const runtime = 'edge';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const data: any[] = await mongodb()
        .db('user')
        .collection('auth')
        .aggregate({
            pipeline: [
                { $match: { email: 'binhminh19112003@gmail.com' } },
                {
                    $lookup: {
                        from: 'information',
                        localField: 'email',
                        foreignField: 'email',
                        as: 'info',
                    },
                },
                {
                    $project: {
                        _id: 0,
                        name: '$info.name',
                        email: 1,
                        avatar: 1,
                    },
                },
                { $limit: 1 },
            ],
        });
    return toJSON(data[0]);
}
