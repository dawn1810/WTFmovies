export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { mongodb, reply, toError } from '~/libs/func';
import { auth } from '../../auth/[...nextauth]/auth';
import { ExtendedUser } from '~/libs/interfaces';

interface dataType {
    name: string;
    birthDate: string;
    gender: number;
}

export async function POST(request: NextRequest) {
    const { name, birthDate, gender }: dataType = await request.json();

    const session = await auth();

    if (!session) return undefined;

    const extendedUser: ExtendedUser | undefined = session?.user;

    const response = await mongodb()
        .db('user')
        .collection('information')
        .updateOne({
            filter: { email: extendedUser?.email },
            update: { $set: { name, birthDate, gender } },
            upsert: true,
        });

    if (response.modifiedCount === 1) {
        return reply();
    }
    return toError('Cập nhật không thành công!', 400);
}
