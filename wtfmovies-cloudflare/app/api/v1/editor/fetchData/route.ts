export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { mongodb, toError, toJSON } from '~/libs/func';

type dataType = { collection: 'actor' | 'author' | 'director' | 'genre' };

export async function POST(request: NextRequest) {
    try {


        const { collection }: dataType = await request.json();
        if (collection !== 'actor' && collection !== 'author' && collection !== 'director' && collection !== 'genre') {
            return toError('Dữ liệu không hợp lệ', 400);
        }
        const data: any[] = await mongodb()
            .db('film')
            .collection(collection)
            .find();

        return toJSON(data.map(item => {
            const firstLetter = item.name.charAt(0);
            return {
                title: item.name,
                id: item._id,
                firstLetter: firstLetter
            };
        }));



    } catch (err) {
        console.log(err);

        return toError('Lỗi trong quá trình lấy thông tin', 500);
    }
}
