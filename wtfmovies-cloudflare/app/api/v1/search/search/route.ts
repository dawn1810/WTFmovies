export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { toJSON, toError, preprocessString } from '~/libs/func';
import { mongodb } from '~/libs/func';
import { getEmbedding } from '~/libs/getData/getEmbeddings';

type dataType = {
    searchValue: string;
};

export async function POST(request: NextRequest) {
    try {
        const { searchValue }: dataType = await request.json();

        if (searchValue.length > 250) return toError('Nội dung tìm kiếm quá dài', 400);

        const processString: string = preprocessString(searchValue);

        const embedding: any = await getEmbedding('@cf/baai/bge-small-en-v1.5', {
            text: processString,
        });

        const keywordList: any[] = await mongodb()
            .db('statistical')
            .collection('search')
            .find({
                filter: { content: { $regex: `(?i)${processString}` } },
                limit: 5,
                sort: { time: -1, content: 1 },
            });

        // const filmsList: any[] = await mongodb()
        //     .db('film')
        //     .collection('information')
        //     .find({
        //         filter: {
        //             searchName: { $regex: `(?i)${processString}` },
        //             status: { $ne: 'delete' },
        //         },
        //         projection: { _id: 0, name: 1, searchName: 1, updateTime: 1, img: 1 },
        //         limit: 5,
        //         sort: { view: -1, like: -1, updateTime: -1, name: 1 },
        //     });

        const filmsList: any[] = await mongodb()
            .db('film')
            .collection('information')
            .aggregate({
                pipeline: [
                    {
                        $vectorSearch: {
                            index: 'default',
                            queryVector: embedding.result.data[0], // get embedding vector
                            path: 'embedding',
                            exact: true,
                            limit: 5,
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            name: 1,
                            searchName: 1,
                            updateTime: 1,
                            img: 1,
                            score: {
                                $meta: 'vectorSearchScore',
                            },
                        },
                    },
                ],
            });

        return toJSON(
            {
                keywordList,
                filmsList,
            },
            200,
        );
    } catch (err) {
        console.log(err);
        return toError('Lỗi trong quá trình tìm kiếm', 500);
    }
}
