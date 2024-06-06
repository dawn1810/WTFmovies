import { MongoDate, ObjectId, mongodb, toError, toJSON } from '~/libs/func';
export const runtime = 'edge';
import type { NextRequest } from 'next/server';

const getFilms = async (): Promise<any[]> => {
    try {
        const films: any[] = await mongodb()
            .db('film')
            .collection('episode')
            .find();
        films.forEach(async (film) => {
            if (film.film_id != 'bfae10e9-d0c9-4746-9be9-a6ea16f369b1')
                await mongodb()
                    .db('film')
                    .collection('episode')
                    .updateOne({
                        filter: { _id: ObjectId(film._id) }, update: {
                            $set: {
                                link: {
                                    Youtube: film.link,
                                    Tiktok: ''
                                }
                            }
                        }
                    }); else
                await mongodb()
                    .db('film')
                    .collection('episode')
                    .updateOne({
                        filter: { _id: ObjectId(film._id) }, update: {
                            $set: {
                                link: {
                                    Youtube: '',
                                    Tiktok: film.link
                                }
                            }
                        }
                    });

        });
        return films;
    } catch (err) {
        console.log('😨😨😨 error at home/getFilms function  : ', err);
        return [];
    }
};


export async function GET(request: NextRequest) {
    try {



        return toJSON(await getFilms());
    } catch (err) {
        return toError('Lỗi ' + err, 500);
    }
}
