export const runtime = 'edge';
import mail from '~/mailTemplate/otpmailTemplate';
import type { NextRequest } from 'next/server';
import { MongoDate, generateOTP, mongodb, toError, toJSON } from '~/libs/func';

type dataType = { userEmail: string; userName: string };

export async function POST(request: NextRequest) {
    try {
        const OTP = generateOTP();

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

        const response: any = await fetch('https://mailwtfdev.binhminh19112003.workers.dev/api/mail/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const res = await response.json();

        if (res.success) {
            const today = new Date();
            const newOTP = await mongodb()
                .db('user')
                .collection('otpstore')
                .insertOne({
                    otp: OTP,
                    createAt: MongoDate(today),
                });

            if (!!newOTP) return toJSON(newOTP.insertedId, 200);
            else return toError('Lưu mã đăng nhập thất bại', 400);
        }

        return toError('Gửi mail thất bại', 401);
    } catch (err) {
        return toError('Lỗi trong quá trình gửi mail', 500);
    }
}
