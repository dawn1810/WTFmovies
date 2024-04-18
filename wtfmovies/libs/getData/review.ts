import { mongodb } from '~/libs/func';
import { CommentInterface, FilmInfoInterface } from '../interfaces';

export const getFilmReviewInfo = async (filmName: string): Promise<FilmInfoInterface> => {
    const films: FilmInfoInterface[] = await mongodb()
        .db('film')
        .collection('information')
        .aggregate({
            pipeline: [
                { $match: { searchName: 'inuyashiki' } },
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
                        from: "episode",
                        localField: "film_id",
                        foreignField: "film_id",
                        as: "reviews"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        name: 1,
                        searchName: 1,
                        describe: 1,
                        author: '$authorDetails.name',
                        genre: '$genreDetails.name',
                        director: '$directorDetails.name',
                        videoType: 1,
                        views: 1,
                        rating: { $round: [{ $avg: '$reviews.rating' }, 1] },
                        img: 1,
                        status: 1,
                        duration: 1,
                        tag: 1,
                        releaseYear: 1,
                        country: 1,
                        actor: '$actorDetails.name',
                    },
                },
                { $limit: 1 },
            ],
        });

    return films[0];
};

interface CommentsFilmsInterface {
    comments: CommentInterface[];
}

export const getAllFilmsComment = async (filmName: string): Promise<CommentInterface[]> => {
    const comments: CommentsFilmsInterface[] = await mongodb()
        .db('film')
        .collection('information')
        .aggregate({
            pipeline: [
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
