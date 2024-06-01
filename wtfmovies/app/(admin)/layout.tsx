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
import { BorderColorOutlined, FlagOutlined, ForumOutlined, HomeOutlined, MovieOutlined } from '@mui/icons-material';
import { getNotificationList } from '~/libs/getData/notification';
import NotFound from '../(root)/not-found';
import { getCurrentUser } from '~/libs/getData/home';

const APP_NAME = 'Admin';
const APP_DEFAULT_TITLE = 'Admin';
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
        title: 'Quản lý người dùng',
        icon: <BorderColorOutlined />,
        scene: 'users',
    },
    {
        title: 'Quản lý báo cáo',
        icon: <FlagOutlined />,
        scene: 'report',
    },
    {
        title: 'Quản lý bình luận',
        icon: <ForumOutlined />,
        scene: 'comment',
    },
    {
        title: 'Quản lý phim',
        icon: <MovieOutlined />,
        scene: 'films',
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
    const currentUser = await getCurrentUser();
    const notifications = await getNotificationList();

    if (!notifications) return NotFound();

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
                                        <Header
                                            isDatabase
                                            title="Admin"
                                            currentUser={currentUser}
                                            notifyLength={notifications[0].list.length}
                                        />
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
