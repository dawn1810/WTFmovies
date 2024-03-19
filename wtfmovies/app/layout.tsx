import './globals.scss';
import type { Metadata } from 'next';
import { montserrat } from './font';
import ReduxProvider from '~/redux/redux-provider';

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
            <html lang="en">
                <body className={montserrat.className}>
                    {children}
                </body>
            </html>
        </ReduxProvider>
    );
}
