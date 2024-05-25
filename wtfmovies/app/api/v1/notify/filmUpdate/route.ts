export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { MongoDate, ObjectId, mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

type dataType = { filmId: string };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return undefined;

        const extendedUser: ExtendedUser | undefined = session?.user;
        // check auth

        const { filmId }: dataType = await request.json();

        const filmInfo = await mongodb()
            .db('film')
            .collection('information')
            .findOne({
                filter: { film_id: filmId },
                projection: { _id: 0, name: 1, videoType: 1, searchName: 1 },
            });

        if (!filmInfo) return toError('Film không tồn tại', 400);

        const { name, videoType, searchName } = filmInfo;
        const today = new Date();

        const notifyAdd = await mongodb()
            .db('user')
            .collection('notify')
            .insertOne({
                content: name + 'đã có tập' + videoType[0].episode.length,
                time: MongoDate(today),
                link: `/watch/${searchName}/tap${videoType[0].episode.length}`,
            });

        if (!notifyAdd.insertedId) return toError('Gởi thông báo thất bại', 400);

        const userIds = await mongodb()
            .db('user')
            .collection('information')
            .updateMany({
                filter: {
                    loveFilms: { $in: ['PLdM751AKK4aO-1m2VuDCEKL40SUMnkUI9'] },
                },
                update: {
                    $push: { notifications: notifyAdd.insertedId },
                },
            });

        if (userIds.modifiedCount === 0) return toJSON('Không có người dùng cần thông báo', 202);

        return toJSON('Gửi thông báo thành công', 200);
    } catch (err) {
        return toError('Lỗi trong quá trình gỡ thông báo', 500);
    }
}
