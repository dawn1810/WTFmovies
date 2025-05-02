export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { MongoDate, mongodb, ObjectId, toError, toJSON } from '~/libs/func';
import { auth } from '../../auth/[...nextauth]/auth';
import { ExtendedUser } from '~/libs/interfaces';

type dataType = { type: 'film' | 'comment' | 'feedback'; content: string; reportedInfo: { id: string; ep?: number } };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return undefined;

        const extendedUser: ExtendedUser | undefined = session?.user;
        const { type, content, reportedInfo }: dataType = await request.json();
        const today = new Date();

        const data =
            type === 'comment'
                ? {
                      from: extendedUser?.email,
                      type,
                      content,
                      reportedInfo: {
                          ...reportedInfo,
                          id: ObjectId(reportedInfo.id),
                      },
                      time: MongoDate(today),
                  }
                : type === 'film'
                ? {
                      from: extendedUser?.email,
                      type,
                      content,
                      reportedInfo,
                      time: MongoDate(today),
                  }
                : {
                      from: extendedUser?.email,
                      type,
                      content,
                      time: MongoDate(today),
                  };

        const response = await mongodb().db('statistical').collection('report').insertOne(data);

        if (!!response) return toJSON('Gửi báo cáo thành công');

        return toError('Gửi báo cáo thất bại', 400);
    } catch (err) {
        return toError('Lỗi trong quá trình gửi báo cáo' + err, 500);
    }
}
