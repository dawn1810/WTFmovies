export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { mongodb } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';
import { auth } from '../../auth/[...nextauth]/auth';

export async function GET(request: NextRequest) {
    const session = await auth();

    if (!session) return undefined;

    const extendedUser: ExtendedUser | undefined = session?.user
        ? {
              ...session?.user,
              email: session?.user.email as string | undefined,
          }
        : undefined;

    const info = await mongodb()
        .db('user')
        .collection('information')
        .findOne({
            filter: { user_id: extendedUser?.user_id },
            projection: {
                _id: 0,
                name: 1,
                avatar: 1,
            },
        });

    return new Response(JSON.stringify(info, null, 2));
}
