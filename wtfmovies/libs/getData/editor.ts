import { FilmInfo } from "../interfaces";
import { mongodb } from '~/libs/func';

export const getFilm = async (): Promise<FilmInfo[]> => {
    try {
        const filmList: FilmInfo[] = await mongodb()
            .db('film')
            .collection('information')
            .aggregate({
                pipeline: [
                    { $sort: { weekViews: -1, likes: -1 /* add rating hear too how ??? */ } },
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
                            likes: 1,
                            rating: { $round: [{ $avg: '$reviews.rating' }, 1] },
                        },
                    },
                    { $limit: 5 },
                ],
            });

        return filmList;
    } catch (err) {
        console.log('😨😨😨 error at admin/getTopHotFilm function : ', err);
        return [];
    }
};
