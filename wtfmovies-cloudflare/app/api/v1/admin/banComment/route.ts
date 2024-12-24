export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { ObjectId, mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

type dataType = { comments: string[]; ban: boolean };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return toError('Xác thực thất bại', 401);

        const extendedUser: ExtendedUser | undefined = session?.user;
        const { comments, ban }: dataType = await request.json();

        const newCommentIds = comments.map((comment: any) => ObjectId(comment._id));

        const newParentIds = new Map();

        comments.forEach((comment: any) => {
            const parentId = comment.parentId;
            if (parentId) {
                if (newParentIds.has(parentId)) newParentIds.set(parentId, newParentIds.get(parentId) + (ban ? 1 : -1));
                else newParentIds.set(parentId, ban ? 1 : -1);
            }
        });

        // const newParentIds = comments.map((comment: any) => {
        //     if (comment.parentId) return ObjectId(comment.parentId);
        // });

        if (extendedUser?.role === 'admin') {
            const currCommentUpdate = await mongodb()
                .db('film')
                .collection('comment')
                .updateMany({
                    filter: { _id: { $in: newCommentIds } },
                    update: { $set: { status: ban } },
                });

            newParentIds.forEach(async (values, keys) => {
                await mongodb()
                    .db('film')
                    .collection('comment')
                    .updateMany({
                        filter: { _id: ObjectId(keys) },
                        update: { $inc: { replyLength: values } },
                    });
            });
            // const commentUpdate = await mongodb()
            //     .db('film')
            //     .collection('comment')
            //     .updateMany({
            //         filter: { _id: { $in: newParentIds } },
            //         update: { $inc: { replyLength: ban ? 1 : -1 } },
            //     });

            if (currCommentUpdate.modifiedCount >= 1) {
                return toJSON('Thay đổi trạng thái thành công');
            }
            return toError('Thay đổi trạng thái thất bại', 400);
        } else {
            return toError('Api không trong phạm trù quyền của bạn', 403);
        }
    } catch (err) {
        return toError('Lỗi trong quá trình thay đổi trạng thái', 500);
    }
}
