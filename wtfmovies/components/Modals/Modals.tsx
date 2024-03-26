'use client';
import { useCookies } from 'next-client-cookies';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Modal, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { encryptData, fetchPublicKey } from '~/libs/clientFunc';
import {
    changeCurrentUser,
    changeEmailAlert,
    changePassAlert,
    changePassAlertContent,
} from '~/layouts/components/Header/headerSlice';
import { headerSelector } from '~/redux/selectors';
import Button from '../Button';
import style from './Modals.module.scss';

const cx = classNames.bind(style);

function Modals({
    show,
    onHide,
    setModalShow,
    ...props
}: {
    show: boolean;
    onHide: () => void;
    setModalShow: (s: boolean) => void;
}) {
    const cookies = useCookies();

    const [passEye, setPassEye] = useState(false);
    // redux
    const state = useSelector(headerSelector);
    const dispatch = useDispatch();

    const clearAllAlert = () => {
        dispatch(changeEmailAlert(false));
        dispatch(changePassAlert(false));
    };

    const handleSubmit = async (event: any): Promise<void> => {
        event.preventDefault();
        clearAllAlert();

        const form = event.target;
        const email = form.formEmail.value;
        const password = form.formPassword.value;
        const remember = form.formRemember.checked;

        // const PUBLIC_KEY = String(sessionStorage.getItem('publicKey'));
        !!cookies.get('haha') && (await fetchPublicKey());
        const PUBLIC_KEY = String(cookies.get('haha'));
        const newPassword = await encryptData(PUBLIC_KEY, password);

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: newPassword, remember }),
        });

        if (response.ok) {
            setModalShow(false);
            sessionStorage.setItem('account', email);
            dispatch(changeCurrentUser(true));
        } else if (response.status === 404) {
            dispatch(changePassAlert(true));
            dispatch(changePassAlertContent('Mật khẩu không đúng!'));
        } else if (response.status === 500) {
            dispatch(changeEmailAlert(true));
        }
    };

    const handleHide = () => {
        dispatch(changeEmailAlert(false));
        dispatch(changePassAlert(false));
        onHide();
    };

    const handleSignUp = () => {
        console.log('sign up');
    };

    const handlePassEye = () => {
        setPassEye((prev) => !prev);
    };

    return (
        <Modal
            show={show}
            onHide={handleHide}
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

                <Form noValidate className={cx('login-form')} onSubmit={(e) => handleSubmit(e)}>
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
                        <Form.Text id="email-describe" className={cx('alert')} hidden={!state.emailAlert}>
                            Email không tồn tại!
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className={`mb-3 ${cx('pass-form')}`} controlId="formPassword">
                        <Form.Label column sm={2}>
                            Mật khẩu
                        </Form.Label>
                        <Form.Control
                            className={cx('text-input')}
                            type={passEye ? 'text' : 'password'}
                            placeholder="Mật khẩu"
                            aria-describedby="pass-describe"
                            required
                        />
                        <Form.Text id="pass-describe" className={cx('alert')} hidden={!state.passAlert}>
                            {state.passAlertContent}
                        </Form.Text>
                        <button className={cx('passEye')} onClick={handlePassEye} type="button">
                            {passEye ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                        </button>
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
