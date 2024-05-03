import '../globals.scss';
export const runtime = 'edge';
import { SessionProvider } from 'next-auth/react';
import type { Metadata, Viewport } from 'next';
import { montserrat } from '../font';
import ReduxProvider from '~/redux/redux-provider';
import ThemeP from '~/hooks/theme/theme';
import BottomBar from '~/layouts/components/BottomBar';
import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';
import { getCurrentUser } from '~/libs/getData/home';
import { getGenres } from '~/libs/getData/search';

const APP_NAME = 'WTFmovies';
const APP_DEFAULT_TITLE = 'WTFmovies';
const APP_TITLE_TEMPLATE = '%s - WTFmovies';
const APP_DESCRIPTION = 'Nơi thoả sức đam mê phim ảnh!';

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    manifest: '/manifest.json',
    icons: '/images/icons/favicon.svg',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: APP_DEFAULT_TITLE,
        // startUpImage: [],
    },
    formatDetection: {
        telephone: false,
    },
    // openGraph: {
    //     type: "website",
    //     siteName: APP_NAME,
    //     title: {
    //         default: APP_DEFAULT_TITLE,
    //         template: APP_TITLE_TEMPLATE,
    //     },
    //     description: APP_DESCRIPTION,
    // },
    // twitter: {
    //     card: "summary",
    //     title: {
    //         default: APP_DEFAULT_TITLE,
    //         template: APP_TITLE_TEMPLATE,
    //     },
    //     description: APP_DESCRIPTION,
    // },
};

export const viewport: Viewport = {
    themeColor: '#0f0f0f',
};
// export const metadata: Metadata = {
//     title: 'WTFmovies',
//     description: 'Nơi thoả sức đam mê phim ảnh',
//     applicationName: 'WTFmovies',
//     authors: { name: 'WTF dev', url: 'https://wtfdev.com/' },
//     icons: '/images/icons/favicon.svg',
// };

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const currentUser = await getCurrentUser();
    const genres = await getGenres();

    return (
        <ReduxProvider>
            <ThemeP>
                <SessionProvider>
                    <html lang="en">
                        <body className={montserrat.className}>
                            <Header currentUser={currentUser} genres={genres} />
                            <section>{children}</section>
                            <Footer />
                            <BottomBar />
                        </body>
                    </html>
                </SessionProvider>
            </ThemeP>
        </ReduxProvider>
    );
}