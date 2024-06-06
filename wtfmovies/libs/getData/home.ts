import { MongoDate, getSessionTime, mongodb } from '~/libs/func';
import { ExtendedUser, FilmInfoInterface, UserInfoInterface } from '../interfaces';
import { auth } from '~/app/api/auth/[...nextauth]/auth';

export const getUserLoveFilm = async (): Promise<string[]> => {
    try {
        const session = await auth();

        if (!session) return [];

        const extendedUser: ExtendedUser | undefined = session?.user;

        const loveList: UserInfoInterface = await mongodb()
            .db('user')
            .collection('information')
            .findOne({
                filter: { email: extendedUser?.email },
                projection: {
                    _id: 0,
                    loveFilms: 1,
                },
            });

        return loveList.loveFilms || [];
    } catch (err) {
        console.log('😨😨😨 error at home/getCaroselFilms function  : ', err);
        return [];
    }
};

export const getCaroselFilms = async (): Promise<{ films: FilmInfoInterface[]; loveFilms: string[] }> => {
    try {
        const loveFilms = await getUserLoveFilm();

        const films: FilmInfoInterface[] = await mongodb()
            .db('film')
            .collection('information')
            .aggregate({
                pipeline: [
                    { $match: { status: { $ne: 'delete' } } },

                    { $sort: { releaseYear: -1, updateTime: -1 } }, // Assuming you want newer updates and releases first
                    {
                        $lookup: {
                            from: 'author',
                            let: { authorIds: '$author' }, // Define the local variable authorIds
                            pipeline: [
                                { $match: { $expr: { $in: ['$_id', '$$authorIds'] } } }, // Match the author ids
                                { $project: { _id: 0, name: 1 } }, // Get name only
                                { $limit: 3 },
                            ],
                            as: 'authorDetails',
                        },
                    },
                    {
                        $lookup: {
                            from: 'genre',
                            let: { genreIds: '$genre' }, // Define the local variable genreIds
                            pipeline: [
                                { $match: { $expr: { $in: ['$_id', '$$genreIds'] } } }, // Match the genre ids
                                { $project: { _id: 0, name: 1 } }, // Get name only
                                { $limit: 3 },
                            ],
                            as: 'genreDetails',
                        },
                    },
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
                            film_id: 1,
                            name: 1,
                            searchName: 1,
                            describe: 1,
                            author: '$authorDetails.name',
                            genre: '$genreDetails.name',
                            videoType: 1,
                            views: 1,
                            rating: { $round: [{ $avg: '$reviews.rating' }, 1] },
                            poster: 1,
                        },
                    },
                    { $limit: 5 },
                ],
            });

        return { films, loveFilms };
    } catch (err) {
        console.log('😨😨😨 error at home/getCaroselFilms function  : ', err);
        return { films: [], loveFilms: [] };
    }
};

export const getProposeListFilms = async (): Promise<FilmInfoInterface[]> => {
    try {
        const films: FilmInfoInterface[] = await mongodb()
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
                            film_id: 1,
                            img: 1,
                            name: 1,
                            searchName: 1,
                            videoType: 1,
                            views: 1,
                            rating: { $round: [{ $avg: '$reviews.rating' }, 1] },
                        },
                    },
                    { $limit: 10 },
                    { $sort: { likes: -1, views: -1, rating: -1 } },
                ],
            });

        return films;
    } catch (err) {
        console.log('😨😨😨 at home/getProposeListFilms function  : ', err);
        return [];
    }
};

const getFilms = async (limit: number, sort: object, query?: object): Promise<FilmInfoInterface[]> => {
    try {
        const queryMatch = query ? { $match: query } : { $match: {} };
        const films: FilmInfoInterface[] = await mongodb()
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

export const getNewClassifyFilms = async (
    season: string,
    year: number,
): Promise<{
    allNewFilms: FilmInfoInterface[];
    currNewFilms: FilmInfoInterface[];
    seriesNewFilms: FilmInfoInterface[];
    movieNewFilms: FilmInfoInterface[];
    mostWatchFilms: FilmInfoInterface[];
}> => {
    try {
        let { start, end } = getSessionTime(season, year);

        const allNewFilms = await getFilms(16, { updateTime: -1, likes: -1, views: -1, rating: -1 });
        const currNewFilms = await getFilms(
            16,
            { updateTime: -1, likes: -1, views: -1, rating: -1 },
            { releaseYear: { $gte: MongoDate(start), $lt: MongoDate(end) } },
        );
        const seriesNewFilms = await getFilms(
            16,
            { updateTime: -1, likes: -1, views: -1, rating: -1 },
            { 'videoType.episode.1': { $exists: true } },
        );
        const movieNewFilms = await getFilms(
            16,
            { updateTime: -1, likes: -1, views: -1, rating: -1 },
            { 'videoType.episode.1': { $exists: false } },
        );

        const mostWatchFilms = await getFilms(8, { views: -1, likes: -1, rating: -1 });

        return { allNewFilms, currNewFilms, seriesNewFilms, movieNewFilms, mostWatchFilms };
    } catch (err) {
        console.log('😨😨😨 error at home/getNewClassifyFilms function  : ', err);
        return {
            allNewFilms: [],
            currNewFilms: [],
            seriesNewFilms: [],
            movieNewFilms: [],
            mostWatchFilms: [],
        };
    }
};

export const getHotClassifyFilms = async (
    season: string,
    year: number,
): Promise<{
    allHotFilms: FilmInfoInterface[];
    currHotFilms: FilmInfoInterface[];
    seriesHotFilms: FilmInfoInterface[];
    movieHotFilms: FilmInfoInterface[];
    mostLikeFilms: FilmInfoInterface[];
}> => {
    try {
        let { start, end } = getSessionTime(season, year);

        const allHotFilms = await getFilms(16, { views: -1, updateTime: -1, likes: -1, rating: -1 });
        const currHotFilms = await getFilms(
            16,
            { views: -1, updateTime: -1, likes: -1, rating: -1 },
            { updateTime: { $gte: MongoDate(start), $lt: MongoDate(end) } },
        );
        const seriesHotFilms = await getFilms(
            16,
            { views: -1, updateTime: -1, likes: -1, rating: -1 },
            { 'videoType.episode.1': { $exists: true } },
        );
        const movieHotFilms = await getFilms(
            16,
            { views: -1, updateTime: -1, likes: -1, rating: -1 },
            { 'videoType.episode.1': { $exists: false } },
        );

        const mostLikeFilms = await getFilms(8, { likes: -1, views: -1, rating: -1 });

        return { allHotFilms, currHotFilms, seriesHotFilms, movieHotFilms, mostLikeFilms };
    } catch (err) {
        console.log('😨😨😨 error at home/getHotClassifyFilms function  : ', err);
        return {
            allHotFilms: [],
            currHotFilms: [],
            seriesHotFilms: [],
            movieHotFilms: [],
            mostLikeFilms: [],
        };
    }
};

export const getCurrentUser = async (): Promise<ExtendedUser | undefined> => {
    try {
        const session = await auth();

        const extendedUser: ExtendedUser | undefined = session?.user;

        return extendedUser;
    } catch (err) {
        console.log('😨😨😨 error at home/getCurrentUser function  : ', err);
    }
};

export const getCurrentUserInfo = async (): Promise<UserInfoInterface | undefined> => {
    try {
        const session = await auth();

        if (!session) return undefined;

        const extendedUser: ExtendedUser | undefined = session?.user;

        const userInfo: UserInfoInterface = await mongodb()
            .db('user')
            .collection('information')
            .findOne({
                filter: { email: extendedUser?.email },
                projection: {
                    _id: 0,
                    name: 1,
                },
            });

        userInfo.avatar = extendedUser?.avatar;

        return userInfo;
    } catch (err) {
        console.log('😨😨😨 error at home/getCurrentUserInfo function  : ', err);
    }
};
