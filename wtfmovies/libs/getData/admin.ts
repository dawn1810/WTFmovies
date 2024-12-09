import { MongoDate, mongodb } from '~/libs/func';
import {
    AdminCaroselInfterface,
    AdminReportInfterface,
    FilmHotInterface,
    GenresDatasetInterface,
    NumStatisticalInterface,
    NumStatisticalInterfaceE,
    ObjectMongo,
    TopSixUserInfoInfterface,
    UserAdminInfoInfterface,
} from '../interfaces';
// import { auth } from '~/app/api/auth/[...nextauth]/auth';

// admin dashboard
export const getNumberStatistical = async (
    type: 'admin' | string,
): Promise<NumStatisticalInterface[] | NumStatisticalInterfaceE[]> => {
    try {
        const statInfo: NumStatisticalInterface[] = await mongodb()
            .db('statistical')
            .collection('webstats')
            .find({
                filter: { type: type },
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
                    { $match: { status: { $ne: 'delete' } } },
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
                            likes: '$weekLikes',
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
                        $lookup: {
                            from: 'information',
                            let: { genreId: '$_id' },
                            pipeline: [
                                { $match: { $expr: { $in: ['$$genreId', '$genre'] } } },
                                { $project: { _id: 0, film_id: 1, views: '$weekViews', likes: '$weekLikes' } },
                            ],
                            as: 'info',
                        },
                    },
                    {
                        $unwind: '$info',
                    },
                    {
                        $lookup: {
                            from: 'episode',
                            localField: 'info.film_id',
                            foreignField: 'film_id',
                            as: 'episodes',
                        },
                    },
                    {
                        $unwind: '$episodes',
                    },
                    {
                        $group: {
                            _id: '$name',
                            likes: {
                                $sum: '$info.likes',
                            },
                            views: {
                                $sum: '$info.views',
                            },
                            rating: {
                                $avg: '$episodes.rating',
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            name: '$_id',
                            views: 1,
                            rating: 1,
                            likes: 1,
                        },
                    },
                    { $sort: { likes: -1, views: -1, rating: -1 } },
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
                pipeline: [{ $match: { status: { $ne: false } } }, { $sort: { time: -1 } }],
            });

        return reports;
    } catch (err) {
        console.log('😨😨😨 error at admin/getAllReport function : ', err);
        return [];
    }
};

// comment manage
export const getAllComment = async (): Promise<any[]> => {
    try {
        const comments: any[] = await mongodb()
            .db('film')
            .collection('comment')
            .aggregate({
                pipeline: [{ $sort: { time: -1 } }],
            });

        return comments;
    } catch (err) {
        console.log('😨😨😨 error at admin/getAllReport function : ', err);
        return [];
    }
};

// carosel manage
export const getAllCarosel = async (): Promise<AdminCaroselInfterface[]> => {
    try {
        console.log('get carosel');

        const carosel: AdminCaroselInfterface[] = await mongodb()
            .db('film')
            .collection('carosel')
            .aggregate({
                pipeline: [
                    {
                        $lookup: {
                            from: 'information',
                            localField: 'film_id',
                            foreignField: 'film_id',
                            as: 'film_info',
                        },
                    },
                    {
                        $unwind: '$film_info',
                    },
                    {
                        $project: {
                            specialPoster: 1,
                            film_id: 1,
                            film_name: '$film_info.name',
                            poster: '$film_info.poster',
                        },
                    },
                ],
            });

        return carosel;
    } catch (err) {
        console.log('😨😨😨 error at admin/getAllCarosel function : ', err);
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

// search manage
export const getTopSearch = async (): Promise<GenresDatasetInterface[]> => {
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
        console.log('😨😨😨 error at admin/getTopGenres function : ', err);
        return [];
    }
};
