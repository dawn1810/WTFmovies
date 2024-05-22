import { mongodb } from '~/libs/func';
import { EpisodeInterFace, ExtendedUser, FilmInfo, MongoUpdate, ObjectMongo, UserInfoInterface } from '../interfaces';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { getUserLoveFilm } from './home';

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

export const getUserLoveFilmsInfo = async (): Promise<any> => {
    try {
        const session = await auth();
        if (!session) return undefined;

        const loveFilms = await getUserLoveFilm();

        const filmsInfo: any[] = await mongodb()
            .db('film')
            .collection('information')
            .find({
                filter: {
                    searchName: { $in: loveFilms },
                },
                projection: {
                    _id: 0,
                    searchName: 1,
                    name: 1,
                    img: 1,
                    views: 1,
                    likes: 1,
                    status: 1,
                    updateTime: 1,
                },
            });

        return filmsInfo;
    } catch (err) {
        console.log('😨😨😨 error at profile/getUserInfo function  : ', err);
    }
};
