import { FilmInfo } from "../interfaces";
import { mongodb } from '~/libs/func';

export const getFilm = async (): Promise<FilmInfo[]> => {
    try {
        const convertSecondsToDHMS = (seconds: number) => {
            const days = Math.floor(seconds / (24 * 60 * 60));
            const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
            const minutes = Math.floor((seconds % (60 * 60)) / 60);
            const remainingSeconds = seconds % 60;

            let result = '';
            if (days > 0) {
                result += `${days}d `;
            }
            if (hours > 0) {
                result += `${hours}h `;
            }
            if (minutes > 0) {
                result += `${minutes}m `;
            }
            if (remainingSeconds > 0) {
                result += `${remainingSeconds}s`;
            }

            return result.trim();
        }
        const films: any[] = await mongodb()
            .db('film')
            .collection('information')
            .aggregate({
                pipeline: [
                    { $match: {} },
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
                            from: 'episode',
                            localField: 'film_id',
                            foreignField: 'film_id',
                            as: 'reviews',
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            searchName: 1,
                            describe: 1,
                            author: '$authorDetails.name',
                            genre: '$genreDetails.name',
                            director: '$directorDetails.name',
                            videoType: 1,
                            uploadedEp: { $arrayElemAt: [{ $arrayElemAt: ['$videoType.episode', 0] }, -1] },
                            views: 1,
                            maxEp: 1,
                            rating: { $round: [{ $avg: '$reviews.rating' }, 1] },
                            img: 1,
                            status: 1,
                            duration: 1,
                            tag: '$tagDetails.name',
                            releaseYear: 1,
                            country: 1,
                            actor: '$actorDetails.name',
                        },
                    },
                ],
            });



        return films.map(film => {
            return {
                ...film, duration: convertSecondsToDHMS(film.duration), id: film._id, maxEp: [film.uploadedEp, film.maxEp !== -1 ? film.maxEp : '?'].join(' / ') + ' tập', videoType: [
                    { title: 'Subs', episode: [] },
                    { title: 'Thuyết minh', episode: [] },
                ].map((videoType) => videoType.title)
            };
        });
    } catch (err) {
        console.log('😨😨😨 error at editor/getFilm function : ', err);
        return [];
    }
};
