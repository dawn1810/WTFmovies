import { ObjectId, mongodb, toJSON } from '~/libs/func';
export const runtime = 'edge';
import type { NextRequest } from 'next/server';


export async function GET(request: NextRequest) {
    const data = await mongodb().db('film').collection('genre').find({ filter: {} })

    let res: any = [];
    data.forEach(async doc => {

        const name = doc.name.toLowerCase().replace(/\s+/g, '-');
        res.push(await mongodb().db('film').collection('genre').updateOne(
            {
                filter:
                    { _id: ObjectId(doc._id) },
                update:
                    { $set: { searchName: name } }
            }
        ));
        console.log('>>', res);
    })
    return toJSON(res);




}
