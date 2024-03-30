import { randomBytes, randomUUID } from 'crypto';
import NextAuth, { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { comparePassWord, env, mongodb, toError, toJSON } from '~/libs/func';

const login = async (credentials: any) => {
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

    if (!userAuth) throw new Error('Mật khẩu không chính xác');

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
        async signIn({ user, credentials }) {
            if (user) {
                return true;
            }
            // Return false to indicate failed authentication
            // You can also return a custom error URL if needed
            return false;
        },
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                token.email = user.email;
                token.password = user.password;
            }

            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (token) {
                session.user.email = token.email;
                session.user.password = token.password;
            }
            return session;
        },
    },
};

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth(authOptions);
