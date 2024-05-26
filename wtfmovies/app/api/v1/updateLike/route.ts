export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { ObjectId, mongodb, toError, toJSON } from '~/libs/func';
import { auth } from '../../auth/[...nextauth]/auth';
import { ExtendedUser } from '~/libs/interfaces';

type dataType = { filmId: string[]; love: boolean };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return undefined;

        const extendedUser: ExtendedUser | undefined = session?.user;
        const { filmId, love }: dataType = await request.json();

        if (love) {
            // update user love film list
            const userRes = await mongodb()
                .db('user')
                .collection('information')
                .updateOne({
                    filter: {
                        email: extendedUser?.email,
                    },
                    update: { $push: { loveFilms: { $each: filmId } } },
                    upsert: true,
                });

            // update film
            const filmRes = await mongodb()
                .db('film')
                .collection('information')
                .updateOne({
                    filter: {
                        film_id: { $in: filmId },
                    },
                    update: { $inc: { likes: 1, monthLikes: 1, weekLikes: 1 } },
                });

            if (userRes.modifiedCount === 1 && filmRes.modifiedCount === 1) {
                return toJSON('Yêu thích phim thành công');
            }
        } else {
            // update user love film list
            const userRes = await mongodb()
                .db('user')
                .collection('information')
                .updateOne({
                    filter: {
                        email: extendedUser?.email,
                    },
                    update: { $pull: { loveFilms: { $in: filmId } } },
                    upsert: true,
                });

            // update film
            const filmRes = await mongodb()
                .db('film')
                .collection('information')
                .updateOne({
                    filter: {
                        film_id: { $in: filmId },
                    },
                    update: { $inc: { likes: -1, monthLikes: -1, weekLikes: -1 } },
                });

            if (userRes.modifiedCount === 1 && filmRes.modifiedCount === 1) {
                return toJSON('Bỏ yêu thích phim thành công');
            }
        }

        return toError('Cập nhật yêu thích phim thất bại', 400);
    } catch (err) {
        return toError('Lỗi trong quá trình cập nhật yêu thích phim', 500);
    }
}