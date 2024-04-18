import { mongodb } from '~/libs/func';
import { ExtendedUser, FilmInfoInterface, UserInfoInterface } from '../interfaces';
import { auth } from '~/app/api/auth/[...nextauth]/auth';

export const getCaroselFilms = async (): Promise<FilmInfoInterface[]> => {
    const films: FilmInfoInterface[] = await mongodb()
        .db('film')
        .collection('information')
        .aggregate({
            pipeline: [
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
                    $project: {
                        _id: 0,
                        name: 1,
                        searchName: 1,
                        describe: 1,
                        author: '$authorDetails.name',
                        genre: '$genreDetails.name',
                        videoType: 1,
                        views: 1,
                        rating: 1,
                        poster: 1,
                    },
                },
                { $limit: 5 },
            ],
        });

    return films;
};

export const getProposeListFilms = async (): Promise<FilmInfoInterface[]> => {
    const films: FilmInfoInterface[] = await mongodb()
        .db('film')
        .collection('information')
        .find({
            projection: {
                _id: 0,
                img: 1,
                name: 1,
                searchName: 1,
                videoType: 1,
                views: 1,
                rating: 1,
            },
            limit: 10,
            sort: { likes: -1, views: -1, rating: -1 },
        });

    return films;
};

const getFilms = async (limit: number, sort: object, query?: object): Promise<FilmInfoInterface[]> => {
    const films: FilmInfoInterface[] = await mongodb()
        .db('film')
        .collection('information')
        .find({
            filter: query,
            projection: {
                _id: 0,
                img: 1,
                name: 1,
                searchName: 1,
                videoType: 1,
                views: 1,
                rating: 1,
                poster: 1,
            },
            limit: limit,
            sort: sort,
        });

    return films;
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
    }

    const allNewFilms = await getFilms(16, { updateTime: -1, likes: -1, views: -1, rating: -1 });
    const currNewFilms = await getFilms(
        16,
        { updateTime: -1, likes: -1, views: -1, rating: -1 },
        { updateTime: { $gte: start, $lt: end } },
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
    }

    const allHotFilms = await getFilms(16, { views: -1, updateTime: -1, likes: -1, rating: -1 });
    const currHotFilms = await getFilms(
        16,
        { views: -1, updateTime: -1, likes: -1, rating: -1 },
        { updateTime: { $gte: start, $lt: end } },
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
};

export const getCurrentUser = async (): Promise<ExtendedUser | undefined> => {
    const session = await auth();

    const extendedUser: ExtendedUser | undefined = session?.user;

    return extendedUser;
};

export const getCurrentUserInfo = async (): Promise<UserInfoInterface | undefined> => {
    const session = await auth();

    if (!session) return undefined;

    const extendedUser: ExtendedUser | undefined = session?.user;

    const userInfo: UserInfoInterface = await mongodb()
        .db('user')
        .collection('information')
        .findOne({
            filter: { user_id: extendedUser?.user_id },
            projection: {
                _id: 0,
                name: 1,
            },
        });

    userInfo.avatar = extendedUser?.avatar;

    return userInfo;
};
