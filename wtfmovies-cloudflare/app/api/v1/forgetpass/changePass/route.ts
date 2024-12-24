export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { ObjectId, getSHA256Hash, mongodb, toError, toJSON } from '~/libs/func';
import redis from '~/libs/redisConnection';

type dataType = { newPass: string; userEmail: string };

export async function POST(request: NextRequest) {
    try {
        const { newPass, userEmail }: dataType = await request.json();

        const newHashPassword = await getSHA256Hash(newPass);

        const userAuth = await mongodb()
            .db('user')
            .collection('auth')
            .findOne({ filter: { email: userEmail } });

        if (!userAuth) return toJSON('Email không tồn tại', 400);
        const otpCheck = await redis.get(userEmail + 'OTP');
        if (!otpCheck) return toJSON('Mã đăng nhập không hợp lệ', 401);

        const response = await mongodb()
            .db('user')
            .collection('auth')
            .updateOne({
                filter: { email: userEmail },
                update: { $set: { password: newHashPassword } },
            });

        if (response.modifiedCount === 1) {
            // remove otp auth from redis
            await redis.del(userEmail + 'OTP');
            return toJSON('Thay đổi mật khẩu thành công');
        }

        return toError('Thay đổi mật khẩu thất bại', 404);
    } catch (err) {
        return toError('Lỗi trong quá trình thay đổi mật khẩu', 500);
    }
}
