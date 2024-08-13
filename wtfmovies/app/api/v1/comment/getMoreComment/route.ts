export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { mongodb, toError, toJSON } from '~/libs/func';
import { CommentInterface } from '~/libs/interfaces';

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

        return toJSON({ content: 'Lấy thêm bình luận thành công', data: cmtList });
    } catch (error) {
        return toError('Lỗi phản hồi bình luận: ' + error, 500);
    }
}
