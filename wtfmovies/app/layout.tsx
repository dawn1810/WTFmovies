import './globals.scss';
export const runtime = 'edge';
import { SessionProvider } from 'next-auth/react';
import type { Metadata } from 'next';
import { montserrat } from './font';
import ReduxProvider from '~/redux/redux-provider';
import ThemeP from '~/components/theme/theme';
export const metadata: Metadata = {
    title: 'WTFmovies',
    description: 'Nơi thoả sức đam mê phim ảnh',
    applicationName: 'WTFmovies',
    authors: { name: 'WTF dev', url: 'https://wtfdev.com/' },
    icons: '/favicon.svg',
};

export default function RootLayout({

    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <ReduxProvider>
            <ThemeP>
                <SessionProvider>
                    <html lang="en">
                        <body className={montserrat.className}>{children}</body>
                    </html>
                </SessionProvider>
            </ThemeP>
        </ReduxProvider>
    );
}
