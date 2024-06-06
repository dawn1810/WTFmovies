import { MongoDate, mongodb, toError, toJSON } from '~/libs/func';
export const runtime = 'edge';
import type { NextRequest } from 'next/server';

const getFilms = async (limit: number, sort: object, query?: object): Promise<any[]> => {
    try {
        const queryMatch = query ? { $match: query } : { $match: {} };
        const films: any[] = await mongodb()
            .db('film')
            .collection('information')
            .aggregate({
                pipeline: [
                    { $match: { status: { $ne: 'delete' } } },

                    queryMatch,
                    {
                        $lookup: {
                            from: 'episode',
                            localField: 'film_id',
                            foreignField: 'film_id',
                            as: 'reviews',
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            img: 1,
                            name: 1,
                            searchName: 1,
                            videoType: 1,
                            views: 1,
                            rating: { $round: [{ $avg: '$reviews.rating' }, 1] },
                            poster: 1,
                        },
                    },

                    { $limit: limit },
                    { $sort: sort },
                ],
            });

        return films;
    } catch (err) {
        console.log('😨😨😨 error at home/getFilms function  : ', err);
        return [];
    }
};

export const getSessionTime = (season: string, year: number) => {
    let start, end;

    switch (season) {
        case 'winter':
            start = new Date(`${year}-12-01`);
            end = new Date(`${year + 1}-03-01`);
            break;
        case 'spring':
            start = new Date(`${year}-03-01`);
            end = new Date(`${year}-06-01`);
            break;
        case 'summer':
            start = new Date(`${year}-06-01`);
            end = new Date(`${year}-09-01`);
            break;
        case 'autumn':
            start = new Date(`${year}-09-01`);
            end = new Date(`${year}-12-01`);
            break;
        default:
            start = new Date(`${year}-03-01`);
            end = new Date(`${year}-06-01`);
            break;
    }

    return { start, end };
};

export async function GET(request: NextRequest) {
    try {
        const { start, end } = getSessionTime('summer', 2024);
        console.log(end);

        const currNewFilms = await getFilms(
            16,
            { updateTime: -1, likes: -1, views: -1, rating: -1 },
            { updateTime: { $lt: MongoDate(new Date(start)) } },
        );

        return toJSON(currNewFilms);
    } catch (err) {
        return toError('Lỗi ' + err, 500);
    }
}
