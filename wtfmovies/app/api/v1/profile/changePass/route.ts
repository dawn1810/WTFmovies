export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { comparePassWord, getSHA256Hash, mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

type dataType = { oldPass: string; newPass: string };

export async function POST(request: NextRequest) {
    const session = await auth();

    if (!session) return undefined;

    const extendedUser: ExtendedUser | undefined = session?.user;
    const { oldPass, newPass }: dataType = await request.json();

    const hashPassword = await getSHA256Hash(oldPass);
    const newHashPassword = await getSHA256Hash(newPass);

    const userAuth = await mongodb()
        .db('user')
        .collection('auth')
        .findOne({ filter: { email: extendedUser?.email } });

    if (!userAuth) return toJSON('Email không tồn tại', 400);

    // have user check password
    const passAuth = await comparePassWord(userAuth.password, hashPassword);

    if (!passAuth) return toJSON('Mật khẩu không chính xác', 401);

    const response = await mongodb()
        .db('user')
        .collection('auth')
        .updateOne({
            filter: { email: extendedUser?.email },
            update: { $set: { password: newHashPassword } },
        });

    if (response.modifiedCount === 1) {
        return toJSON('Thay đổi mật khẩu thành công');
    }

    return toJSON('Thay đổi mật khẩu thất bại');
}
