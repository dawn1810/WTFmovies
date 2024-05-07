import { MongoDate, mongodb } from '~/libs/func';
import { FilmHotInterface, NumStatisticalInterface } from '../interfaces';
// import { auth } from '~/app/api/auth/[...nextauth]/auth';

export const getNumberStatistical = async (): Promise<NumStatisticalInterface[]> => {
    try {
        const statInfo: NumStatisticalInterface[] = await mongodb()
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
        return [];
    }
};

export const getTopHotFilm = async (): Promise<FilmHotInterface[]> => {
    try {
        const filmList: FilmHotInterface[] = await mongodb()
            .db('film')
            .collection('information')
            .aggregate({
                pipeline: [
                    { $sort: { weekViews: -1, likes: -1 /* add rating hear too how ??? */ } },
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
                            views: '$weekViews',
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
        return [];
    }
};

export const getAllUser = async (): Promise<any[]> => {
    try {
        const userInfo: any[] = await mongodb()
            .db('user')
            .collection('information')
            .aggregate({
                pipeline: [
                    { $sort: { name: 1 } },
                    {
                        $lookup: {
                            from: 'auth',
                            localField: 'email',
                            foreignField: 'email',
                            as: 'auth',
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            id: '$email',
                            name: 1,
                            birthDate: 1,
                            gender: 1,
                            status: '$auth.status',
                            role: '$auth.role',
                        },
                    },
                ],
            });

        return userInfo;
    } catch (err) {
        console.log('😨😨😨 error at admin/getTopHotFilm function : ', err);
        return [];
    }
};
