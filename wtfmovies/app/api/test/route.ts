import { MongoDate, ObjectId, mongodb, preprocessString, toError, toJSON } from '~/libs/func';
export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { GenresDatasetInterface } from '~/libs/interfaces';

const getFilms = async (): Promise<any> => {
    try {
        const search: GenresDatasetInterface[] = await mongodb()
            .db('statistical')
            .collection('search')
            .aggregate({
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            content: 1,
                            time: 1,
                        },
                    },
                    { $limit: 5 },
                    { $sort: { time: -1 } },
                ],
            });

        return search;
    } catch (err) {
        console.log('😨😨😨 error at home/getFilms function  : ', err);
        return [];
    }
};

export async function GET(request: NextRequest) {
    try {
        return toJSON(await getFilms());
    } catch (err) {
        return toError('Lỗi ' + err, 500);
    }
}
