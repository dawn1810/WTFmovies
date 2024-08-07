export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { mongodb, ObjectId, toError, toJSON } from '~/libs/func';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { ExtendedUser } from '~/libs/interfaces';

interface dataType {
    commentId: string;
    unlike: boolean;
    filmName: string;
}

export async function POST(request: NextRequest) {
    const session = await auth();

    if (!session) return toError('Lỗi xác thực', 403);

    try {
        const extendedUser: ExtendedUser | undefined = session?.user;
        const { commentId, unlike, filmName }: dataType = await request.json();

        let updateUser;
        if (unlike) {
            updateUser = await mongodb()
                .db('user')
                .collection('information')
                .updateOne({
                    filter: { email: extendedUser?.email },
                    update: {
                        $addToSet: { ['likeCmt.' + filmName + '.unlikeComments']: commentId },
                    },
                });
        } else {
            updateUser = await mongodb()
                .db('user')
                .collection('information')
                .updateOne({
                    filter: { email: extendedUser?.email },
                    update: {
                        $pull: { ['likeCmt.' + filmName + '.unlikeComments']: commentId },
                    },
                });
        }

        const updateUnlike = await mongodb()
            .db('film')
            .collection('comment')
            .updateOne({
                filter: { _id: ObjectId(commentId) },
                update: {
                    $inc: { unlike: unlike ? 1 : -1 },
                },
            });

        if (updateUser && updateUnlike) return toJSON({ content: 'Không yêu thích bình luận thành công' });
        else return toError('Không yêu thích bình luận thất bại', 500);
    } catch (error) {
        return toError('Lỗi không yêu thích bình luận: ' + error, 500);
    }
}
