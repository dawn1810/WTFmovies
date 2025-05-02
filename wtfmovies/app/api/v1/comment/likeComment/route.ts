export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { mongodb, ObjectId, toError, toJSON } from '~/libs/func';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { ExtendedUser } from '~/libs/interfaces';

interface dataType {
    commentId: string;
    like: boolean;
    filmName: string;
}

export async function POST(request: NextRequest) {
    const session = await auth();

    if (!session) return toError('Lỗi xác thực', 403);

    try {
        const extendedUser: ExtendedUser | undefined = session?.user;
        const { commentId, like, filmName }: dataType = await request.json();

        let updateUser;
        if (like) {
            updateUser = await mongodb()
                .db('user')
                .collection('information')
                .updateOne({
                    filter: { email: extendedUser?.email },
                    update: {
                        $addToSet: { ['likeCmt.' + filmName + '.likeComments']: commentId },
                    },
                });
        } else {
            updateUser = await mongodb()
                .db('user')
                .collection('information')
                .updateOne({
                    filter: { email: extendedUser?.email },
                    update: {
                        $pull: { ['likeCmt.' + filmName + '.likeComments']: commentId },
                    },
                });
        }

        const updateLike = await mongodb()
            .db('film')
            .collection('comment')
            .updateOne({
                filter: { _id: ObjectId(commentId) },
                update: {
                    $inc: { like: like ? 1 : -1 },
                },
            });

        if (updateUser && updateLike) return toJSON({ content: 'Yêu thích bình luận thành công' });
        else return toError('Yêu thích bình luận thất bại', 400);
    } catch (error) {
        return toError('Lỗi yêu thích bình luận: ' + error, 500);
    }
}
