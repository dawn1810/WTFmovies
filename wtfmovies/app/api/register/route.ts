export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { getSHA256Hash, generateUUIDv4 } from '~/libs/func';
import { mongodb } from '~/libs/func';

type dataType = {
    email: string;
    password: string;
    name: string;
    birthDate: Date;
};

export async function POST(request: NextRequest) {
    const { email, password, name, birthDate }: dataType = await request.json();

    const hashPassword = await getSHA256Hash(password);
    const user_id = generateUUIDv4();

    // user exist or not
    const exist = await mongodb().db('user').collection('auth').findOne({ filter: { email } });

    if (exist) {
        return new Response(null, { status: 500 });
    } else {
        // insert data to user/auth
        await mongodb().db('user').collection('auth').insertOne({
            user_id: user_id,
            password: hashPassword,
            email: email,
            role: 'none',
            first: true,
        });

        // insert data to user/information
        await mongodb().db('user').collection('information').insertOne({
            user_id: user_id,
            name: name,
            avatar: 'https://i.pinimg.com/736x/6d/88/fe/6d88fe4f5167ce5735d03dd09acc6933.jpg',
            birthDate: birthDate,
            status: false,
        });

        return new Response();
    }
}
