'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Modal, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { validateEmail, validatePassword } from '~/libs/clientFunc';
import { changeEmailAlert, changePassAlert, changePassAlertContent } from '~/layouts/components/Header/headerSlice';
import { headerSelector } from '~/redux/selectors';
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
    onSubmit: (e: string, p: string, r: boolean) => void;
}) {
    const [passEye, setPassEye] = useState(false);
    // redux
    const state = useSelector(headerSelector);
    const dispatch = useDispatch();

    const handleSubmit = (event: any): void => {
        event.preventDefault();

        const form = event.target;
        const email = form.formEmail.value;
        const password = form.formPassword.value;
        const remember = form.formRemember.checked;

        if (!validateEmail(email)) {
            // email validate
            dispatch(changeEmailAlert(true));
        } else if (validatePassword(password) !== 0) {
            // password validate
            dispatch(changeEmailAlert(false));
            dispatch(changePassAlert(true));
            switch (validatePassword(password)) {
                case 1:
                    dispatch(changePassAlertContent('Mật khẩu phải dài hơn 8 kí tự!'));
                    break;
                case 2:
                    dispatch(changePassAlertContent('Mật khẩu phải nhỏ hơn 50 kí tự!'));
                    break;
                case 3:
                    dispatch(changePassAlertContent('Mật khẩu không hợp lệ!'));
                    break;
                case 4:
                    dispatch(
                        changePassAlertContent(
                            'Mật khẩu phải bao gồm kí tự đặc biệt, chữ cái in thường, in hoa và chữ số!',
                        ),
                    );
                    break;
                default:
                    break;
            }
        } else {
            dispatch(changePassAlert(false));
            onSubmit(email, password, remember);
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
                            Email không hợp lệ!
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className={`mb-3 ${cx('pass-form')}`} controlId="formPassword">
                        <Form.Label column sm={2}>
                            Mật khẩu
                        </Form.Label>
                        <Form.Control
                            className={cx('text-input')}
                            type="password"
                            placeholder="Mật khẩu"
                            aria-describedby="pass-describe"
                            required
                        />
                        <Form.Text id="pass-describe" className={cx('alert')} hidden={!state.passAlert}>
                            {state.passAlertContent}
                        </Form.Text>
                        <button className={cx('passEye')} onClick={handlePassEye} type="button">
                            {passEye ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
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
