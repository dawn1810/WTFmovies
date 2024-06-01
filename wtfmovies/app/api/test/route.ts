import { mongodb, toError, toJSON } from '~/libs/func';
export const runtime = 'edge';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const currTable: any[] = await mongodb()
            .db('evaluate')
            .collection('table')
            .find({
                sort: { time: -1 },
                limit: 1,
            });

        return toJSON(currTable);
    } catch (err) {
        return toError('Lỗi ' + err, 500);
    }
}
