import { mongodb } from '~/libs/func';
import { EvalTableInterface, ExtendedUser, ScoreInterface } from '../interfaces';
import { auth } from '~/app/api/auth/[...nextauth]/auth';

export const getEvaluateList = async (): Promise<EvalTableInterface | undefined> => {
    try {
        const evaluateList: EvalTableInterface[] = await mongodb()
            .db('evaluate')
            .collection('table')
            .aggregate({
                pipeline: [{ $sort: { time: -1 } }, { $limit: 1 }],
            });

        return evaluateList[0];
    } catch (err) {
        console.log('😨😨😨 error at home/getEvaluateList function  : ', err);
    }
};

export const getCurrentScore = async (): Promise<ScoreInterface | undefined> => {
    try {
        const session = await auth();

        if (!session) return undefined;

        const extendedUser: ExtendedUser | undefined = session?.user;

        const evaluateList: ScoreInterface[] = await mongodb()
            .db('user')
            .collection('evaluate')
            .find({
                filter: { _id: extendedUser?.email },
            });

        return evaluateList[0];
    } catch (err) {
        console.log('😨😨😨 error at home/getCurrentScore function  : ', err);
    }
};

export const getAllUserScore = async (version: string): Promise<any | undefined> => {
    try {
        const session = await auth();

        if (!session) return undefined;

        const getAllUserScore: ExtendedUser | undefined = session?.user;

        if (getAllUserScore?.role === 'admin') {
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
            return userInfo;
        }
    } catch (err) {
        console.log('😨😨😨 error at home/getAllUserScore function  : ', err);
    }
};

export const getVersionList = async (): Promise<any | undefined> => {
    try {
        const versionList: any[] = await mongodb()
            .db('evaluate')
            .collection('table')
            .find({
                projection: {
                    _id: 0,
                    version: 1,
                },
                sort: { time: -1 },
            });

        return versionList;
    } catch (err) {
        console.log('😨😨😨 error at home/getCurrentScore function  : ', err);
    }
};
