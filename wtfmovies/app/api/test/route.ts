import { MongoDate, ObjectId, mongodb, preprocessString, toError, toJSON } from '~/libs/func';
export const runtime = 'edge';
import type { NextRequest } from 'next/server';

const getFilms = async (): Promise<any> => {
    try {
        const searchString = 'inu';

        const processString: string = preprocessString(searchString);

        const keywordList: any[] = await mongodb()
            .db('statistical')
            .collection('search')
            .find({ filter: { content: { $regex: `(?i)${processString}` } } });

        const filmsList: any[] = await mongodb()
            .db('film')
            .collection('information')
            .find({
                filter: { searchName: { $regex: `(?i)${processString}` } },
                projection: { _id: 0, name: 1, searchName: 1, updateTime: 1 },
            });
        return JSON.stringify({
            keywordList,
            filmsList,
        });
    } catch (err) {
        console.log('😨😨😨 error at home/getFilms function  : ', err);
        return [];
    }
};

export async function GET(request: NextRequest) {
    try {
        return toJSON(await getFilms());
    } catch (err) {
        return toError('Lỗi ' + err, 500);
    }
}
