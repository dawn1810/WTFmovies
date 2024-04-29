import { ObjectId, mongodb, toJSON } from '~/libs/func';
export const runtime = 'edge';
import type { NextRequest } from 'next/server';


export async function GET(request: NextRequest) {
    const data = await mongodb().db('film').collection('genre').updateMany({
        filter: {},
        update: {
            $unset: {
                searchName: -1
            }
        },
    })

    return toJSON(data);




}
