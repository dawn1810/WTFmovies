export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { MongoDate, mongodb, ObjectId, toError, toJSON } from '~/libs/func';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { ExtendedUser } from '~/libs/interfaces';
import { skip } from 'node:test';

interface dataType {
    commentId: string;
    skip: number;
}

export async function POST(request: NextRequest) {
    const session = await auth();

    if (!session) return toError('Lỗi xác thực', 403);

    try {
        const { commentId, skip }: dataType = await request.json();

        const result = await mongodb()
            .db('film')
            .collection('comment')
            .find({
                filter: {
                    parentId: ObjectId(commentId),
                },
                limit: 10,
                skip: skip,
            });

        return toJSON({ content: 'Gửi bình luận thành công', data: result });
    } catch (error) {
        return toError('Lỗi phản hồi bình luận: ' + error, 500);
    }
}
