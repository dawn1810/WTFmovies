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
            const { time, sortBy }: dataType = await request.json();
            const viewTime = time === 0 ? '$weekViews' : time === 1 ? '$monthViews' : '$views';
            const likeTime = time === 0 ? '$weekLikes' : time === 1 ? '$monthLikes' : '$likes';
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
                            $lookup: {
                                from: 'information',
                                let: { genreId: '$_id' },
                                pipeline: [
                                    { $match: { $expr: { $in: ['$$genreId', '$genre'] } } },
                                    { $project: { _id: 0, film_id: 1, views: viewTime, likes: likeTime } },
                                ],
                                as: 'info',
                            },
                        },
                        {
                            $unwind: '$info',
                        },
                        {
                            $lookup: {
                                from: 'episode',
                                localField: 'info.film_id',
                                foreignField: 'film_id',
                                as: 'episodes',
                            },
                        },
                        {
                            $unwind: '$episodes',
                        },
                        {
                            $group: {
                                _id: '$name',
                                likes: {
                                    $sum: '$info.likes',
                                },
                                views: {
                                    $sum: '$info.views',
                                },
                                rating: {
                                    $avg: '$episodes.rating',
                                },
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                name: '$_id',
                                views: 1,
                                rating: 1,
                                likes: 1,
                            },
                        },
                        { $sort: { likes: -1, views: -1, rating: -1 } },
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
