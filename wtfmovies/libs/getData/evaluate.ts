import { mongodb } from '~/libs/func';
import { RowInterface } from '../interfaces';

export const getEvaluateList = async (): Promise<RowInterface[]> => {
    try {
        const evaluateList: RowInterface[] = await mongodb()
            .db('evaluate')
            .collection('table')
            .aggregate({
                pipeline: [{ $sort: { _id: 1 } }],
            });

        return evaluateList;
    } catch (err) {
        console.log('😨😨😨 error at home/getEvaluateList function  : ', err);
        return [];
    }
};
