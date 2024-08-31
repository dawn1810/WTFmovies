import { MongoDate, ObjectId, mongodb, preprocessString, toError, toJSON } from '~/libs/func';
export const runtime = 'edge';
import type { NextRequest } from 'next/server';
// import * as tf from '@tensorflow/tfjs';
import * as tf from '@tensorflow/tfjs-node';
import * as use from '@tensorflow-models/universal-sentence-encoder';

const getFilms = async (): Promise<any> => {
    try {
        const films: any = await mongodb()
            .db('film')
            .collection('information')
            .find({
                filter: { status: { $ne: 'delete' } },
                projection: {
                    _id: 1,
                    describe: 1,
                },
            });

        return films;
    } catch (err) {
        console.log('😨😨😨 error at home/getFilms function  : ', err);
        return [];
    }
};

export async function GET(request: NextRequest) {
    try {
        const films = await getFilms();

        // // Load the model.
        // console.log('Đang tải mô hình.');
        // const model = await use.load();
        // console.log('Đã tải mô hình.');

        // if (model) {
        //     for (const film of films) {
        //         const embeddings = await model.embed(film.describe);
        //         console.log(embeddings.arraySync()[0]);
        //         film.embedding = embeddings.arraySync()[0];
        //         console.log(film);
        //     }
        // }

        return toJSON(films);
    } catch (err) {
        return toError('Lỗi ' + err, 500);
    }
}
