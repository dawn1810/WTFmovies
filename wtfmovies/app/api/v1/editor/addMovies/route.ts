export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { MongoDate, ObjectId, generateUUIDv4, mongodb, toError, toJSON, uploadImagetoTiktok } from '~/libs/func';
import { makeFilmData } from '~/libs/uploadAPI';
import { ExtendedUser } from '~/libs/interfaces';
import { auth } from '~/app/api/auth/[...nextauth]/auth';

type dataType = {
    type?: string;
    film_id: string,
    name: string,
    describe: string,
    genre: string[],
    director: string[],
    actor: string[],
    author: string[],
    tag: string,
    country: string,
    releaseYear: string,
    maxEp: number,
    duration: number,
    status: string,
    listEp: {
        tiktok: [{
            index: number,
            link: string,
        }],
        youtube: [{
            index: number,
            link: string,
        }],
    },
};


export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return toError('Xác thực thất bại', 401);

        const extendedUser: ExtendedUser | undefined = session?.user;
        if (extendedUser?.role === 'editor' || extendedUser?.role === 'admin') {
            const formData: any = await request.formData();

            //code from hell
            const imageLink = (!!formData.get('image') && formData.get('image') instanceof Blob) ? await uploadImagetoTiktok(await formData.get('image')) : formData.get('image');
            const imageBannerLink = (!!formData.get('imageBanner') && formData.get('imageBanner') instanceof Blob) ? await uploadImagetoTiktok(await formData.get('imageBanner')) : formData.get('imageBanner');

            const info = await formData.get('info');
            const {
                film_id,
                name,
                describe,
                genre,
                director,
                actor,
                author,
                tag,
                country,
                releaseYear,
                maxEp,
                duration,
                status,
                listEp,
            }: dataType = await JSON.parse(info);
            const youtubeEpLength = listEp.youtube.length;
            const tiktokEpLength = listEp.tiktok.length;
            const proListEp = [];
            for (let index = 0; index < ((youtubeEpLength >= tiktokEpLength) ? youtubeEpLength : tiktokEpLength); index++) {
                proListEp.push({
                    film_id: film_id,
                    index: index + 1,
                    name: `${name} - Tập ${index + 1}`,
                    upload_date: MongoDate(new Date()),
                    uploader_email: extendedUser.email,
                    link: {
                        Youtube: listEp.youtube[index]?.link || "",
                        Tiktok: listEp.tiktok[index]?.link || ""
                    },
                })
            }

            if (proListEp.length > 0)
                await mongodb().db('film').collection('episode').insertMany(proListEp);

            // add author, actor, director, tag, genre
            const authors = author.map((item: string) => (ObjectId(item)));
            const directors = director.map((item: string) => (ObjectId(item)));
            const actors = actor.map((item: string) => (ObjectId(item)));
            const genres = genre.map((item: string) => (ObjectId(item)));

            // up film
            const filmInfo: any = await makeFilmData(
                film_id,
                name,
                describe,
                status,
                authors,
                directors,
                tag,
                duration,
                country,
                actors,
                imageLink,
                imageBannerLink,
                genres,
                maxEp,
                releaseYear,
                proListEp.length,
            );

            const response: any = await mongodb()
                .db('film')
                .collection('information')
                .updateOne({
                    filter: {
                        film_id: film_id,
                    },
                    update: { $set: filmInfo },
                    upsert: true,
                });

            if (!!response) {
                return toJSON(filmInfo, 200);
            }

            return toError('Đăng tải phim không thành công', 400);

        } return toError('Lỗi xác thực', 403);

    } catch (err) {
        return toError(err, 500);
    }
}
