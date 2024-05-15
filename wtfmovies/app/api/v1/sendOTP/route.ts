export const runtime = 'edge';
import mail from '~/mailTemplate/otpmailTemplate';
import type { NextRequest } from 'next/server';
import { generateOTP, mongodb, toError, toJSON } from '~/libs/func';
import CacheManager from '~/cache';

type dataType = { userEmail: string; userName: string };

export async function POST(request: NextRequest) {
    try {
        const OTP = generateOTP();
        const cacheManager = CacheManager.getInstance();

        const { userEmail, userName }: dataType = await request.json();

        const body = {
            receiver: [
                {
                    name: userName[0],
                    email: userEmail,
                },
            ],
            subject: `Mã đăng nhập: ${OTP}`,
            description: mail(OTP),
            mail_type: 'text/html',
        };

        const response = await fetch('https://mailwtfdev.binhminh19112003.workers.dev/api/mail/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            cacheManager.set('otp', OTP, 30); // set cache in 30s
            return toJSON('Gửi mail thành công', 200);
        }

        return toError('Gửi mail thất bại', 400);
    } catch (err) {
        return toError('Lỗi trong quá trình gửi mail', 500);
    }
}
