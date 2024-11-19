export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { generateOTP, toError, toJSON } from '~/libs/func';
import redis from '~/libs/redisConnection';

type dataType = { userEmail: string};

export async function POST(request: NextRequest) {
    try {
        const OTP = generateOTP();

        const { userEmail }: dataType = await request.json();

        const body = {
            receiver: [userEmail],
            subject: `Mã đăng nhập: ${OTP}`,
            description: {
                otp: OTP,
            },
            template: 'otp',
        };

        const response: any = await fetch('https://mailwtfdev.binhminh19112003.workers.dev/api/mail/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const res = await response.json();

        if (res.success) {
            // const today = new Date();
            await redis.set(userEmail + 'OTP', OTP);
            await redis.expire(userEmail + 'OTP', 60 * 5, 'NX');
            return toJSON("Gửi mã đăng nhập thành công", 200);
        }

        return toError('Gửi mail thất bại', 401);
    } catch (err) {
        return toError('Lỗi trong quá trình gửi mail: ' + err, 500);
    }
}
