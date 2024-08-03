export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { mongodb, ObjectId, toError, toJSON } from '~/libs/func';

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
                },
                sort: { time: -1 },
                limit: 10,
                skip: skip,
            });

        return toJSON({ content: 'Gửi bình luận thành công', data: result });
    } catch (error) {
        return toError('Lỗi phản hồi bình luận: ' + error, 500);
    }
}
