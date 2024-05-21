import { mongodb, toError, toJSON } from '~/libs/func';
export const runtime = 'edge';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const authorNames = ['Kanehito Yamada', 'aaa', 'bbb'];

        for (const name of authorNames) {
            await mongodb()
                .db('film')
                .collection('author')
                .updateMany({ filter: { name }, update: { $set: { name } }, upsert: true });
        }

        const authors = await mongodb()
            .db('film')
            .collection('author')
            .find({ filter: { name: { $in: authorNames } }, projection: { _id: 1 } });

        return toJSON(authors);
    } catch (err) {
        return toError('Lỗi ' + err, 500);
    }
}
