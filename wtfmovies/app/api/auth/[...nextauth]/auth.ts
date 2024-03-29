import { randomBytes, randomUUID } from 'crypto';
import NextAuth, { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { comparePassWord, env, mongodb } from '~/libs/func';



const login = async (credentials: any) => {
    try {
        // check for first time login
        const userAuth = await mongodb()
            .db('user')
            .collection('auth')
            .findOne({
                filter: {
                    email: credentials.email,
                },
                projection: {
                    _id: 0,
                },
            });

        if (!userAuth) throw new Error('Email không tồn tại!');
        // have user check password
        const passAuth = await comparePassWord(userAuth.password, credentials.password);

        if (!passAuth) throw new Error('Mật khẩu không chính xác!');
        return userAuth;
    } catch (error) {
        console.log('Error while logging in');
        throw new Error('Lỗi trong quá trình đăng nhập!');
    }
};

const authOptions: NextAuthConfig = {
    session: {
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString('hex');
        },
        maxAge: 60 * 60 * 24 * 30,
        strategy: 'jwt',
        updateAge: 24 * 60 * 60,
    },
    secret: env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user;
                } catch (error) {
                    throw new Error('Đăng nhập thất bại!');
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                token.email = user.email;
                token.password = user.password;
            }
            console.log('token: ', token);

            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (token) {
                session.user.email = token.email;
                session.user.password = token.password;
            }
            console.log('session: ', session);
            return session;
        },
    },
};

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth(authOptions);

