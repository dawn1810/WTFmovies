import React from 'react';
import Header from '~/layouts/components/Header';
import Leftbar from '~/layouts/components/Leftbar';
import { faFilm, faHouse } from '@fortawesome/free-solid-svg-icons';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const menuItems = [
    {
        title: 'Tổng quan',
        icon: faHouse,
        scene: 'overview',
    },
    {
        title: 'Quản lý phim',
        icon: faFilm,
        scene: 'film',
    }
];

export default function Layout({ children, params }: { children: React.ReactNode, params: { page: string } }) {
    return (
        <Container fluid className='p-0' >
            <Row className="flex-nowrap g-0">
                <Col xs={2} id="sidebar-container">
                    <Leftbar menuItems={menuItems} scene={params.page[0]} />
                </Col>
                <Col xs={10} id="main-container">
                    <Header isDatabase title='Editer' />
                    <div className="main-content">{children}</div>
                </Col>
            </Row>
        </Container>
    );
}

