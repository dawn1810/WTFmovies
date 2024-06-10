export const runtime = 'edge';
import { cookies } from 'next/headers';
import { env, toJSON } from '~/libs/func';

export async function GET() {
    const cookieStore = cookies();
    const key = cookieStore.get('PUBLISH_KEY');
    if (!!key) {
        return toJSON(key);
    } else {
        const oneDay = 24 * 60 * 60 * 1000;
        cookies().set('PUBLISH_KEY', env.PUBLISH_KEY, { secure: true, expires: Date.now() - oneDay });
        return toJSON(env.PUBLISH_KEY);
    }
}
