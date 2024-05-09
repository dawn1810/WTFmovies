export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

type dataType = { time: number; sortBy: number };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return undefined;

        const extendedUser: ExtendedUser | undefined = session?.user;
        if (extendedUser?.role === 'admin') {
            const { sortBy }: dataType = await request.json();
            const sort =
                sortBy === 0
                    ? { views: -1, likes: -1, rating: -1 }
                    : sortBy === 1
                    ? { likes: -1, views: -1, rating: -1 }
                    : { rating: -1, views: -1, likes: -1 };

            const response = await mongodb()
                .db('film')
                .collection('genre')
                .aggregate({
                    pipeline: [
                        {
                            $project: {
                                _id: 0,
                                name: 1,
                                views: 1,
                                likes: 1,
                                rating: 1,
                            },
                        },
                        { $sort: sort },
                        { $limit: 5 },
                    ],
                });

            if (response) {
                return toJSON(response);
            }

            return toError('Thay đổi trạng thái thất bại', 400);
        } else {
            return toError('Api không trong phạm trù quyền của bạn', 403);
        }
    } catch (err) {
        return toError('Lỗi trong quá trình thay đổi trạng thái', 500);
    }
}
