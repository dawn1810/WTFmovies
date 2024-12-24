export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { mongodb, ObjectId, toError, toJSON } from '~/libs/func';
import { CommentInterface, UserInfoInterface } from '~/libs/interfaces';

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
                const sender: UserInfoInterface[] = await mongodb()
                    .db('user')
                    .collection('information')
                    .aggregate({
                        pipeline: [
                            { $match: { email: cmt.email } },
                            {
                                $lookup: {
                                    from: 'auth',
                                    localField: 'email',
                                    foreignField: 'email',
                                    as: 'authInfo',
                                },
                            },
                            {
                                $unwind: '$authInfo',
                            },
                            {
                                $project: {
                                    _id: 0,
                                    name: 1,
                                    avatar: '$authInfo.avatar',
                                },
                            },
                        ],
                    });

                if (sender && sender[0]) return { ...cmt, avatar: sender[0].avatar, username: sender[0].name };
                return cmt;
            }),
        );

        return toJSON({ content: 'Gửi bình luận thành công', data: cmtList });
    } catch (error) {
        return toError('Lỗi phản hồi bình luận: ' + error, 500);
    }
}
