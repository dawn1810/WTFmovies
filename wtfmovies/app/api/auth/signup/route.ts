export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { mongodb, comparePassWord } from '~/libs/func';

type dataType = {
    email: string;
    password: string;
    name: string;
    birthDate: Date;
};

export async function POST(request: NextRequest) {
    const data: dataType = await request.json();
    const userAuth = await mongodb()
        .db('user')
        .collection('auth')
        .findOne({
            filter: {
                email: data.email,
            },
            projection: {
                _id: 0,
                password: 1,
            },
        });

    return new Response(JSON.stringify(comparePassWord(userAuth.password, data.password), null, 2));
}
