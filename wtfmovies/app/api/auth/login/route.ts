export const runtime = 'edge';
import { cookies } from 'next/headers';
import { getRequestContext } from '@cloudflare/next-on-pages';
import type { NextRequest } from 'next/server';
import { mongodb, comparePassWord, decryptData } from '~/libs/func';

type dataType = {
    email: string;
    password: string;
    remember: boolean;
};

export async function POST(request: NextRequest) {
    const data: dataType = await request.json();

    const newPassword = await decryptData(getRequestContext().env.privateKey, data.password);

    // check for first time login
    const userAuth = await mongodb()
        .db('user')
        .collection('auth')
        .findOne({
            filter: {
                email: data.email,
            },
            projection: {
                _id: 0,
            },
        });

    if (!!userAuth) {
        // have user check password
        const passAuth = await comparePassWord(userAuth.password, newPassword);

        if (passAuth) {
            cookies().set('account', data.email, { secure: true });
            return new Response();
        } else return new Response(JSON.stringify(userAuth.user_id, null, 2), { status: 404 });
    } else {
        return new Response(null, { status: 500 });
    }
}
