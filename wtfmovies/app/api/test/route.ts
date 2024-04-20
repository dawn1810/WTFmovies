import { mongodb } from '~/libs/func';
export const runtime = 'edge';
import type { NextRequest } from 'next/server';


export async function GET(request: NextRequest) {

    // return new Response(JSON.stringify(await mongodb().db('film').collection('information').updateMany({
    //     filter: {},
    //     update: {
    //         "$unset": {
    //             rating: 0
    //         }
    //     }
    // }), null, 2));
    return new Response(JSON.stringify(await mongodb()
        .db('film')
        .collection('episode')
        .aggregate({
            pipeline: [
                {
                    $match: {
                        film_id:
                            "bfae10e9-d0c9-4746-9be9-a6ea16f369b1"
                    }
                }
                ,
                {
                    $lookup: {
                        from: 'rating',
                        localField: '_id',
                        foreignField: 'id_ep',
                        as: 'reviews',
                    },
                },
                {
                    $project: {
                        _id: 1,
                        film_id: 1,
                        index: 1,
                        name: 1,
                        uploader_id: 1,
                        upload_date: 1,
                        rating: { $round: [{ $avg: '$reviews.rating' }, 1] },
                        views: 1,
                        link: 1
                    },

                },
                { $merge: { into: "episode", on: "rating", whenMatched: "replace", whenNotMatched: "insert" } }]
        }), null, 2));



}
