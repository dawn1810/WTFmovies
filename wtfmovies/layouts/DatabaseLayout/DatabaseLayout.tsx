'use client';
import React from 'react';
import classNames from 'classnames/bind';
import Header from '../components/Header';
import Leftbar from '../components/Leftbar';
import styles from './DatabaseLayout.module.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const cx = classNames.bind(styles);

function DatabaseLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container fluid className={cx('wrapper', 'p-0')}>
            <Row className="flex-nowrap g-0">
                <Col xs={2} id="sidebar-container">
                    <Leftbar />
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
