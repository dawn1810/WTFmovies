import { mongodb } from '~/libs/func';
import { ExtendedUser } from '../interfaces';
import { auth } from '~/app/api/auth/[...nextauth]/auth';

export const getNumberStatistical = async (): Promise<any> => {
    try {
        const statInfo: any[] = await mongodb()
            .db('statistical')
            .collection('webstats')
            .find({
                projection: {
                    _id: 0,
                },
            });

        return statInfo;
    } catch (err) {
        console.log('😨😨😨 error at home/getCurrentUserInfo function  : ', err);
    }
};
