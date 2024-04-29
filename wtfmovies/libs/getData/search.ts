import { mongodb } from '~/libs/func';

interface SearchInterface {
    name: string;
    searchName: string;
}

export const getGenres = async (): Promise<{ name: string; to: string; special?: boolean | undefined; }[] | undefined> => {
    try {

        const defautlGenres = [
            { name: 'Tất cả', to: '/', special: true },
            { name: 'Thịnh hành', to: '/search?query=hot&type=genre', special: true },
            { name: 'Mới', to: '/search?query=new&type=genre', special: true },
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
        const updatedGenres = genres.map((genre: { name: any; }) => ({
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
    views: number,
    rating: number,
    episodes: number,
    searchName: string,
    releaseYear: string
    status: string,
    author: string[],
    tag: string[],
    maxEp: number;
    genre: string[],
}

async function getSerachByType(type: string, query: string, limit: number, full = false) {
    const match = full ? {} : {
        [type]: {
            $elemMatch: { $regex: query, $options: "i" }
        }
    }
    return await mongodb()
        .db('film')
        .collection('information')
        .aggregate({
            pipeline: [

                {
                    $lookup: {
                        from: 'genre',
                        let: { genreIds: '$genre' }, // Define the local variable genreIds
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $in: ['$_id', '$$genreIds'] },
                                }
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
                        let: { tagIds: '$tag' }, // Define the local variable genreIds
                        pipeline: [
                            { $match: { $expr: { $in: ['$_id', '$$tagIds'] } } }, // Match the genre ids
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
                    $project: {
                        _id: 0,
                        poster: 1,
                        name: 1,
                        releaseYear: 1,
                        views: 1,
                        searchName: 1,
                        maxEp: 1,
                        status: 1,
                        author: '$authorDetails.name',
                        tag: '$tagDetails.name',
                        genre: '$genreDetails.name',
                        episodes: { $arrayElemAt: [{ $arrayElemAt: ['$videoType.episode', 0] }, -1] },
                        rating: { $round: [{ $avg: '$reviews.rating' }, 1] },
                    },
                },
                {
                    $match: match
                },
                { $limit: limit },
                { $sort: { likes: -1, views: -1, rating: -1 } },
            ],
        });
}


export const getSearch = async ({ query, type }: { query: string, type: string }): Promise<SearchInterface[] | undefined> => {
    try {
        switch (type) {
            case 'genre':
                return await getSerachByType(type, query, 30);



            default:
                return await getSerachByType(type, query, 30, true);



        }
    } catch (err) {
        console.log('😨😨😨 error at search/getSearch function: ', err);
    }
};
