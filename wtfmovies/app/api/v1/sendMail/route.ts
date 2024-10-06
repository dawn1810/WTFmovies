export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { mongodb, toError, toJSON } from '~/libs/func';
import { ExtendedUser } from '~/libs/interfaces';

type dataType = { userEmail?: string; content: string };

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session) return toError('Xác thực thất bại', 401);

        const extendedUser: ExtendedUser | undefined = session?.user;
        const { userEmail, content }: dataType = await request.json();

        if (extendedUser?.role === 'admin') {
            const userName: any[] = await mongodb()
                .db('user')
                .collection('information')
                .aggregate({
                    pipeline: [
                        { $match: { email: userEmail } },
                        {
                            $project: {
                                _id: 0,
                                email: 1,
                                name: 1,
                            },
                        },
                    ],
                });

            const adminName: any[] = await mongodb()
                .db('user')
                .collection('information')
                .aggregate({
                    pipeline: [
                        { $match: { email: extendedUser.email } },
                        {
                            $project: {
                                _id: 0,
                                email: 1,
                                name: 1,
                            },
                        },
                    ],
                });

            const body = {
                receiver: [
                    userEmail,
                ],
                subject: '[WTFmovies] Cảm ơn vì thông tin của bạn',
                description: {
                    content: content,
                },
                template: 'mail',
            };

            const response = await fetch('https://mailwtfdev.binhminh19112003.workers.dev/api/mail/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                return toJSON({ statusCode: 200, content: 'Gửi mail thành công' });
            }

            return toError('Gửi mail thất bại', 400);
        } else {
            return toError('Api không trong phạm trù quyền của bạn', 403);
        }
    } catch (err) {
        return toError('Lỗi trong quá trình gửi mail', 500);
    }
}
