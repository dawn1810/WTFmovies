export const runtime = 'edge';
import mail from '~/mailTemplate/otpmailTemplate';
import type { NextRequest } from 'next/server';
import { MongoDate, mongodb, toError, toJSON } from '~/libs/func';

type dataType = { otp: string; userEmail: string };

export async function POST(request: NextRequest) {
    try {
        const { otp, userEmail }: dataType = await request.json();

        const response = await mongodb()
            .db('user')
            .collection('otpstore')
            .findOne({
                filter: { email: userEmail },
                projection: {
                    _id: 0,
                    otp: 1,
                },
            });

        if (!!response) {
            if (response.otp === otp) return toJSON('Thay đổi trạng thái thành công');
            else return toError('Gửi mã đăng nhập không chính xác', 400);
        }

        return toError('Gửi email không hợp lệ', 401);
    } catch (err) {
        return toError('Lỗi trong kiểm tra mã đang nhập', 500);
    }
}
