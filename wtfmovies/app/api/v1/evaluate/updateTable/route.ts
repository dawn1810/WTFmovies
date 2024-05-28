export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { MongoDate, checkCondition, mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser, RowInterface } from '~/libs/interfaces';

type dataType = { table: RowInterface[]; version: string };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return undefined;

        const extendedUser: ExtendedUser | undefined = session?.user;
        const { table, version }: dataType = await request.json();

        if (!checkCondition(table)) {
            return toError('Bảng đánh giá không hợp lệ', 422);
        }

        if (extendedUser?.role === 'admin') {
            const today = new Date();
            const response = await mongodb()
                .db('evaluate')
                .collection('table')
                .updateOne({
                    filter: { version },
                    update: { table, version, time: MongoDate(today) },
                    upsert: true,
                });

            if (response.modifiedCount === 1 || !!response.upsertedId)
                return toJSON('Cập nhật bảng đánh giá thành công');
        } else return toError('API ngoài thẩm quyền của bạn', 404);

        return toError('Cập nhật bảng đánh giá thất bại', 400);
    } catch (err) {
        return toError('Lỗi trong quá trình cập nhật bảng đánh giá', 500);
    }
}
