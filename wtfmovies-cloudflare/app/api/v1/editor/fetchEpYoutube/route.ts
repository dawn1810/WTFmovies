export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { ObjectId, mongodb, toError, toJSON } from '~/libs/func';
import { ObjectMongo } from '~/libs/interfaces';
import { getYoutubePlaylistItems } from '~/libs/uploadAPI';
import { ExtendedUser } from '~/libs/interfaces';
import { auth } from '~/app/api/auth/[...nextauth]/auth';

type dataType = {
    type?: string;
    playlistId: string;
    nameInput?: string;
    describe?: string;
    status?: string;
    author?: string[];
    director?: string[];
    tag?: string;
    country?: string;
    actor?: string[];
    img?: string;
    poster?: string;
    genre?: string[];
    maxEp?: number;
};

const updateList = async (list: string[], collection: string): Promise<ObjectMongo[]> => {
    for (const name of list) {
        await mongodb()
            .db('film')
            .collection(collection)
            .updateMany({ filter: { name }, update: { $set: { name } }, upsert: true });
    }

    const result = await mongodb()
        .db('film')
        .collection(collection)
        .find({ filter: { name: { $in: list } }, projection: { _id: 1 } });

    return result.map((r) => ObjectId(r._id));
};

export async function POST(request: NextRequest) {
    try {

        const session = await auth();

        if (!session) return toError('Xác thực thất bại', 401);

        const extendedUser: ExtendedUser | undefined = session?.user;
        if (extendedUser?.role === 'editor') {
            const {
                type,
                playlistId,
                nameInput,
                describe,
                status,
                author,
                director,
                tag,
                country,
                actor,
                img,
                poster,
                genre,
                maxEp,
            }: dataType = await request.json();

            // load episodes
            const episodeList: { result: any[]; filmExisted?: any } = await getYoutubePlaylistItems(playlistId, extendedUser?.email);

            if (type === 'fetchEpisodes') return toJSON(episodeList, 200);

            return toError('Đăng tải phim không thành công', 400);
        }
        return toJSON('😎😎😎', 200);

    } catch (err) {
        return toError('Lỗi' + err, 500);
    }
}
