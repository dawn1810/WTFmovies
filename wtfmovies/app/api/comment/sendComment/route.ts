export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { mongodb } from '~/libs/func';

interface dataType {
    filmName: string;
    user_id: string;
    avatar: string;
    name: string;
    content: string;
}

export async function GET(request: NextRequest) {
    const { filmName, user_id, avatar, name, content }: dataType = await request.json();
    const today = new Date();

    const result = await mongodb().db('films').collection('comment').insertOne({
        user_id: user_id,
        name: name,
        avatar: avatar,
        content: content,
        time: today,
        status: true,
    });

    await mongodb()
        .db('films')
        .collection('information')
        .updateOne({ filter: { searchName: filmName }, update: { $push: { comment: result.insertedId } } });

    return new Response(JSON.stringify(null, null, 2));
}
