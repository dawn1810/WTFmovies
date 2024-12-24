export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { mongodb, toError, toJSON } from '~/libs/func';
import { CommentInterface, UserInfoInterface } from '~/libs/interfaces';

interface dataType {
    filmName: string;
    skip: number;
}

export async function POST(request: NextRequest) {
    try {
        const { filmName, skip }: dataType = await request.json();

        const comments: any[] = await mongodb()
            .db('film')
            .collection('information')
            .aggregate({
                pipeline: [
                    { $match: { status: { $ne: false } } },
                    { $match: { searchName: filmName } },
                    { $match: { comment: { $exists: true, $ne: [] } } },
                    {
                        $lookup: {
                            from: 'comment',
                            let: { commentIds: '$comment' },
                            pipeline: [
                                { $match: { $expr: { $in: ['$_id', '$$commentIds'] } } }, // Match the author ids
                                { $match: { status: true } }, // This line includes only documents with status true
                                { $project: { unlike: 0 } },
                                { $sort: { time: -1 } },
                                { $skip: skip },
                                { $limit: 10 },
                            ],
                            as: 'commentDetails',
                        },
                    },
                    {
                        $project: {
                            comments: '$commentDetails',
                        },
                    },
                    { $limit: 1 },
                ],
            });

        const cmtList: CommentInterface[] = await Promise.all(
            comments[0].comments.map(async (cmt: any) => {
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

        return toJSON({ content: 'Lấy thêm bình luận thành công', data: cmtList });
    } catch (error) {
        return toError('Lỗi phản hồi bình luận: ' + error, 500);
    }
}
