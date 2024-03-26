export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';
import type { NextRequest } from 'next/server';
import { decryptData, getSHA256Hash, generateUUIDv4 } from '~/libs/func';
import { mongodb } from '~/libs/func';

type dataType = {
    email: string;
    password: string;
    name: string;
    birthDate: Date;
};

export async function POST(request: NextRequest) {
    const data: dataType = await request.json();

    const newPassword = await decryptData(getRequestContext().env.privateKey, data.password);
    const hashPassword = await getSHA256Hash(newPassword);
    const user_id = generateUUIDv4();

    // user exist or not
    const userAuth = await mongodb()
        .db('user')
        .collection('auth')
        .findOne({
            filter: {
                email: data.email,
            },
            projection: {
                _id: 1,
            },
        });

    if (!userAuth) {
        // insert data to user/auth
        await mongodb().db('user').collection('auth').insertOne({
            user_id: user_id,
            password: hashPassword,
            email: data.email,
            role: 'none',
            name: data.name,
            birthDate: data.birthDate,
        });

        // insert data to user/information
        await mongodb().db('user').collection('information').insertOne({
            user_id: user_id,
            name: data.name,
            avatar: 'https://i.pinimg.com/736x/6d/88/fe/6d88fe4f5167ce5735d03dd09acc6933.jpg',
            birthDate: data.birthDate,
            status: false,
        });

        return new Response();
    } else {
        return new Response(null, { status: 500 });
    }
}
