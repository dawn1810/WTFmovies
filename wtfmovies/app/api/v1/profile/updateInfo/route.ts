export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { mongodb, toError, toJSON, uploadImagetoTiktok } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

export async function POST(request: NextRequest) {
    const formData: any = await request.formData();
    const imageLink = !!formData.get('image') ? await uploadImagetoTiktok(await formData.get('image')) : undefined;
    const info = await formData.get('info');
    const { name, birthDate, gender } = JSON.parse(info);

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

    const response2 = imageLink
        ? await mongodb()
              .db('user')
              .collection('auth')
              .updateOne({
                  filter: { email: extendedUser?.email },
                  update: { $set: { avatar: imageLink } },
                  upsert: true,
              })
        : undefined;

    if (!response2 && response.modifiedCount === 1) {
        return toJSON('Không cập nhật hình ảnh');
    } else if (response2 && response.modifiedCount === 1 && response2.modifiedCount === 1) {
        return toJSON(imageLink);
    }
    return toError('Cập nhật không thành công!', 400);
}