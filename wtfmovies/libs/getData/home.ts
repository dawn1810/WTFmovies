import { mongodb } from '~/libs/func';
import { CaptionsItemInterface, FilmInfoInterface, FilmsInterFace, TabInterface } from '../interfaces';

interface EpisodeType {
    title: string;
    episode: any[];
}

interface FilmInfo {
    name: string;
    describe: string;
    author: string[];
    genre: string[];
    videoType: EpisodeType[];
    views: number;
    rating: number;
    poster: string;
    img: string;
}

export const getCaroselFilms = async (): Promise<CaptionsItemInterface[]> => {
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

    const mappedFilms: CaptionsItemInterface[] = films.map((film): CaptionsItemInterface => {
        // Calculate the total number of episodes across all video types
        const subsType = film.videoType.find((type) => type.title === 'Subs') as any;
        const totalEpisodes = subsType.episode[subsType.episode.length - 1];

        return {
            img: film.poster,
            name: film.name,
            describe: film.describe,
            infoList: [
                { title: 'Tác giả', info: film.author, type: 'searchAble' },
                { title: 'Thể loại', info: film.genre, type: 'searchAble' },
                { title: 'Số tập', info: totalEpisodes },
                { title: 'Lượt xem', info: film.views },
                { title: 'Đánh giá', info: film.rating },
            ],
        };
    });

    return mappedFilms;
};

export const getProposeListFilms = async (): Promise<FilmsInterFace[]> => {
    const films: FilmInfo[] = await mongodb()
        .db('film')
        .collection('information')
        .find({
            projection: {
                _id: 0,
                img: 1,
                name: 1,
                videoType: 1,
                views: 1,
                rating: 1,
            },
            limit: 10,
            sort: { likes: -1, views: -1, rating: -1 },
        });

    const mappedFilms: FilmsInterFace[] = films.map(({ img, name, videoType, views, rating }): FilmsInterFace => {
        // Calculate the total number of episodes across all video types
        const subsType = videoType.find((type) => type.title === 'Subs') as any;
        const totalEpisodes = subsType.episode[subsType.episode.length - 1];
        return {
            img,
            name,
            views,
            rating,
            episodes: totalEpisodes,
        };
    });

    return mappedFilms;
};

const getFilms = async (limit: number, sort: object, query?: object): Promise<FilmsInterFace[]> => {
    const films: FilmInfo[] = await mongodb()
        .db('film')
        .collection('information')
        .find({
            filter: query,
            projection: {
                _id: 0,
                img: 1,
                name: 1,
                videoType: 1,
                views: 1,
                rating: 1,
                poster: 1,
            },
            limit: limit,
            sort: sort,
        });

    const mappedFilms: FilmsInterFace[] = films.map(
        ({ img, name, videoType, views, rating, poster }): FilmsInterFace => {
            // Calculate the total number of episodes across all video types
            const subsType = videoType.find((type) => type.title === 'Subs') as any;
            const totalEpisodes = subsType.episode[subsType.episode.length - 1];
            return {
                img,
                name,
                views,
                rating,
                poster,
                episodes: totalEpisodes,
            };
        },
    );

    return mappedFilms;
};

export const getNewClassifyFilms = async (
    season: string,
    year: number,
): Promise<{ newFilmTabs: TabInterface[]; mostWatchFilms: FilmsInterFace[] }> => {
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

    const newFilmTabs: TabInterface[] = [
        {
            title: '#TẤT CẢ',
            eventKey: 'all',
            content: allNewFilms,
        },
        {
            title: '#MÙA ĐÔNG - 2024',
            eventKey: 'winterTo2024',
            content: currNewFilms,
        },
        {
            title: '#PHIM BỘ',
            eventKey: 'phimBo',
            content: seriesNewFilms,
        },
        {
            title: '#PHIM LẺ',
            eventKey: 'phimLe',
            content: movieNewFilms,
        },
    ];

    return { newFilmTabs, mostWatchFilms };
};

export const getHotClassifyFilms = async (
    season: string,
    year: number,
): Promise<{ hotFilmTabs: TabInterface[]; mostLikeFilms: FilmsInterFace[] }> => {
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

    const hotFilmTabs: TabInterface[] = [
        {
            title: '#TẤT CẢ',
            eventKey: 'all',
            content: allHotFilms,
        },
        {
            title: '#MÙA ĐÔNG - 2024',
            eventKey: 'winterTo2024',
            content: currHotFilms,
        },
        {
            title: '#PHIM BỘ',
            eventKey: 'phimBo',
            content: seriesHotFilms,
        },
        {
            title: '#PHIM LẺ',
            eventKey: 'phimLe',
            content: movieHotFilms,
        },
    ];

    return { hotFilmTabs, mostLikeFilms };
};
