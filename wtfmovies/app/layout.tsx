import './globals.scss';
import type { Metadata } from 'next';
import { montserrat } from './font';

export const metadata: Metadata = {
    title: 'WTF movies',
    description: 'Nơi thoả sức đam mê phim ảnh',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={montserrat.className}>{children}</body>
        </html>
    );
}
