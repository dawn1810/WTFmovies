import { mongodb, ObjectId } from '~/libs/func';
import { EpisodeInterFace, FilmInfo, MongoUpdate, ObjectMongo } from '../interfaces';
import { auth } from '~/app/api/auth/[...nextauth]/auth';

interface watchFilmInterface extends FilmInfo {
    sumEpisodes: number;
}

export const getFilmsInfo = async (movie_name: string): Promise<FilmInfo | undefined> => {
    try {
        const films: FilmInfo = await mongodb()
            .db('film')
            .collection('information')
            .findOne({
                filter: { searchName: movie_name },
                projection: {
                    _id: 0,
                    film_id: 1,
                    img: 1,
                    name: 1,
                    videoType: 1,
                    views: 1,
                    rating: 1,
                    notification: 1,
                },
            });
        // if (!films.videoType) return null
        // const subsType = films.videoType.find(type => type.title === 'Subs') as any;
        // const totalEpisodes = subsType.episode[subsType.episode.length - 1];

        return films;
    } catch (err) {
        console.log('😨😨😨 error at watch/getFilmsInfo function  : ', err);
    }
};

interface FilmEpisode {
    _id: string;
    link: string;
    rating: number;
    index: number;
}

export const getFilmsEpisode = async (movie_id: string): Promise<FilmEpisode[] | []> => {
    try {
        const films: FilmEpisode[] = await mongodb()
            .db('film')
            .collection('episode')
            .find({
                filter: { film_id: movie_id },
                projection: {
                    _id: 1,
                    link: 1,
                    index: 1,
                    rating: 1,
                },
            });
        const session = await auth();

        if (session && session.user && session.user.id) {
            const epId = films.map((film) => film._id);
            for (const id of epId) {
                const rating = await mongodb()
                    .db('film')
                    .collection('rating')
                    .findOne({
                        filter: { id_ep: ObjectId(id), id_user: ObjectId(session.user.id) },
                    });
                if (rating) {
                    const film = films.find(f => f._id === id);
                    if (film) {
                        film.rating = rating.rating;
                    }
                }
            }
        }

        const sortedFilms = films.sort((a, b) => a.index - b.index);

        return sortedFilms;
    } catch (err) {
        console.log('😨😨😨 error at watch/getFilmsEpisode function  : ', err);
        return [];
    }
};

