export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { ObjectId, mongodb, toError, toJSON } from '~/libs/func';
import redis from '~/libs/redisConnection';

type dataType = { otp: string; userEmail: string };

export async function POST(request: NextRequest) {
    try {
        const { otp, userEmail }: dataType = await request.json();
        const authOTP = await redis.get(userEmail + 'OTP');
        if (!!authOTP && authOTP === otp) {
            await redis.set(userEmail + 'OTP', true);
            await redis.expire(userEmail + 'OTP', 60 * 5, 'XX');
            return toJSON('Xác thực thành công', 200);
        }

        return toError('Mã đăng nhập không hợp lệ', 401);
    } catch (err) {
        return toError('Lỗi trong kiểm tra mã đang nhập', 500);
    }
}
