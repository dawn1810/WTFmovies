export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { MongoDate, ObjectId, createSearchName, mongodb, toError, toJSON } from '~/libs/func';
import { ObjectMongo } from '~/libs/interfaces';
import { getYoutubePlaylistInfo, getYoutubePlaylistItems } from '~/libs/uploadAPI';

type dataType = {
    email?: string;
    playlistId: string;
    nameInput?: string;
    describe?: string;
    status?: string;
    author?: string[];
    director?: string[];
    tag?: string;
    country?: string;
    actor?: string[];
    img?: string;
    poster?: string;
    genre?: string[];
    maxEp?: number;
};

const updateList = async (list: string[], collection: string): Promise<ObjectMongo[]> => {
    for (const name of list) {
        await mongodb()
            .db('film')
            .collection(collection)
            .updateMany({ filter: { name }, update: { $set: { name } }, upsert: true });
    }

    const result = await mongodb()
        .db('film')
        .collection(collection)
        .find({ filter: { name: { $in: list } }, projection: { _id: 1 } });

    return result.map((r) => ObjectId(r._id));
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
            country,
            actor,
            img,
            poster,
            genre,
            maxEp,
        }: dataType = await request.json();

        // up episodes
        const episodeList: any[] = await getYoutubePlaylistItems(playlistId, email);

        episodeList.forEach(async (espisode, index) => {
            const epUploadRes = await mongodb().db('film').collection('episode').insertOne(espisode);

            if (!epUploadRes) {
                return toError('Đăng tải tập phim không thành công', 400);
            }
        });

        // add author, actor, director, tag, genre
        const authors = author ? await updateList(author, 'author') : undefined;
        const directors = director ? await updateList(director, 'director') : undefined;
        const actors = actor ? await updateList(actor, 'actor') : undefined;
        const genres = genre ? await updateList(genre, 'genre') : undefined;

        // up film
        const filmInfo: any = await getYoutubePlaylistInfo(
            playlistId,
            nameInput,
            describe,
            status,
            authors,
            directors,
            tag,
            country,
            actors,
            img,
            poster,
            genres,
            maxEp,
            episodeList.length,
        );

        const response: any = await mongodb().db('film').collection('information').insertOne(filmInfo);

        if (!!response) {
            return toJSON(response, 200);
        }

        return toError('Đăng tải phim không thành công', 400);
        // return toJSON('😎😎😎', 200);
    } catch (err) {
        return toError('Lỗi' + err, 500);
    }
}
