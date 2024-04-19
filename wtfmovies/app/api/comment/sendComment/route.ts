export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { ObjectId, mongodb, reply } from '~/libs/func';
import { auth } from '../../auth/[...nextauth]/auth';
import { ExtendedUser } from '~/libs/interfaces';

interface dataType {
    filmName: string;
    avatar: string;
    username: string;
    content: string;
}

export async function POST(request: NextRequest) {
    const session = await auth();

    if (!session) return undefined;

    const extendedUser: ExtendedUser | undefined = session?.user;

    const { filmName, avatar, username, content }: dataType = await request.json();
    // const today = new Date();

    const result = await mongodb()
        .db('film')
        .collection('comment')
        .insertOne({
            email: extendedUser?.email,
            username: username,
            avatar: avatar,
            content: content,
            time: { $currentDate: { $type: 'date' } },
            status: true,
        });

    await mongodb()
        .db('film')
        .collection('information')
        .updateOne({ filter: { searchName: filmName }, update: { $push: { comment: ObjectId(result.insertedId) } } });

    return reply();
}
