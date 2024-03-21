'use client';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Modal, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';

import Button from '../Button';
import style from './Modals.module.scss';

const cx = classNames.bind(style);

function Modals({
    show,
    onHide,
    onSubmit,
    ...props
}: {
    show: boolean;
    onHide: () => void;
    onSubmit: (e: any) => void;
}) {
    const handleSignUp = () => {
        console.log('sign up');
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            className={cx('wrapper')}
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            animation={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className={cx('title')} id="contained-modal-title-vcenter">
                    Đăng nhập
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={cx('modal-body')}>
                <Form.Group className={cx('btn-group')} controlId="formHorizontalAPI">
                    <Button primary leftIcon={<FontAwesomeIcon icon={faGoogle} />} className={cx('gg-btn')}>
                        Google
                    </Button>

                    <Button primary leftIcon={<FontAwesomeIcon icon={faFacebook} />} className={cx('fb-btn')}>
                        Facebook
                    </Button>

                    <Button primary leftIcon={<FontAwesomeIcon icon={faGithub} />} className={cx('git-btn')}>
                        Github
                    </Button>
                </Form.Group>

                <h3 className={cx('divider', 'line', 'one-line')}>Đăng nhập bằng tài khoản</h3>

                <Form className={cx('login-form')} onSubmit={(e) => onSubmit(e)}>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label column sm={2}>
                            Email
                        </Form.Label>
                        <Form.Control
                            className={cx('text-input')}
                            type="email"
                            name="lastName"
                            placeholder="Email"
                            aria-describedby="email-describe"
                            required
                            autoFocus
                        />
                        <Form.Text id="email-describe" hidden>
                            Your password must be 8-20 characters long
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label column sm={2}>
                            Password
                        </Form.Label>
                        <Form.Control
                            className={cx('text-input')}
                            type="password"
                            placeholder="Password"
                            aria-describedby="pass-describe"
                            required
                        />
                        <Form.Text id="pass-describe">Your password must be 8-20 characters long</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formRemember">
                        <Form.Check label="Ghi nhớ đăng nhập" />
                    </Form.Group>
                    <Form.Group className="mb-5">
                        <Form.Text id="passwordHelpBlock">
                            Bạn chưa có tài khoản?{' '}
                            <Link className={cx('switch-page')} href="/signup" onClick={handleSignUp}>
                                Đăng kí tài khoản.
                            </Link>
                        </Form.Text>
                    </Form.Group>

                    <Button primary className={cx('submit')} type="submit">
                        Đăng nhập
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default Modals;
