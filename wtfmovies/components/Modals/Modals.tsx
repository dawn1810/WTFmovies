'use client';
import { signIn } from 'next-auth/react';
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
    changeModalShow,
    changePassAlert,
} from '~/layouts/components/Header/headerSlice';
import { headerSelector } from '~/redux/selectors';
import Button from '../Button';
import style from './Modals.module.scss';

const cx = classNames.bind(style);

function Modals({ show, onHide, ...props }: { show: boolean; onHide: () => void }) {
    const cookies = useCookies();

    const [passEye, setPassEye] = useState(false);
    const [info, setInfo] = useState({ email: '', password: '', remember: false });

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

        const { email, password, remember } = info;

        try {
            const res = await signIn('credentials', {
                email: email,
                password: password,
                remember: remember,
                redirect: false,
            });

            if (res?.error) console.log('aaa');
            else console.log('bbb');
        } catch (err) {
            console.log('Shomething went wrong!: ', err);
        }

        // const response = await fetch('/api/auth/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email, password: newPassword, remember }),
        // });

        // if (response.ok) {
        //     dispatch(changeModalShow(false));
        //     sessionStorage.setItem('account', email);
        //     dispatch(changeCurrentUser(true));
        // } else if (response.status === 404) {
        //     dispatch(changePassAlert(true));
        // } else if (response.status === 500) {
        //     dispatch(changeEmailAlert(true));
        // }
    };

    const handleHide = () => {
        dispatch(changeEmailAlert(false));
        dispatch(changePassAlert(false));
        onHide();
    };

    const handleSignUp = () => {
        dispatch(changeModalShow(false));
    };

    const handlePassEye = () => {
        setPassEye((prev) => !prev);
    };

    const handleInput = (event: any) => {
        setInfo((prev: any) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleCheck = (event: any) => {
        setInfo((prev: any) => ({ ...prev, [event.target.name]: event.target.checked }));
    };

    return (
        <Modal
            show={show}
            centered
            animation={false}
            aria-labelledby="contained-modal-title-vcenter"
            className={cx('wrapper')}
            onHide={handleHide}
            {...props}
        >
            <Modal.Header closeButton closeVariant="white">
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
                            placeholder="Email"
                            aria-describedby="email-describe"
                            required
                            autoFocus
                            name="email"
                            onChange={(e) => handleInput(e)}
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
                            name="password"
                            onChange={(e) => handleInput(e)}
                        />
                        <Form.Text id="pass-describe" className={cx('alert')} hidden={!state.passAlert}>
                            Mật khẩu không đúng!
                        </Form.Text>
                        <button className={cx('passEye')} onClick={handlePassEye} type="button">
                            {passEye ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                        </button>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formRemember">
                        <Form.Check label="Ghi nhớ đăng nhập" name="remember" onChange={(e) => handleCheck(e)} />
                    </Form.Group>
                    <Form.Group className="mb-5">
                        <Form.Text id="passwordHelpBlock" className={cx('switch-page')}>
                            Bạn chưa có tài khoản?{' '}
                            <Link href="/register" onClick={handleSignUp}>
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
