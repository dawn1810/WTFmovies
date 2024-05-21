import { MongoDate, ObjectId, createSearchName } from './func';
import { DateMongo, ObjectMongo } from './interfaces';

const createDefaultEpisode = (number: number) => {
    const list = [];
    for (let index = 1; index <= number; index++) {
        list.push(index);
    }

    return list;
};

export const getYoutubePlaylistItems = async (playlistId: string, email?: string) => {
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
            uploader_email: email || 'binhminh19112003@gmail.com',
            upload_date: MongoDate(uploadDate),
            rating: null,
            views: 0,
            link: yUrl.href,
        };
    });

    return result;
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

        const result = {
            film_id: playlistId,
            name: nameInput || item.title,
            describe: describe || item.description,
            status: status || 'Đang ra',
            author: author || [],
            director: director || [],
            duration: 1440,
            videoType: [
                {
                    title: 'Subs',
                    episode: episodeLength ? createDefaultEpisode(episodeLength) : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                },
            ],
            tag: tag ? ObjectId(tag) : undefined,
            releaseYear: MongoDate(publishDate),
            country: country ? ObjectId(country) : ObjectId('663cd72163a3b632fbebce49'),
            updateTime: MongoDate(today),
            actor: actor || [],
            views: 0,
            likes: 0,
            img: img || item.thumbnails.standard.url,
            poster: poster || item.thumbnails.standard.url,
            genre: genre || [],
            notification: {
                schedule: '',
                notification: '',
            },
            searchName: createSearchName((nameInput || item.title) + '-' + playlistId),
            comment: [''],
            maxEp: maxEp || 18,
            weekViews: 0,
            monthViews: 0,
            monthLikes: 0,
            weekLikes: 0,
        };

        return result;
    } catch (e) {
        console.log(e);
    }
};
