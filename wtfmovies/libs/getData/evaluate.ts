import { mongodb } from '~/libs/func';
import { EvalTableInterface, ExtendedUser } from '../interfaces';
import { auth } from '~/app/api/auth/[...nextauth]/auth';

export const getEvaluateList = async (): Promise<EvalTableInterface | undefined> => {
    try {
        const evaluateList: EvalTableInterface[] = await mongodb()
            .db('evaluate')
            .collection('table')
            .aggregate({
                pipeline: [{ $sort: { version: -1 } }, { $limit: 1 }],
            });

        return evaluateList[0];
    } catch (err) {
        console.log('😨😨😨 error at home/getEvaluateList function  : ', err);
    }
};

export const getCurrentScore = async (): Promise<EvalTableInterface | undefined> => {
    try {
        const session = await auth();

        if (!session) return undefined;

        const extendedUser: ExtendedUser | undefined = session?.user;

        const evaluateList: EvalTableInterface[] = await mongodb()
            .db('user')
            .collection('evaluate')
            .find({
                filter: { email: extendedUser?.email },
            });

        return evaluateList[0];
    } catch (err) {
        console.log('😨😨😨 error at home/getCurrentScore function  : ', err);
    }
};
