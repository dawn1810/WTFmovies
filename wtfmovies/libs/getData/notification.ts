import { mongodb } from '~/libs/func';
import { ExtendedUser } from '../interfaces';
import { auth } from '~/app/api/auth/[...nextauth]/auth';

export const getNotificationList = async (): Promise<any[] | undefined> => {
    try {
        const session = await auth();

        if (!session) return undefined;

        const extendedUser: ExtendedUser | undefined = session?.user;

        const notificationList: any[] = await mongodb()
            .db('user')
            .collection('information')
            .aggregate({
                pipeline: [
                    { $match: { email: extendedUser?.email } },
                    { $sort: { releaseYear: -1, updateTime: -1 } }, // Assuming you want newer updates and releases first
                    {
                        $lookup: {
                            from: 'notify',
                            let: { notifyIds: '$notifications' },
                            pipeline: [
                                { $match: { $expr: { $in: ['$_id', '$$notifyIds'] } } },
                                { $sort: { time: -1 } },
                                { $limit: 100 },
                            ],
                            as: 'notifyList',
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            list: {
                                $map: {
                                    input: '$notifyList',
                                    as: 'notify',
                                    in: {
                                        notifyId: '$$notify._id',
                                        content: '$$notify.content',
                                        time: '$$notify.time',
                                        link: '$$notify.link',
                                    },
                                },
                            },
                        },
                    },
                    { $limit: 1 },
                ],
            });

        return notificationList;
    } catch (err) {
        console.log('😨😨😨 error at home/getNotificationList function  : ', err);
        return [];
    }
};
