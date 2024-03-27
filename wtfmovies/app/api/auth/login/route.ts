export const runtime = 'edge';
import { cookies } from 'next/headers';
import { getRequestContext } from '@cloudflare/next-on-pages';
import type { NextRequest } from 'next/server';
import { mongodb, comparePassWord, decryptData, encryptData } from '~/libs/func';

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
            const oneDay = 24 * 60 * 60 * 1000;
            const encryptId1: string = await encryptData(getRequestContext().env.publicKey, 'haha' + userAuth.user_id);
            const encryptId2: string = await encryptData(getRequestContext().env.publicKey, 'huhu' + userAuth.user_id);

            if (data.remember) {
                //store cookies forever
                cookies().set('account', encryptId1, { expires: Date.now() + 30 * oneDay, secure: true });
            } else {
                cookies().set('account', encryptId2, { expires: Date.now() + oneDay, secure: true });
            }
            return new Response();
        } else return new Response(JSON.stringify(userAuth.user_id, null, 2), { status: 404 });
    } else {
        return new Response(null, { status: 500 });
    }
}
