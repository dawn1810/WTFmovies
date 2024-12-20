import { mongodb, ObjectId, toError, toJSON } from '~/libs/func';
export const runtime = 'edge';
import type { NextRequest } from 'next/server';
// import * as tf from '@tensorflow/tfjs';
// import * as tf from '@tensorflow/tfjs-node';
// import * as use from '@tensorflow-models/universal-sentence-encoder';

// async function a() {
//     try {
//         // Get a subset of documents from the collection
//         const documents = await mongodb()
//             .db('film')
//             .collection('information')
//             .find({
//                 filter: { describe: { $nin: [null, ''] }, status: { $ne: 'delete' } },
//                 projection: {
//                     name: 1,
//                     describe: 1,
//                 },
//             });

//         // Create embeddings from a field in the collection
//         let updatedDocCount = 0;
//         console.log('Generating embeddings for documents...');
//         await Promise.all(
//             documents.map(async (doc) => {
//                 // Generate an embedding by using the function that you defined
//                 const embedding = await getEmbedding(doc.name + doc.describe);

//                 // Update the document with a new embedding field
//                 await await mongodb()
//                     .db('film')
//                     .collection('infomation')
//                     .updateOne({
//                         filter: { _id: doc._id },
//                         update: {
//                             $set: {
//                                 embedding: embedding,
//                             },
//                         },
//                     });
//                 updatedDocCount += 1;
//             }),
//         );
//         console.log('Count of documents updated: ' + updatedDocCount);
//     } catch (err: any) {
//         console.log(err.stack);
//     }
// }

async function run(model: string, input: any) {
    const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/041b13f2e524a3d3a8744e2e3bf2917c/ai/run/${model}`,
        {
            headers: { Authorization: 'Bearer eU1WAu_OL-kTkpcXHldim8hWDsqVCkMmR--gmpBP' },
            method: 'POST',
            body: JSON.stringify(input),
        },
    );
    const result = await response.json();
    return result;
}

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
        // update embedding
        // // Get a subset of documents from the collection
        // const documents = await mongodb()
        //     .db('film')
        //     .collection('information')
        //     .find({
        //         filter: { describe: { $nin: [null, ''] }, status: { $ne: 'delete' } },
        //         projection: {
        //             name: 1,
        //             describe: 1,
        //         },
        //     });

        // // Create embeddings from a field in the collection
        // // Update documents with embeddings
        // let updatedDocCount = 0;
        // console.log('Generating embeddings for documents...');

        // for (const doc of documents) {
        //     try {
        //         // Generate embedding using your model (e.g., call to `run`)
        //         const embedding: any = await run('@cf/baai/bge-small-en-v1.5', {
        //             text: doc.text + '-' + doc.describe,
        //         });

        //         // Update the document in the database
        //         const result = await mongodb()
        //             .db('film')
        //             .collection('information')
        //             .updateOne({
        //                 filter: { _id: ObjectId(doc._id) },
        //                 update: {
        //                     $set: {
        //                         embedding: embedding.result.data,
        //                     },
        //                 },
        //             });

        //         if (result.modifiedCount > 0) {
        //             updatedDocCount += 1;
        //         }
        //     } catch (error) {
        //         console.error(`Error processing document with _id ${doc._id}:`, error);
        //     }
        // }

        // console.log('Count of documents updated: ' + updatedDocCount);

        // search

        const embedding: any = await run('@cf/baai/bge-small-en-v1.5', {
            text: 'Đấm phát chết luôn',
        });

        const films: any[] = await mongodb()
            .db('film')
            .collection('information')
            .aggregate({
                pipeline: [
                    {
                        $vectorSearch: {
                            index: 'default',
                            queryVector: embedding.result.data[0], // get embedding vector
                            path: 'embedding',
                            exact: true,
                            limit: 5,
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            name: 1,
                            searchName: 1,
                            updateTime: 1,
                            img: 1,
                            score: {
                                $meta: 'vectorSearchScore',
                            },
                        },
                    },
                ],
            });

        console.log(films);

        return toJSON('Thành công');
    } catch (err) {
        return toError('Lỗi ' + err, 500);
    }
}
