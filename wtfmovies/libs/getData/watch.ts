import { mongodb } from '~/libs/func';
import { EpisodeInterFace, FilmInfo, MongoUpdate, ObjectMongo } from '../interfaces';

interface watchFilmInterface extends FilmInfo {
    sumEpisodes: number;
}
export const getFilmsInfo = async (movie_name: string): Promise<FilmInfo | undefined> => {
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


};
interface FilmEpisode {
    _id: string,
    link: string,
    rating: number,
    index: number
}

export const getFilmsEpisode = async (movie_id: string): Promise<FilmEpisode[] | []> => {
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

    const sortedFilms = films.sort((a, b) => a.index - b.index);

    return sortedFilms;


};


