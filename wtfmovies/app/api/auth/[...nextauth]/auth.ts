import { randomBytes, randomUUID } from 'crypto';
import NextAuth, { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
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

const googleLogin = async (user: any) => {
    // check for first time login
    const checkUser = await mongodb()
        .db('user')
        .collection('auth')
        .findOne({
            filter: {
                email: user.email,
            },
        });

    // create new user
    if (!checkUser) {
        const newAuth = await mongodb().db('user').collection('auth').insertOne({
            email: user.email,
            avatar: user.image,
            role: 'none',
            first: true,
            status: true,
        });

        const newInfo = await mongodb().db('user').collection('information').insertOne({
            email: user.email,
            name: user.name,
            birthDate: '2003-10-18',
        });

        if (!!newAuth && !!newInfo) return user;
        else throw new Error('Cập nhật user mới không thành công');
    }

    return checkUser;
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
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }): Promise<string | boolean> {
            if (account?.provider === 'google') {
                return !!profile?.email_verified;
            }

            if (!user) {
                return false;
            }

            return true;
        },
        async jwt({
            token,
            user,
            account,
            trigger,
            session,
        }: {
            token: any;
            user: any;
            account: any;
            trigger?: any;
            session?: any;
        }) {
            if (account?.provider === 'google') {
                user = await googleLogin(user); // update session
            }

            if (trigger === 'update' && session.user.avatar) {
                token.avatar = session.user.avatar;
            }

            if (user) {
                token.id = user._id;
                token.email = user.email;
                token.role = user.role;
                token.first = user.first;
                token.avatar = user.avatar || user.image;
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
