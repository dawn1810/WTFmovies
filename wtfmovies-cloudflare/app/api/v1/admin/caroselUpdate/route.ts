export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { mongodb, ObjectId, toError, toJSON, uploadImagetoTiktok } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

interface dataType {
    oldId: string;
    _id: string;
    film_name: string;
    film_id: string;
    poster: string;
    firstLetter: string;
}
export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return toError('Xác thực thất bại', 401);

        const extendedUser: ExtendedUser | undefined = session?.user;
        if (extendedUser?.role === 'admin') {
            const formData: any = await request.formData();

            //code from hell
            const imageBannerLink =
                !!formData.get('specialPoster') && formData.get('specialPoster') instanceof Blob
                    ? await uploadImagetoTiktok(await formData.get('specialPoster'))
                    : formData.get('specialPoster');
            console.log(imageBannerLink);

            const info = await formData.get('info');
            const {
                oldId,
                film_id,
                film_name,
                poster
            }: dataType = await JSON.parse(info);
            const query: any = { $set: { film_id: film_id } };
            const datareturn: any = { id: oldId, film_id: film_id, poster: poster, film_name: film_name };
            if (imageBannerLink !== poster) {
                query.$set.specialPoster = imageBannerLink;
                datareturn.specialPoster = imageBannerLink;
            } else {
                query.$unset = { specialPoster: "" };
            }
            console.log(query);

            const carosel: any = await mongodb()
                .db('film')
                .collection('carosel')
                .updateOne({ filter: { _id: ObjectId(oldId) }, update: query });


            return toJSON({ statusCode: 200, content: datareturn });

        } else {
            return toError('Api không trong phạm trù quyền của bạn', 403);
        }
    } catch (err) {
        return toError('Lỗi trong quá trình cập nhật', 500);
    }
}
