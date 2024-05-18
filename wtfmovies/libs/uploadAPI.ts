import { DateMongo, ObjectMongo } from './interfaces';

export function ObjectId(id: string): ObjectMongo {
    return {
        $oid: id,
    };
}

export function MongoDate(data: Date): DateMongo {
    return {
        $date: data.toISOString(),
    };
}

export const createSearchName = (name: string): string => {
    return name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, '-');
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

    console.log(res);

    const result = await res.items.map(async (item: any, i: number) => {
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
            upload_date: MongoDate(item.snippet.publishedAt),
            rating: null,
            views: 0,
            link: yUrl.href,
        };
    });

    console.log(await result);
    // return result;
};

export const getYoutubePlaylistInfo = async (
    playlistId: string,
    nameInput?: string,
    describe?: string,
    status?: string,
    author?: ObjectMongo[],
    director?: ObjectMongo[],
    tag?: ObjectMongo,
    actor?: ObjectMongo[],
    img?: string,
    poster?: string,
    genre?: ObjectMongo[],
    maxEp?: number,
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

        const result = await res.items[0].snippet.map((item: any) => {
            return {
                film_id: playlistId,
                name: nameInput || item.title,
                describe: describe || item.description,
                status: status || 'Đang ra',
                author: author || [],
                director: director || [],
                duration: 1440,
                videoType: [],
                tag: tag || undefined,
                releaseYear: MongoDate(item.publishedAt),
                country: ObjectId('663cd72163a3b632fbebce49'),
                updateTime: MongoDate(today),
                actor: actor || [],
                views: 0,
                likes: 0,
                img: img || item.maxres.url,
                poster: poster || item.maxres.url,
                genre: genre || [],
                notification: {
                    schedule: '',
                    notification: '',
                },
                searchName: createSearchName(item.title),
                comment: [''],
                maxEp: maxEp || 18,
                weekViews: 0,
                monthViews: 0,
                monthLikes: 0,
                weekLikes: 0,
            };
        });

        return await result;
    } catch (e) {
        console.log(e);
    }
};

console.log(getYoutubePlaylistItems);
