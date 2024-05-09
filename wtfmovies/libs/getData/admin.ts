import { MongoDate, mongodb } from '~/libs/func';
import {
    AdminReportInfterface,
    FilmHotInterface,
    NumStatisticalInterface,
    TopSixUserInfoInfterface,
    UserAdminInfoInfterface,
} from '../interfaces';
// import { auth } from '~/app/api/auth/[...nextauth]/auth';

// admin dashboard
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
                    { $sort: { views: -1, likes: -1, rating: -1 } },
                    { $limit: 5 },
                ],
            });

        return filmList;
    } catch (err) {
        console.log('😨😨😨 error at admin/getTopHotFilm function : ', err);
        return [];
    }
};

export const getTopHotGenre = async (): Promise<FilmHotInterface[]> => {
    try {
        const genres: FilmHotInterface[] = await mongodb()
            .db('film')
            .collection('genre')
            .aggregate({
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            name: 1,
                            views: 1,
                            rating: 1,
                            likes: 1,
                        },
                    },
                    { $sort: { views: -1, likes: -1, rating: -1 } },
                    { $limit: 5 },
                ],
            });

        return genres;
    } catch (err) {
        console.log('😨😨😨 error at admin/getTopHotGenre function : ', err);
        return [];
    }
};

export const getNewReport = async (): Promise<AdminReportInfterface[]> => {
    try {
        const reports: AdminReportInfterface[] = await mongodb()
            .db('statistical')
            .collection('report')
            .aggregate({
                pipeline: [
                    { $sort: { time: -1 } },
                    {
                        $project: {
                            _id: 0,
                            from: 1,
                            type: 1,
                            time: 1,
                        },
                    },
                    { $limit: 6 },
                ],
            });

        return reports;
    } catch (err) {
        console.log('😨😨😨 error at admin/getNewReport function : ', err);
        return [];
    }
};

export const getTopSixUser = async (): Promise<TopSixUserInfoInfterface[]> => {
    try {
        const userInfo: TopSixUserInfoInfterface[] = await mongodb()
            .db('user')
            .collection('information')
            .find({
                projection: {
                    _id: 0,
                    email: 1,
                    name: 1,
                },
                sort: { name: 1 },
                limit: 6,
            });

        return userInfo;
    } catch (err) {
        console.log('😨😨😨 error at admin/getTopSixUser function : ', err);
        return [];
    }
};

// user manage
export const getAllUser = async (): Promise<UserAdminInfoInfterface[]> => {
    try {
        const userInfo: UserAdminInfoInfterface[] = await mongodb()
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
        console.log('😨😨😨 error at admin/getAllUser function : ', err);
        return [];
    }
};

// report manage
export const getAllReport = async (): Promise<AdminReportInfterface[]> => {
    try {
        const reports: AdminReportInfterface[] = await mongodb()
            .db('statistical')
            .collection('report')
            .aggregate({
                pipeline: [{ $sort: { time: -1 } }],
            });

        return reports;
    } catch (err) {
        console.log('😨😨😨 error at admin/getAllReport function : ', err);
        return [];
    }
};
