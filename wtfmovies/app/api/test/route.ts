import { mongodb } from '~/libs/func';
export const runtime = 'edge';
import type { NextRequest } from 'next/server';


export async function GET(request: NextRequest) {

    return new Response(JSON.stringify(await mongodb().db('film').collection('information').updateMany({
        filter: {},
        update: {
            "$unset": {
                rating: 0
            }
        }
    }), null, 2));
    // return new Response(JSON.stringify(await mongodb().db('film').collection('information').aggregate({
    //     pipeline: [
    //         { $match: { searchName: 'inuyashiki' } },
    //         {
    //             $lookup: {
    //                 from: 'author',
    //                 let: { authorIds: '$author' }, // Define the local variable authorIds
    //                 pipeline: [
    //                     { $match: { $expr: { $in: ['$_id', '$$authorIds'] } } }, // Match the author ids
    //                     { $project: { _id: 0, name: 1 } }, // Get name only
    //                 ],
    //                 as: 'authorDetails',
    //             },
    //         },
    //         {
    //             $lookup: {
    //                 from: 'genre',
    //                 let: { genreIds: '$genre' }, // Define the local variable genreIds
    //                 pipeline: [
    //                     { $match: { $expr: { $in: ['$_id', '$$genreIds'] } } }, // Match the genre ids
    //                     { $project: { _id: 0, name: 1 } }, // Get name only
    //                 ],
    //                 as: 'genreDetails',
    //             },
    //         },
    //         {
    //             $lookup: {
    //                 from: 'director',
    //                 let: { directorIds: '$director' }, // Define the local variable genreIds
    //                 pipeline: [
    //                     { $match: { $expr: { $in: ['$_id', '$$directorIds'] } } }, // Match the genre ids
    //                     { $project: { _id: 0, name: 1 } }, // Get name only
    //                 ],
    //                 as: 'directorDetails',
    //             },
    //         },
    //         {
    //             $lookup: {
    //                 from: 'actor',
    //                 let: { actorIds: '$actor' }, // Define the local variable genreIds
    //                 pipeline: [
    //                     { $match: { $expr: { $in: ['$_id', '$$actorIds'] } } }, // Match the genre ids
    //                     { $project: { _id: 0, name: 1 } }, // Get name only
    //                 ],
    //                 as: 'actorDetails',
    //             },
    //         },
    //         {
    //             "$lookup": {
    //                 "from": "episode",
    //                 "localField": "film_id",
    //                 "foreignField": "film_id",
    //                 "as": "reviews"
    //             }
    //         },
    //         {
    //             $project: {
    //                 _id: 0,
    //                 name: 1,
    //                 searchName: 1,
    //                 describe: 1,
    //                 author: '$authorDetails.name',
    //                 genre: '$genreDetails.name',
    //                 director: '$directorDetails.name',
    //                 videoType: 1,
    //                 views: 1,
    //                 rating: { $avg: '$reviews.rating' },
    //                 img: 1,
    //                 status: 1,
    //                 duration: 1,
    //                 tag: 1,
    //                 releaseYear: 1,
    //                 country: 1,
    //                 actor: '$actorDetails.name',
    //             },
    //         },
    //         { $limit: 1 },
    //     ],
    // }), null, 2));



}
