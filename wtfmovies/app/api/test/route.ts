import { mongodb } from '~/libs/func';
export const runtime = 'edge';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {

    return new Response(JSON.stringify(await mongodb().db('film').collection('information').updateMany({
        filter: {},
        update: {
            "$set": {
                notification: {
                    schedule: 'LỊCH CHIẾU: Thứ 3 hàng tuần trên WTF movie.',
                    notification: 'Không có thông báo gì hếc!'
                }
            }
        }
    }), null, 2));

}
