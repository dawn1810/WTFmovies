import { MongoDate, ObjectId, mongodb, toJSON } from '~/libs/func';
export const runtime = 'edge';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    // const today = new Date();
    const data: any = await mongodb()
        .db('user')
        .collection('otpstore')
        .deleteOne({
            filter: { _id: ObjectId('6645d16057e7c708430affda'), otp: '9DGaz' },
        });
    return toJSON(data);
}
