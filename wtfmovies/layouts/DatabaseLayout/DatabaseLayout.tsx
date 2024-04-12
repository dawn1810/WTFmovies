'use client';
import React from 'react';
import Header from '../components/Header';
import Leftbar from '../components/Leftbar';
import './DatabaseLayout.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

function DatabaseLayout({ children, menuitem, scene }: {
    children: React.ReactNode, menuitem: {
        title: string;
        icon: IconDefinition,
        scene: string,
    }[], scene: string
}) {
    return (
        <Container fluid className='p-0' >
            <Row className="flex-nowrap g-0">
                <Col xs={2} id="sidebar-container">
                    <Leftbar menuItems={menuitem} scene={scene} />
                </Col>
                <Col xs={10} id="main-container">
                    <Header isDatabase title='Editer' />
                    <div className="main-content">{children}</div>
                </Col>
            </Row>
        </Container>
    );
}

export default DatabaseLayout;
