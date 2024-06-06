'use client';
import { useRouter } from 'next/navigation';
import { getSession, signIn } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Link from 'next/link';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import { Modal, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { ExtendedUser } from '~/libs/interfaces';
import { changeModalShow } from '~/layouts/components/Header/headerSlice';
import Button from '../Button';
import style from './Modals.module.scss';
import { LoadingButton } from '@mui/lab';
import { Login } from '@mui/icons-material';
import { TextField } from '@mui/material';
import OtpForm from '../OtpForm';

const cx = classNames.bind(style);

function Modals({ show, onHide, ...props }: { show: boolean; onHide: () => void }) {
    const router = useRouter();

    const [pending, setPending] = useState(false);
    const [passEye, setPassEye] = useState(false);
    const [info, setInfo] = useState({ email: '', password: '', remember: false });
    const [alert, setAlert] = useState(false);

    // redux
    const dispatch = useDispatch();

    const clearAllAlert = () => {
        setAlert(false);
    };

    const handleSignInGoogle = async () => {
        await signIn('google');
    };

    const handleSignInGithub = async () => {
        await signIn('github');
    };

    const handleSubmit = async (event: any): Promise<void> => {
        event.preventDefault();
        clearAllAlert();
        setPending(true);

        const { email, password, remember } = info;

        try {
            const res = await signIn('credentials', {
                email: email,
                password: password,
                remember: remember,
                redirect: false,
            });

            if (res?.error) setAlert(true);
            else {
                const session = await getSession();
                if ((session?.user as ExtendedUser)?.first) {
                    router.push('/survey');
                    sessionStorage.setItem('prev', window.location.href);
                }
                dispatch(changeModalShow(false));
            }
            setPending(false);
        } catch (err) {
            console.log('Something went wrong!: ', err);
        }
    };

    const handleHide = () => {
        setAlert(false);
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
                    <Button primary leftIcon={<GoogleIcon />} className={cx('gg-btn')} onClick={handleSignInGoogle}>
                        Google
                    </Button>

                    <Button primary leftIcon={<FacebookIcon />} className={cx('fb-btn')}>
                        Facebook
                    </Button>

                    <Button primary leftIcon={<GitHubIcon />} className={cx('git-btn')} onClick={handleSignInGithub}>
                        Github
                    </Button>
                </Form.Group>

                <h3 className={cx('divider', 'line', 'one-line')}>Đăng nhập bằng tài khoản</h3>

                <Form noValidate className={cx('login-form')} onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="mb-3">
                        <Form.Text className={cx('alert')} hidden={!alert}>
                            Thông tin đăng nhập không hợp lệ!
                        </Form.Text>
                    </Form.Group>
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
                        <button className={cx('passEye')} onClick={handlePassEye} type="button">
                            {passEye ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                        </button>
                    </Form.Group>

                    <Form.Group className={`mb-3, ${cx('forget-pass')}`} controlId="formRemember">
                        <Link href="/forgetpass" onClick={handleSignUp}>
                            Quên mật khẩu ?
                        </Link>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Text id="passwordHelpBlock" className={cx('switch-page')}>
                            Bạn chưa có tài khoản?{' '}
                            <Link href="/register" onClick={handleSignUp}>
                                Đăng kí tài khoản.
                            </Link>
                        </Form.Text>
                    </Form.Group>

                    <Button disabled={pending} type="submit" className={cx('submit')}>
                        {pending ? 'Đăng nhập...' : 'Đăng nhập'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default Modals;
