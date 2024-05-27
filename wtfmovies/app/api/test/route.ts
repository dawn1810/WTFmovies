import { mongodb, toError, toJSON } from '~/libs/func';
export const runtime = 'edge';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const version = '1.1';
        const userInfo: any[] = await mongodb()
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

        return toJSON(userInfo);
    } catch (err) {
        return toError('Lỗi ' + err, 500);
    }
}
