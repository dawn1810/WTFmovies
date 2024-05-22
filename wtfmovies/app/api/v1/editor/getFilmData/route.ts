export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

type dataType = { id: string };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return toError('Xác thực thất bại', 401);

        const extendedUser: ExtendedUser | undefined = session?.user;
        const { id }: dataType = await request.json();

        if (extendedUser?.role === 'editor') {
            const response = await mongodb()
                .db('film')
                .collection('information')
                .aggregate({
                    pipeline: [
                        { $match: { film_id: id, status: { $ne: 'delete' } } },
                        {
                            $lookup: {
                                from: 'author',
                                let: { authorIds: '$author' }, // Define the local variable authorIds
                                pipeline: [
                                    { $match: { $expr: { $in: ['$_id', '$$authorIds'] } } }, // Match the author ids
                                    { $project: { _id: 0, name: 1 } }, // Get name only
                                ],
                                as: 'authorDetails',
                            },
                        },
                        {
                            $lookup: {
                                from: 'genre',
                                let: { genreIds: '$genre' }, // Define the local variable genreIds
                                pipeline: [
                                    { $match: { $expr: { $in: ['$_id', '$$genreIds'] } } }, // Match the genre ids
                                    { $project: { _id: 0, name: 1 } }, // Get name only
                                ],
                                as: 'genreDetails',
                            },
                        },
                        {
                            $lookup: {
                                from: 'director',
                                let: { directorIds: '$director' }, // Define the local variable genreIds
                                pipeline: [
                                    { $match: { $expr: { $in: ['$_id', '$$directorIds'] } } }, // Match the genre ids
                                    { $project: { _id: 0, name: 1 } }, // Get name only
                                ],
                                as: 'directorDetails',
                            },
                        },
                        {
                            $lookup: {
                                from: 'actor',
                                let: { actorIds: '$actor' }, // Define the local variable genreIds
                                pipeline: [
                                    { $match: { $expr: { $in: ['$_id', '$$actorIds'] } } }, // Match the genre ids
                                    { $project: { _id: 0, name: 1 } }, // Get name only
                                ],
                                as: 'actorDetails',
                            },
                        },
                        {
                            $lookup: {
                                from: 'tag',
                                localField: 'tag',
                                foreignField: '_id',
                                pipeline: [
                                    { $project: { _id: 0, name: 1 } }, // Get name only
                                ],
                                as: 'tagDetails',
                            },
                        },
                        {
                            $lookup: {
                                from: 'episode',
                                localField: 'film_id',
                                foreignField: 'film_id',
                                as: 'reviews',
                            },
                        },
                        {
                            $lookup: {
                                from: 'country',
                                localField: 'country',
                                foreignField: '_id',
                                as: 'country',
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                name: 1,
                                film_id: 1,
                                searchName: 1,
                                describe: 1,
                                author: '$authorDetails.name',
                                genre: '$genreDetails.name',
                                director: '$directorDetails.name',
                                videoType: 1,
                                uploadedEp: { $arrayElemAt: [{ $arrayElemAt: ['$videoType.episode', 0] }, -1] },
                                views: 1,
                                maxEp: 1,
                                rating: { $round: [{ $avg: '$reviews.rating' }, 1] },
                                img: 1,
                                status: 1,
                                duration: 1,
                                tag: '$tagDetails.name',
                                releaseYear: 1,
                                country: '$country.label',
                                actor: '$actorDetails.name',
                            },
                        },
                    ],
                });

            if (response) {
                return toJSON(response);
            }

            return toError('Lấy dữ liệu thất bại', 400);
        } else {
            return toError('Api không trong phạm trù quyền của bạn', 403);
        }
    } catch (err) {
        return toError('Lỗi trong quá trình lấy thông tin', 500);
    }
}
