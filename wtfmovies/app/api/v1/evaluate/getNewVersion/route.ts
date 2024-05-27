export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { MongoDate, mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

type dataType = { version: string };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return undefined;

        const extendedUser: ExtendedUser | undefined = session?.user;
        const { version }: dataType = await request.json();

        if (extendedUser?.role === 'admin') {
            const table = await mongodb().db('evaluate').collection('table').findOne({
                filter: { version },
            });

            const scores: any[] = await mongodb()
                .db('user')
                .collection('information')
                .aggregate({
                    pipeline: [
                        {
                            $lookup: {
                                from: 'evaluate',
                                let: { userId: '$email', specifiedVersion: 1 }, // Define your outside variables
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [{ $eq: ['$_id', '$$userId'] }, { $eq: ['$version', version] }],
                                            },
                                        },
                                    },
                                    { $limit: 1 },
                                ],
                                as: 'scores',
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                email: 1,
                                name: 1,
                                userScore: '$scores.userScore',
                                adminScore: '$scores.adminScore',
                                time: '$scores.time',
                            },
                        },
                    ],
                });

            if (!!table || !!scores) return toJSON({ table, scores });
        } else {
            return toError('API ngoài thầm quyền của bạn', 403);
        }

        return toError('Cập nhật phiên bản thất bại', 400);
    } catch (err) {
        return toError('Lỗi trong quá trình cập nhật phiên bản:' + err, 500);
    }
}
