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
                    searchName: 1,
                },
            });
        const updatedGenres = genres.map((genre: { searchName: any; }) => ({
            ...genre,
            to: '/search?query=' + genre.searchName + '&type=genre',
        }));
        const combinedGenres = [...defautlGenres, ...updatedGenres];



        return combinedGenres;
    } catch (err) {
        console.log('😨😨😨 error at search/getGenres function  : ', err);
    }
};


export const getSearch = async ({ query, type }: { query: string, type: string }): Promise<{ poster: string; name: string; views: number, rating: number, episodes: number, searchName: string, releaseYear: string }[] | undefined> => {
    try {
        switch (type) {
            case 'genre':
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
                                        { $project: { _id: 0, searchName: 1 } }, // Get name only
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
                                    poster: 1,
                                    name: 1,
                                    releaseYear: 1,
                                    views: 1,
                                    searchName: 1,
                                    genreInfo: '$genreDetails.searchName',
                                    episodes: { $arrayElemAt: [{ $arrayElemAt: ['$videoType.episode', 0] }, -1] },
                                    rating: { $round: [{ $avg: '$reviews.rating' }, 1] },
                                },
                            },
                            {
                                $match: {
                                    genreInfo: {
                                        $elemMatch: { $regex: query, $options: "i" }
                                    }
                                }
                            },
                            { $limit: 10 },
                            { $sort: { likes: -1, views: -1, rating: -1 } },
                        ],
                    });


            default:
                return await mongodb()
                    .db('film')
                    .collection('information')
                    .find();


        }
    } catch (err) {
        console.log('😨😨😨 error at search/getSearch function: ', err);
    }
};
