export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) return toError('Xác thực thất bại', 401);
        const extendedUser: ExtendedUser | undefined = session?.user;
        if (extendedUser?.role !== 'admin') return toError('Api không trong phạm trù quyền của bạn', 403);

        const querys: any = { status: { $ne: 'delete' } };
        const films: any[] = await mongodb()
            .db('film')
            .collection('information')
            .aggregate({
                pipeline: [
                    { $match: querys },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            film_id: 1,
                            poster: 1,
                        },
                    },
                ],
            });


        return films
            ? toJSON({ statusCode: 200, content: films })
            : toError('Không tìm thấy phim', 400);

    } catch (err) {
        return toError('Lỗi trong quá trình fetch flim', 500);
    }



}
