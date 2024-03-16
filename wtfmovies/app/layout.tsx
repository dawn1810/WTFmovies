import Layout from '~/app/layout';
import React from 'react';
export const metadata = {
    title: 'Wonderfull Time For Movies',
    description: 'Product by WTFDevs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <Layout>{children}</Layout>;
}
