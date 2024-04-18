export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { ObjectId, mongodb, reply } from '~/libs/func';

interface dataType {
    filmName: string;
    user_id: string;
    avatar: string;
    username: string;
    content: string;
}

export async function POST(request: NextRequest) {
    const { filmName, user_id, avatar, username, content }: dataType = await request.json();
    // const today = new Date();

    const result = await mongodb()
        .db('film')
        .collection('comment')
        .insertOne({
            user_id: user_id,
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
