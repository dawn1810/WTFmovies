export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

type dataType = { name: string, typeInfo: 'actor' | 'author' | 'director' | 'genre' };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return toError('Xác thực thất bại', 401);

        const extendedUser: ExtendedUser | undefined = session?.user;
        const { name, typeInfo }: dataType = await request.json();

        if (extendedUser?.role === 'editor') {
            const response = await mongodb()
                .db('film')
                .collection(typeInfo)
                .insertOne({ name: name });

            if (response.insertedId)
                return toJSON({ statusCode: 200, content: response.insertedId });
            else return toError({ statusCode: 404, content: 'wrong data' }, 200);

        } else {
            return toError('Api không trong phạm trù quyền của bạn', 403);
        }
    } catch (err) {
        return toError('Lỗi trong quá trình lấy thông tin', 500);
    }
}
