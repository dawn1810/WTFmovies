export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { mongodb, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';
import { auth } from '~/app/api/auth/[...nextauth]/auth';

export async function GET(request: NextRequest) {
    const session = await auth();

    if (!session) return undefined;

    const extendedUser: ExtendedUser | undefined = session?.user;

    const info = await mongodb()
        .db('user')
        .collection('information')
        .findOne({
            filter: { email: extendedUser?.email },
            projection: {
                _id: 0,
                name: 1,
            },
        });

    info.avatar = extendedUser?.avatar;

    return toJSON(info);
}
