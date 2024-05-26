import { mongodb } from '~/libs/func';
import { CommentInterface, FilmInfoInterface } from '../interfaces';

export const getFilmReviewInfo = async (filmName: string): Promise<FilmInfoInterface> => {
    try {
        const films: FilmInfoInterface[] = await mongodb()
            .db('film')
            .collection('information')
            .aggregate({
                pipeline: [
                    { $match: { searchName: filmName, status: { $ne: 'delete' } } },
                    {
                        $lookup: {
                            from: 'author',
                            let: { authorIds: '$author' }, // Define the local variable authorIds
                            pipeline: [
                                { $match: { $expr: { $in: ['$_id', '$$authorIds'] } } }, // Match the author ids
                                { $project: { _id: 0, name: 1 } }, // Get name only
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
                            ],
                            as: 'genreDetails',
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
                            from: 'episode',
                            localField: 'film_id',
                            foreignField: 'film_id',
                            as: 'reviews',
                        },
                    },
                    {
                        $lookup: {
                            from: 'country',
                            localField: 'country',
                            foreignField: '_id',
                            as: 'country',
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
                            director: '$directorDetails.name',
                            videoType: 1,
                            views: 1,
                            likes: 1,
                            maxEp: 1,
                            rating: { $round: [{ $avg: '$reviews.rating' }, 1] },
                            img: 1,
                            status: 1,
                            duration: 1,
                            tag: '$tagDetails.name',
                            releaseYear: 1,
                            country: '$country.label',
                            actor: '$actorDetails.name',
                        },
                    },
                    { $limit: 1 },
                ],
            });

        return films[0];
    } catch (err) {
        console.log('😨😨😨 error at review/getFilmReviewInfo function  : ', err);
        return {
            name: '',
            film_id: '',
            searchName: '',
            describe: '',
            author: [],
            genre: [],
            maxEp: null,
            videoType: [],
            views: 0,
            likes: 0,
            rating: 0,
        };
    }
};

interface CommentsFilmsInterface {
    comments: CommentInterface[];
}

export const getAllFilmsComment = async (filmName: string): Promise<CommentInterface[]> => {
    try {
        const comments: CommentsFilmsInterface[] = await mongodb()
            .db('film')
            .collection('information')
            .aggregate({
                pipeline: [
                    { $match: { status: { $ne: 'delete' } } },
                    { $match: { searchName: filmName } },
                    { $match: { comment: { $exists: true, $ne: [] } } },
                    {
                        $lookup: {
                            from: 'comment',
                            let: { commentIds: '$comment' },
                            pipeline: [
                                { $match: { $expr: { $in: ['$_id', '$$commentIds'] } } }, // Match the author ids
                                { $project: { _id: 0 } },
                                { $sort: { time: -1 } },
                            ],
                            as: 'commentDetails',
                        },
                    },
                    {
                        $project: {
                            comments: '$commentDetails',
                        },
                    },
                    { $limit: 1 },
                ],
            });

        if (comments.length > 0 && comments[0].comments.length > 0) {
            return comments[0].comments;
        } else {
            return [];
        }
    } catch (err) {
        console.log('😨😨😨 error at review/getAllFilmsComment function  : ', err);
        return [];
    }
};

// export const getProposeListFilms = async (): Promise<FilmInfoInterface[]> => {
//     const films: FilmInfoInterface[] = await mongodb()
//         .db('film')
//         .collection('information')
//         .find({
//             projection: {
//                 _id: 0,
//                 img: 1,
//                 name: 1,
//                 videoType: 1,
//                 views: 1,
//                 rating: 1,
//             },
//             limit: 10,
//             sort: { likes: -1, views: -1, rating: -1 },
//         });

//     return films;
// };
