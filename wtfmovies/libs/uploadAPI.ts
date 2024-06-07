import { MongoDate, ObjectId, createSearchName, mongodb } from './func';
import { ObjectMongo } from './interfaces';

const createDefaultEpisode = (number: number) => {
    const list = [];
    for (let index = 1; index <= number; index++) {
        list.push(index);
    }

    return list;
};

const cleanObject = (obj: any) => {
    Object.keys(obj).forEach((key) => {
        if (obj[key] === undefined || obj[key] === false) {
            delete obj[key];
        }
    });
    return obj;
};

export const getYoutubePlaylistItems = async (playlistId: string, email?: string | null) => {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
    const params: any = {
        key: 'AIzaSyB6yUQdrzm1DXO4BVSWc75nubzIq6WbfnY',
        part: 'snippet',
        playlistId: playlistId,
        maxResults: 50,
    };

    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url);

    const res: any = await response.json();

    const result = res.items.map((item: any, i: number) => {
        const uploadDate = new Date(item.snippet.publishedAt);
        const yUrl = new URL('https://www.youtube.com/watch');
        const yParams = {
            v: item.snippet.resourceId.videoId,
        };

        yUrl.search = new URLSearchParams(yParams).toString();

        return {
            film_id: playlistId,
            index: i + 1,
            name: item.snippet.title,
            uploader_email: email || 'contact@wtfdev.xyz',
            upload_date: MongoDate(uploadDate),
            rating: null,
            views: 0,
            link: { Youtube: yUrl.href },
        };
    });

    return { result };
};

export const makeFilmData = async (
    film_id: string,
    nameInput: string,
    describe: string,
    status: string,
    author: ObjectMongo[],
    director: ObjectMongo[],
    tag: string,
    duration: number,
    country: string,
    actor: ObjectMongo[],
    img: string,
    poster: string,
    genre: ObjectMongo[],
    maxEp: number,
    publishedAt: string,
    episodeLength: number,
) => {
    try {


        const filmExisted = await mongodb().db('film').collection('information').findOne({ filter: { film_id: film_id } });

        const publishDate = new Date(publishedAt);
        const today = new Date();

        if (!!filmExisted) {
            const result = {
                film_id: film_id,
                name: nameInput,
                describe: describe,
                status: status || 'Đang ra',
                author: author,
                director: director,
                duration: duration,
                videoType: [
                    {
                        title: 'Subs',
                        episode: episodeLength ? createDefaultEpisode(episodeLength) : undefined,
                    },
                ],
                tag: tag ? ObjectId(tag) : undefined,
                releaseYear: MongoDate(publishDate),
                country: country ? ObjectId(country) : undefined,
                updateTime: MongoDate(today),
                actor: actor,
                views: filmExisted.views,
                likes: filmExisted.likes,
                img: img,
                poster: poster,
                genre: genre,
                searchName: createSearchName(nameInput + '-' + film_id),
                maxEp: maxEp,
                weekViews: filmExisted.weekViews,
                monthViews: filmExisted.monthViews,
                monthLikes: filmExisted.monthLikes,
                weekLikes: filmExisted.weekLikes,
            };

            return cleanObject(result);
        }

        const result = {
            film_id: film_id,
            name: nameInput,
            describe: describe,
            status: status || 'Đang ra',
            author: author,
            director: director,
            duration: duration,
            videoType: [
                {
                    title: 'Subs',
                    episode: episodeLength ? createDefaultEpisode(episodeLength) : undefined,
                },
            ],
            tag: tag ? ObjectId(tag) : undefined,
            releaseYear: MongoDate(publishDate),
            country: country ? ObjectId(country) : undefined,
            updateTime: MongoDate(today),
            actor: actor,
            views: 0,
            likes: 0,
            img: img,
            poster: poster,
            genre: genre,
            notification: undefined,
            searchName: createSearchName(nameInput + '-' + film_id),
            comment: undefined,
            maxEp: maxEp,
            weekViews: 0,
            monthViews: 0,
            monthLikes: 0,
            weekLikes: 0,
        };

        return cleanObject(result);
    } catch (e) {
        console.log(e);
    }
};