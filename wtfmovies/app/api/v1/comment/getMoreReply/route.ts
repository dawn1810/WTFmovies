export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { mongodb, ObjectId, toError, toJSON } from '~/libs/func';
import { CommentInterface } from '~/libs/interfaces';

interface dataType {
    commentId: string;
    skip: number;
}

export async function POST(request: NextRequest) {
    try {
        const { commentId, skip }: dataType = await request.json();

        const result = await mongodb()
            .db('film')
            .collection('comment')
            .find({
                filter: {
                    parentId: ObjectId(commentId),
                    status: { $ne: false },
                },
                sort: { time: -1 },
                limit: 10,
                skip: skip,
            });

        const cmtList: CommentInterface[] = await Promise.all(
            result.map(async (cmt) => {
                const avt = await mongodb()
                    .db('user')
                    .collection('auth')
                    .findOne({
                        filter: { email: cmt.email },
                        projection: { _id: 0, avatar: 1 },
                    });

                if (avt) return { ...cmt, avatar: avt.avatar };
                return cmt;
            }),
        );

        return toJSON({ content: 'Gửi bình luận thành công', data: cmtList });
    } catch (error) {
        return toError('Lỗi phản hồi bình luận: ' + error, 500);
    }
}
