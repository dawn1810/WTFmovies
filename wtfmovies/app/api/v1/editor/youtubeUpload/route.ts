export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { MongoDate, ObjectId, createSearchName, mongodb, toError, toJSON } from '~/libs/func';
import { ObjectMongo } from '~/libs/interfaces';

type dataType = {
    email?: string;
    playlistId: string;
    nameInput?: string;
    describe?: string;
    status?: string;
    author?: ObjectMongo[];
    director?: ObjectMongo[];
    tag?: ObjectMongo;
    actor?: ObjectMongo;
    img?: string;
    poster?: string;
    genre?: ObjectMongo[];
    maxEp?: number;
};

export async function POST(request: NextRequest) {
    try {
        const {
            email,
            playlistId,
            nameInput,
            describe,
            status,
            author,
            director,
            tag,
            actor,
            img,
            poster,
            genre,
            maxEp,
        }: dataType = await request.json();

        const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
        const params: any = {
            key: 'AIzaSyB6yUQdrzm1DXO4BVSWc75nubzIq6WbfnY',
            part: 'snippet',
            playlistId: playlistId,
            maxResults: 2,
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

        // up episodes
        // await getYoutubePlaylistItems(playlistId, email);
        // const episodeList: any[] = await getYoutubePlaylistItems(playlistId, email);
        // console.log(episodeList);

        // episodeList.forEach(async (espisode, index) => {
        //     const epUploadRes = await mongodb().db('film').collection('information').insertOne(espisode);

        //     if (!epUploadRes) {
        //         throw new Error('Lỗi trong quá trình up tập: ' + index);
        //     }
        // });

        // // up film
        // const filmInfo: any = await getYoutubePlaylistInfo(
        //     playlistId,
        //     nameInput,
        //     describe,
        //     status,
        //     author,
        //     director,
        //     tag,
        //     actor,
        //     img,
        //     poster,
        //     genre,
        //     maxEp,
        // );
        // const response: any = await mongodb().db('film').collection('information').insertOne(filmInfo);

        // if (!!response) {
        //     return toJSON(response[0], 200);
        // }

        return toError('Đăng tải phim không thành công', 400);
    } catch (err) {
        return toError('Lỗi' + err, 500);
    }
}
