export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { mongodb, reply, toError, toJSON, uploadImagetoTiktok } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

interface dataType {
    name: string;
    birthDate: string;
    gender: number;
}

export async function POST(request: NextRequest) {
    // const { name, birthDate, gender, formData }: dataType = await request.json();
    const formData: any = await request.formData();
    const imageLink = await uploadImagetoTiktok(await formData.get('image'));
    const { name, birthDate, gender } = await formData.get('info');

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

    const response2 = await mongodb()
        .db('user')
        .collection('auth')
        .updateOne({
            filter: { email: extendedUser?.email },
            update: { $set: { avatar: imageLink } },
            upsert: true,
        });

    if (response.modifiedCount === 1 && response2.modifiedCount === 1) {
        return toJSON(imageLink);
    }
    return toError('Cập nhật không thành công!', 400);
}
