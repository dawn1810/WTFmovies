export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { MongoDate, ObjectId, mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

type dataType = { content: string; userEmails: string[] };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return undefined;

        const extendedUser: ExtendedUser | undefined = session?.user;
        // check auth

        const { content, userEmails }: dataType = await request.json();
        const today = new Date();

        const notifyAdd = await mongodb()
            .db('user')
            .collection('notify')
            .insertOne({
                content: content,
                time: MongoDate(today),
            });

        if (!notifyAdd.insertedId) return toError('Gởi thông báo thất bại', 400);

        const userIds = await mongodb()
            .db('user')
            .collection('information')
            .updateMany({
                filter: {
                    email: { $in: userEmails },
                },
                update: {
                    $push: { notifications: notifyAdd.insertedId },
                },
            });

        if (userIds.modifiedCount === 0) return toJSON('Không có người dùng cần thông báo', 202);

        return toJSON('Gửi thông báo thành công', 200);
    } catch (err) {
        return toError('Lỗi trong quá trình gỡ thông báo', 500);
    }
}
