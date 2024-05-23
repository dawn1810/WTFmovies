export const runtime = 'edge';
import '../globals.scss';
import React from 'react';
import Header from '~/layouts/components/Header';
import Leftbar from '~/layouts/components/Leftbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SessionProvider } from 'next-auth/react';
import type { Metadata, Viewport } from 'next';
import { montserrat } from '../font';
import ReduxProvider from '~/redux/redux-provider';
import ThemeP from '~/hooks/theme/theme';
import BottomBar from '~/layouts/components/BottomBar';
import { HomeOutlined, MovieOutlined } from '@mui/icons-material';

const APP_NAME = 'Editor';
const APP_DEFAULT_TITLE = 'Editor';
const APP_TITLE_TEMPLATE = '%s - WTFmovies';
const APP_DESCRIPTION = 'Nơi thoả sức chỉnh sửa đam mê phim ảnh!';

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
    },
    formatDetection: {
        telephone: false,
    },
};

const menuItems = [
    {
        title: 'Tổng quan',
        icon: <HomeOutlined />,
        scene: 'overview',
    },
    {
        title: 'Quản lý phim',
        icon: <MovieOutlined />,
        scene: 'film',
    },
];

export const viewport: Viewport = {
    themeColor: '#0f0f0f',
};

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ReduxProvider>
            <ThemeP>
                <SessionProvider>
                    <html lang="en">
                        <body className={montserrat.className} style={{ paddingTop: 0 }}>
                            <Container fluid className="p-0">
                                <Row className="flex-nowrap g-0">
                                    <Col xs={2} id="sidebar-container">
                                        <Leftbar menuItems={menuItems} />
                                    </Col>
                                    <Col xs={10} id="main-container">
                                        <Header isDatabase title="Editor" />
                                        <section id="layout-main-content">{children}</section>
                                    </Col>
                                </Row>
                            </Container>
                            <BottomBar />
                        </body>
                    </html>
                </SessionProvider>
            </ThemeP>
        </ReduxProvider>
    );
}
