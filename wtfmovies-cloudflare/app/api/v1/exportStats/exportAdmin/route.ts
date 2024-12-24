export const runtime = 'edge';
import type { NextRequest, NextResponse } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

export async function GET(req: NextRequest) {
    try {
        const session = await auth();

        if (!session) return toError('Xác thực thất bại', 401);

        const extendedUser: ExtendedUser | undefined = session?.user;

        if (extendedUser?.role !== 'admin') return toError('Api không trong phạm trù quyền của bạn', 403);

        const base64Data = await mongodb()
            .db('statistical')
            .collection('template')
            .findOne({
                filter: {},
                projection: {
                    _id: 0,
                    adminGeneral: 1,
                },
            });

        return toJSON({
            content: 'Lấy template thành công',
            excelTemplate: base64Data,
        });
    } catch (err) {
        console.log('Lỗi trong quá trình gửi exceltemplate' + err);
        return toError('Lỗi trong quá trình gửi exceltemplate', 500);
    }
}
