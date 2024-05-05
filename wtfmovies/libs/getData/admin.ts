import { mongodb } from '~/libs/func';
import { ExtendedUser } from '../interfaces';
import { auth } from '~/app/api/auth/[...nextauth]/auth';

export const getNumberStatistical = async (): Promise<any> => {
    try {
        const statInfo: any[] = await mongodb()
            .db('statistical')
            .collection('webstats')
            .find({
                projection: {
                    _id: 0,
                },
            });

        return statInfo;
    } catch (err) {
        console.log('😨😨😨 error at admin/getNumberStatistical function : ', err);
    }
};

export const getTopHotFilm = async (): Promise<any> => {
    try {
        const filmList: any[] = await mongodb()
            .db('film')
            .collection('information')
            .aggregate({
                pipeline: [
                    { $sort: { views: -1, likes: -1 /* add rating hear too how ??? */ } },
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
                            name: 1,
                            views: 1,
                            likes: 1,
                            rating: { $round: [{ $avg: '$reviews.rating' }, 1] },
                        },
                    },
                    { $limit: 5 },
                ],
            });

        return filmList;
    } catch (err) {
        console.log('😨😨😨 error at admin/getTopHotFilm function : ', err);
    }
};
