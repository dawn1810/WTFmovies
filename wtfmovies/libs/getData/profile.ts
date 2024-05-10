import { mongodb } from '~/libs/func';
import { EpisodeInterFace, ExtendedUser, FilmInfo, MongoUpdate, ObjectMongo, UserInfoInterface } from '../interfaces';
import { auth } from '~/app/api/auth/[...nextauth]/auth';

export const getUserInfo = async (): Promise<any> => {
    try {
        const session = await auth();
        if (!session) return undefined;
        const extendedUser: ExtendedUser | undefined = session?.user;

        const userInfo: UserInfoInterface[] = await mongodb()
            .db('user')
            .collection('information')
            .aggregate({
                pipeline: [
                    { $match: { email: extendedUser?.email } },
                    {
                        $lookup: {
                            from: 'auth',
                            localField: 'email',
                            foreignField: 'email',
                            as: 'auth',
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            name: 1,
                            birthDate: 1,
                            actor: 1,
                            director: 1,
                            genres: '$genres.label',
                            languages: '$languages.label',
                            status: 1,
                            avatar: '$auth.avatar',
                            email: extendedUser?.email,
                        },
                    },
                    { $limit: 1 },
                ],
            });

        return userInfo[0];
    } catch (err) {
        console.log('😨😨😨 error at profile/getUserInfo function  : ', err);
    }
};
