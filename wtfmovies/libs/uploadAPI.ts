import { MongoDate, ObjectId, createSearchName, mongodb } from './func';
import { DateMongo, ObjectMongo } from './interfaces';

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

    const filmExisted = await mongodb()
        .db('film')
        .collection('information')
        .findOne({
            filter: { film_id: playlistId },
            projection: {
                _id: 0,
                videoType: 1,
                views: 1,
                likes: 1,
                weekViews: 1,
                monthViews: 1,
                monthLikes: 1,
                weekLikes: 1,
            },
        });

    if (!!filmExisted) {
        const result = res.items
            .filter((item: any, i: number) => i < filmExisted.videoType[0].length) // Keep elements where the index is less than the length
            .map((item: any, i: number) => {
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
                    uploader_email: email || 'binhminh19112003@gmail.com',
                    upload_date: MongoDate(uploadDate),
                    rating: null,
                    views: 0,
                    link: { Youtube: yUrl.href },
                };
            });

        return { result, filmExisted };
    }

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
            uploader_email: email || 'binhminh19112003@gmail.com',
            upload_date: MongoDate(uploadDate),
            rating: null,
            views: 0,
            link: { Youtube: yUrl.href },
        };
    });

    return { result };
};

export const getYoutubePlaylistInfo = async (
    playlistId: string,
    nameInput?: string,
    describe?: string,
    status?: string,
    author?: ObjectMongo[],
    director?: ObjectMongo[],
    tag?: string,
    country?: string,
    actor?: ObjectMongo[],
    img?: string,
    poster?: string,
    genre?: ObjectMongo[],
    maxEp?: number,
    episodeLength?: number,
    filmExisted?: any,
) => {
    try {
        const today = new Date();
        const url = new URL('https://www.googleapis.com/youtube/v3/playlists');
        const params: any = {
            key: 'AIzaSyB6yUQdrzm1DXO4BVSWc75nubzIq6WbfnY',
            part: 'snippet',
            id: playlistId,
            maxResults: 50,
        };

        url.search = new URLSearchParams(params).toString();

        const response = await fetch(url);

        const res: any = await response.json();

        const item = res.items[0].snippet;
        const publishDate = new Date(item.publishedAt);

        if (!!filmExisted) {
            const result = {
                film_id: playlistId,
                name: nameInput || item.title,
                describe: describe || item.description,
                status: status || 'Đang ra',
                author: author,
                director: director,
                duration: 1440,
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
                img: img || item.thumbnails.standard.url,
                poster: poster || item.thumbnails.standard.url,
                genre: genre,
                searchName: createSearchName((nameInput || item.title) + '-' + playlistId),
                maxEp: maxEp,
                weekViews: filmExisted.weekViews,
                monthViews: filmExisted.monthViews,
                monthLikes: filmExisted.monthLikes,
                weekLikes: filmExisted.weekLikes,
            };

            return cleanObject(result);
        }

        const result = {
            film_id: playlistId,
            name: nameInput || item.title,
            describe: describe || item.description,
            status: status || 'Đang ra',
            author: author,
            director: director,
            duration: 1440,
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
            img: img || item.thumbnails.standard.url,
            poster: poster || item.thumbnails.standard.url,
            genre: genre,
            notification: undefined,
            searchName: createSearchName((nameInput || item.title) + '-' + playlistId),
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
