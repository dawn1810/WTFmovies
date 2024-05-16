import { MongoDate, ObjectId, mongodb, toJSON } from '~/libs/func';
export const runtime = 'edge';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    // const today = new Date();
    // const data: any = await mongodb()
    //     .db('user')
    //     .collection('otpstore')
    //     .insertOne({
    //         email: 'binhminh19112003@gmail.com',
    //         otp: 'aaaaa',
    //         createAt: MongoDate(today),
    //     });
    // return toJSON(data);
}
