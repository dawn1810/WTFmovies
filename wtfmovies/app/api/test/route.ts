import { mongodb, toError, toJSON } from '~/libs/func';
export const runtime = 'edge';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const response = await mongodb()
            .db('user')
            .collection('information')
            .find({
                filter: {
                    loveFilms: { $in: ['PLdM751AKK4aO-1m2VuDCEKL40SUMnkUI9'] },
                },
                projection: {
                    _id: 1,
                },
            });

        return toJSON(response);
    } catch (err) {
        return toError('Lỗi ' + err, 500);
    }
}
