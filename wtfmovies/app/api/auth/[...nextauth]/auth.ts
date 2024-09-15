import { randomBytes, randomUUID } from 'crypto';
import NextAuth, { AuthError, NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import { comparePassWord, env, mongodb } from '~/libs/func';

class customError extends AuthError {
    constructor(message: string) {
        super();
        this.message = message;
    }
}

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

    if (!userAuth) throw new customError('Email không tồn tại');
    else if (!userAuth.status) {
        const today = new Date();
        const unBanDate = new Date();
        if (today > unBanDate) {
            const updateStatus = await mongodb()
                .db('user')
                .collection('auth')
                .updateOne({
                    filter: { email: credentials.email },
                    update: {
                        $set: { status: true },
                    },
                });

            if (updateStatus.modifiedCount === 0) throw new customError('Lỗi thử lại sau ít phút');
        } else throw new customError('Tài khoản đang bị cấm');
    }

    // have user check password
    const passAuth = await comparePassWord(userAuth.password, credentials.password);

    if (!passAuth) throw new customError('Mật khẩu không chính xác');

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
        GitHubProvider({
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        }),
        FacebookProvider({
            clientId: env.FACEBOOK_CLENT_ID,
            clientSecret: env.FACEBOOK_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }): Promise<string | boolean> {
            // console.log(user);
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
            if (account?.provider === 'google' || account?.provider === 'github' || account?.provider === 'facebook') {
                user = await googleLogin(user); // update session
            }

            if (trigger === 'update' && session) {
                if (session.user.avatar) token.avatar = session.user.avatar;
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
            if (trigger === 'update' && newSession) {
                if (newSession.user.avatar) session.user.avatar = newSession.user.avatar;
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
    signIn,
    signOut,
} = NextAuth(authOptions);
