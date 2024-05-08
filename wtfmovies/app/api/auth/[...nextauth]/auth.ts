import { randomBytes, randomUUID } from 'crypto';
import NextAuth, { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AnyIfEmpty } from 'react-redux';
import { comparePassWord, env, mongodb } from '~/libs/func';

const login = async (credentials: any) => {
    // check for first time login
    const userAuth = await mongodb()
        .db('user')
        .collection('auth')
        .findOne({
            filter: {
                email: credentials.email,
            },
        });

    if (!userAuth) throw new Error('Email không tồn tại');

    // have user check password
    const passAuth = await comparePassWord(userAuth.password, credentials.password);

    if (!passAuth) throw new Error('Mật khẩu không chính xác');

    return userAuth; // login successfull
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
                const user = await login(credentials);
                return user;
            },
        }),
    ],
    callbacks: {
        // async signIn({ user, credentials }) {
        //     if (user) {
        //         return true;
        //     }
        //     // Return false to indicate failed authentication
        //     // You can also return a custom error URL if needed
        //     return false;
        // },
        async jwt({ token, user, trigger, session }: { token: any; user: any; trigger?: any; session?: any }) {
            if (trigger === 'update' && session.user.avatar) {
                token.avatar = session.user.avatar;
            }

            if (user) {
                token.id = user._id;
                token.email = user.email;
                token.role = user.role;
                token.first = user.first;
                token.avatar = user.avatar;
                token.status = user.status;
            }

            return token;
        },
        async session({
            session,
            token,
            trigger,
            newSession,
        }: {
            session: any;
            token: any;
            trigger?: any;
            newSession: any;
        }) {
            if (trigger === 'update' && newSession?.user.avatar) {
                session.user.avatar = newSession.user.avatar;
            }

            if (token) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.role = token.role;
                session.user.first = token.first;
                session.user.avatar = token.avatar;
                session.user.status = token.status;
            }

            return session;
        },
    },
};

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth(authOptions);
