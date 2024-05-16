export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { ObjectId, getSHA256Hash, mongodb, toError, toJSON } from '~/libs/func';

type dataType = { otp: string; otpId: string; newPass: string; userEmail: string };

export async function POST(request: NextRequest) {
    try {
        const { otp, otpId, newPass, userEmail }: dataType = await request.json();

        const newHashPassword = await getSHA256Hash(newPass);

        const userAuth = await mongodb()
            .db('user')
            .collection('auth')
            .findOne({ filter: { email: userEmail } });

        if (!userAuth) return toJSON('Email không tồn tại', 400);

        const otpCheck = await mongodb()
            .db('user')
            .collection('otpstore')
            .findOne({
                filter: { _id: ObjectId(otpId) },
                projection: {
                    _id: 0,
                    otp: 1,
                },
            });

        if (!!otpCheck && otpCheck.otp !== otp) return toJSON('Mã đăng nhập không hợp lệ', 401);

        const response = await mongodb()
            .db('user')
            .collection('auth')
            .updateOne({
                filter: { email: userEmail },
                update: { $set: { password: newHashPassword } },
            });

        if (response.modifiedCount === 1) {
            return toJSON('Thay đổi mật khẩu thành công');
        }

        return toJSON('Thay đổi mật khẩu thất bại');
    } catch (err) {
        return toError('Lỗi trong quá trình thay đổi mật khẩu', 500);
    }
}
