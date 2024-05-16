export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { ObjectId, mongodb, toError, toJSON } from '~/libs/func';

type dataType = { otp: string; otpId: string };

export async function POST(request: NextRequest) {
    try {
        const { otp, otpId }: dataType = await request.json();

        const response = await mongodb()
            .db('user')
            .collection('otpstore')
            .findOne({
                filter: { _id: ObjectId(otpId) },
                projection: {
                    _id: 0,
                    otp: 1,
                },
            });

        if (!!response && response.otp === otp) {
            const newOTP = await mongodb().db('user').collection('otpstore').insertOne({
                otp: otp,
            });

            if (!!newOTP) return toJSON(newOTP.insertedId, 200);
            else return toError('Tái thiết lập otp thất bại', 400);
        }

        return toError('Mã đăng nhập không hợp lệ', 401);
    } catch (err) {
        return toError('Lỗi trong kiểm tra mã đang nhập', 500);
    }
}
