import './globals.scss';
export const runtime = 'edge';
import type { Metadata } from 'next';
import { montserrat } from './font';
import ReduxProvider from '~/redux/redux-provider';
import { CookiesProvider } from 'next-client-cookies/server';

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
            <CookiesProvider>
                <html lang="en">
                    <body className={montserrat.className}>{children}</body>
                </html>
            </CookiesProvider>
        </ReduxProvider>
    );
}
