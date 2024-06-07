export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

type dataType = { collection: 'actor' | 'author' | 'director' | 'genre' };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return toError('Xác thực thất bại', 401);

        const extendedUser: ExtendedUser | undefined = session?.user;
        const { collection }: dataType = await request.json();

        if (extendedUser?.role === 'editor' || extendedUser?.role === 'admin') {
            const data: any[] = await mongodb()
                .db('film')
                .collection(collection)
                .find();

            return toJSON(data.map(item => {
                const firstLetter = item.name.charAt(0);
                return {
                    title: item.name,
                    id: item._id,
                    firstLetter: firstLetter
                };
            }));


        } else {
            return toError('Api không trong phạm trù quyền của bạn', 403);
        }
    } catch (err) {
        console.log(err);

        return toError('Lỗi trong quá trình lấy thông tin', 500);
    }
}
