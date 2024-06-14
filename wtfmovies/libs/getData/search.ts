import { mongodb } from '~/libs/func';
import { SearchData } from '../interfaces';

interface SearchInterface {
    name: string;
    searchName: string;
}

export const getGenres = async (): Promise<
    { name: string; to: string; special?: boolean | undefined }[] | undefined
> => {
    try {
        const defautlGenres = [
            { name: 'Tất cả', to: '/search', special: true },
            { name: 'Thịnh hành', to: '/search?query=hot&type=rcm', special: true },
            { name: 'Mới', to: '/search?query=new&type=rcm', special: true },
        ];
        const genres: SearchInterface | any = await mongodb()
            .db('film')
            .collection('genre')
            .find({
                filter: {},
                projection: {
                    _id: 0,
                    name: 1,
                },
            });
        const updatedGenres = genres.map((genre: { name: any }) => ({
            ...genre,
            to: '/search?query=' + genre.name + '&type=genre',
        }));
        const combinedGenres = [...defautlGenres, ...updatedGenres];

        return combinedGenres;
    } catch (err) {
        console.log('😨😨😨 error at search/getGenres function  : ', err);
    }
};
interface SearchInterface {
    poster: string;
    name: string;
    views: number;
    rating: number;
    episodes: number;
    searchName: string;
    releaseYear: string;
    status: string;
    author: string[];
    tag: string[];
    maxEp: number | null;
    genre: string[];
}

async function getSerachByType(type: string, query: string, limit: number, full = false, customMatch: any = null, customSort: any = null) {
    const match = full
        ? {}
        : customMatch ? customMatch : {
            [type]: { $regex: `(?i)${query}` },
        };

    return await mongodb()
        .db('film')
        .collection('information')
        .aggregate({
            pipeline: [
                { $match: { status: { $ne: 'delete' } } },

                {
                    $lookup: {
                        from: 'genre',
                        let: { genreIds: '$genre' }, // Define the local variable genreIds
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $in: ['$_id', '$$genreIds'] },
                                },
                            }, // Match the genre ids
                            { $project: { _id: 0, name: 1 } }, // Get name only
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
                    $lookup: {
                        from: 'tag',
                        localField: 'tag',
                        foreignField: '_id',
                        pipeline: [
                            { $project: { _id: 0, name: 1 } }, // Get name only
                        ],
                        as: 'tagDetails',
                    },
                },
                {
                    $lookup: {
                        from: 'author',
                        let: { authorIds: '$author' }, // Define the local variable genreIds
                        pipeline: [
                            { $match: { $expr: { $in: ['$_id', '$$authorIds'] } } }, // Match the genre ids
                            { $project: { _id: 0, name: 1 } }, // Get name only
                        ],
                        as: 'authorDetails',
                    },
                },
                {
                    $lookup: {
                        from: 'director',
                        let: { directorIds: '$director' }, // Define the local variable genreIds
                        pipeline: [
                            { $match: { $expr: { $in: ['$_id', '$$directorIds'] } } }, // Match the genre ids
                            { $project: { _id: 0, name: 1 } }, // Get name only
                        ],
                        as: 'directorDetails',
                    },
                },
                {
                    $lookup: {
                        from: 'actor',
                        let: { actorIds: '$actor' }, // Define the local variable genreIds
                        pipeline: [
                            { $match: { $expr: { $in: ['$_id', '$$actorIds'] } } }, // Match the genre ids
                            { $project: { _id: 0, name: 1 } }, // Get name only
                        ],
                        as: 'actorDetails',
                    },
                },
                {
                    $project: {
                        _id: 0,
                        poster: 1,
                        name: 1,
                        releaseYear: 1,
                        releaseYeartoS: { $year: "$releaseYear" },
                        views: 1,
                        searchName: 1,
                        maxEp: 1,
                        status: 1,
                        updateTime: 1,
                        author: '$authorDetails.name',
                        tag: '$tagDetails.name',
                        genre: '$genreDetails.name',
                        director: '$directorDetails.name',
                        actor: '$actorDetails.name',
                        episodes: { $arrayElemAt: [{ $arrayElemAt: ['$videoType.episode', 0] }, -1] },
                        rating: { $round: [{ $avg: '$reviews.rating' }, 1] },
                    },
                },
                {
                    $match: match,
                },
                { $limit: limit },
                { $sort: customSort ? customSort : { likes: -1, views: -1, rating: -1 } },
            ],
        });
}

export const getSearch = async ({
    query,
    type,
}: {
    query?: string;
    type?: string;
}): Promise<SearchInterface[] | undefined> => {
    try {
        const searchable = ['director', 'genre', 'author', 'actor', 'name']
        if (searchable.includes(type ?? ''))
            return await getSerachByType(type ?? '', query ?? '', 30);
        else
            return await getSerachByType(type ?? '', query ?? '', 30, true);
    } catch (err) {
        console.log('😨😨😨 error at search/getSearch function: ', err);
    }
};

// function getSeason(date: Date) {
//     const month = date.getMonth() + 1; // getMonth() trả về giá trị từ 0-11, nên cần +1 để có tháng 1-12
//     const day = date.getDate();

//     if ((month == 3 && day >= 20) || (month > 3 && month < 6) || (month == 6 && day < 21)) {
//         return "spring";
//     } else if ((month == 6 && day >= 21) || (month > 6 && month < 9) || (month == 9 && day < 23)) {
//         return "summer";
//     } else if ((month == 9 && day >= 23) || (month > 9 && month < 12) || (month == 12 && day < 21)) {
//         return "fall";
//     } else {
//         return "winter";
//     }
// }
export const getAvdSearch = async ({
    sortName,
    sortTime,
    sortView,
    sortReview,
    typefilm,
    // seasion,
    year,
    genres,
    avd,
}: SearchData): Promise<SearchInterface[] | undefined> => {
    try {
        if (year === undefined || genres === undefined || sortName === undefined || sortTime === undefined || sortView === undefined || sortReview === undefined || typefilm === undefined || avd === undefined) return;
        let match: any = {
            genre: { $in: genres.split(',') },
            releaseYeartoS: (year !== 'old') ? parseInt(year) : { $lte: (new Date()).getFullYear() - 13 }
        };
        if (['le', 'full'].includes(typefilm)) {
            if (typefilm == 'full')
                match = {
                    maxEp: { $gte: 1 },
                    genre: { $in: genres.split(',') },
                    releaseYeartoS: (year !== 'old') ? parseInt(year) : { $lte: (new Date()).getFullYear() - 13 }

                };
            else if (typefilm == 'le')
                match = {
                    maxEp: { $eq: 1 },
                    genre: { $in: genres.split(',') },
                    releaseYeartoS: (year !== 'old') ? parseInt(year) : { $lte: (new Date()).getFullYear() - 13 }

                };
        }
        else {
            match = {
                status: typefilm,
                genre: { $in: genres.split(',') },
                releaseYeartoS: (year !== 'old') ? parseInt(year) : { $lte: (new Date()).getFullYear() - 13 }
            };
        };

        match = Object.fromEntries(Object.entries(match).filter(([key, value]: any) => {
            if (!value) return false; // Loại bỏ nếu giá trị là chuỗi rỗng
            if (key === 'genre' && value.$in.includes('')) return false; // Loại bỏ nếu genre.$in chỉ chứa chuỗi rỗng
            return true; // Giữ lại các key khác
        }));
        console.log(match);

        let sortOptions: any = { updateTime: parseInt(sortTime), views: parseInt(sortView), rating: parseInt(sortReview), name: parseInt(sortName) };

        // Filter out keys with values of 0
        sortOptions = Object.fromEntries(Object.entries(sortOptions).filter(([key, value]) => value !== 0));
        return await getSerachByType('null', 'null', 30, false, match, sortOptions);
    } catch (err) {
        console.log('😨😨😨 error at search/getAvdSearch function: ', err);
    }
};


