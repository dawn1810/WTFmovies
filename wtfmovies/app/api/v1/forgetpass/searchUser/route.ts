export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { mongodb, toError, toJSON } from '~/libs/func';

type dataType = { userEmail: string };

export async function POST(request: NextRequest) {
    try {
        const { userEmail }: dataType = await request.json();
        const response: any[] = await mongodb()
            .db('user')
            .collection('auth')
            .aggregate({
                pipeline: [
                    { $match: { email: userEmail } },
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

        if (!!response.length) {
            return toJSON(response[0], 200);
        }

        return toError('Người dùng không tồn tại', 400);
    } catch (err) {
        return toError('Lỗi trong tìm kiếm người dùng', 500);
    }
}
