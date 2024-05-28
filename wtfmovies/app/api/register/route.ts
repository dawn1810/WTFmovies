export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { validateEmail, validatePassword } from '~/libs/clientFunc';
import { getSHA256Hash, reply, toError } from '~/libs/func';
import { mongodb } from '~/libs/func';

type dataType = {
    email: string;
    password: string;
    name: string;
    birthDate: Date;
};

export async function POST(request: NextRequest) {
    try {
        const { email, password, name, birthDate }: dataType = await request.json();

        const hashPassword = await getSHA256Hash(password);

        // user exist or not
        const exist = await mongodb().db('user').collection('auth').findOne({ filter: { email } });

        if (!!exist) {
            return toError('Email đã tồn tại', 400);
        } else {
            const today = new Date();
            const bd = new Date(birthDate);
            if (
                validateEmail(email) &&
                validatePassword(password) === 0 &&
                name.length !== 0 &&
                bd.getTime() < today.getTime()
            ) {
                // insert data to user/auth
                await mongodb().db('user').collection('auth').insertOne({
                    password: hashPassword,
                    email: email,
                    role: 'none',
                    first: true,
                    status: true,
                    avatar: 'https://i.pinimg.com/736x/6d/88/fe/6d88fe4f5167ce5735d03dd09acc6933.jpg',
                });
                // insert data to user/information
                await mongodb().db('user').collection('information').insertOne({
                    email: email,
                    name: name,
                    birthDate: birthDate,
                });
            } else return toError('Thông tin đăng ký không hợp lệ', 422);

            return reply();
        }
    } catch (err) {
        console.log(err);
        return toError('Lỗi trong quá trình thay đổi trạng thái', 500);
    }
}
