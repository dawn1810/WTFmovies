'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import { DefaultLayout } from '~/layouts';
import classNames from 'classnames/bind';

import { validateEmail, validatePassword } from '~/libs/clientFunc';
import {
    changeSignUpEmailAlert,
    changeSignupEmailAlertContent,
    changeSignUpBirthDateAlert,
    changeSignupAgainPassAlert,
    changeSignUpNameAlert,
    changeSignUpPassAlert,
    changeSignUpPassAlertContent,
} from './signupSlice';
import { signupSelector } from '~/redux/selectors';
import Button from '~/components/Button';
import style from './signup.module.scss';
import { changeModalShow } from '~/layouts/components/Header/headerSlice';

type OptionType = {
    label: string;
    value: string;
};

const cx = classNames.bind(style);

function SignUp() {
    const [currForm, setCurrForm] = useState(0);
    const [passEye, setPassEye] = useState(false);
    const [pending, setPending] = useState(false);
    const [info, setInfo] = useState({ email: '', password: '', againPass: '', name: '', birthDate: '' });

    // redux
    const state = useSelector(signupSelector);
    const dispatch = useDispatch();

    const nextPage = () => setCurrForm((prev) => prev + 1);

    const handlePassEye = () => {
        setPassEye((prev) => !prev);
    };

    const clearAllAlert = () => {
        dispatch(changeSignUpEmailAlert(false));
        dispatch(changeSignUpPassAlert(false));
        dispatch(changeSignupAgainPassAlert(false));
        dispatch(changeSignUpNameAlert(false));
        dispatch(changeSignUpBirthDateAlert(false));
    };

    const handleInput = (event: any) => {
        setInfo((prev: any) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event: any): Promise<void> => {
        event.preventDefault();
        clearAllAlert();

        const { email, password, againPass, name, birthDate } = info;

        const today = new Date();
        const bd = new Date(birthDate);

        if (!validateEmail(email)) {
            // email validate
            dispatch(changeSignUpEmailAlert(true));
            dispatch(changeSignupEmailAlertContent('Email không đúng định dạng!'));
        } else if (validatePassword(password) !== 0) {
            // password validate
            dispatch(changeSignUpPassAlert(true));
            switch (validatePassword(password)) {
                case 1:
                    dispatch(changeSignUpPassAlertContent('Mật khẩu phải dài hơn 8 kí tự!'));
                    break;
                case 2:
                    dispatch(changeSignUpPassAlertContent('Mật khẩu phải nhỏ hơn 50 kí tự!'));
                    break;
                case 3:
                    dispatch(changeSignUpPassAlertContent('Mật khẩu không hợp lệ!'));
                    break;
                case 4:
                    dispatch(
                        changeSignUpPassAlertContent(
                            'Mật khẩu phải bao gồm kí tự đặc biệt, chữ cái in thường, in hoa và chữ số!',
                        ),
                    );
                    break;
                default:
                    dispatch(changeSignUpPassAlertContent('Mật khẩu không hợp lệ'));
                    break;
            }
        } else if (againPass !== password) {
            dispatch(changeSignupAgainPassAlert(true));
        } else if (name.trim().length === 0) {
            dispatch(changeSignUpNameAlert(true));
        } else if (bd.getTime() > today.getTime()) {
            dispatch(changeSignUpBirthDateAlert(true));
        } else {
            setPending(true);
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name, birthDate }),
            });

            if (response.ok) {
                nextPage();
                setPending(false);
            }
            if (response.status === 500) {
                dispatch(changeSignUpEmailAlert(true));
                dispatch(changeSignupEmailAlertContent('Email đã tồn tại!'));
                setPending(false);
            }
        }
    };

    const handleToLogin = () => {
        dispatch(changeModalShow(true));
    };

    const renderForm = (form: number): React.ReactNode => {
        switch (form) {
            case 0:
                return (
                    <Form noValidate className={cx('login-form')} onSubmit={(e) => handleSubmit(e)}>
                        <h1 className={cx('title')}>Đăng ký tài khoản</h1>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label column>Email</Form.Label>
                            <Form.Control
                                className={cx('text-input')}
                                type="email"
                                placeholder="Email"
                                autoFocus
                                name="email"
                                onChange={(e) => handleInput(e)}
                            />
                            <Form.Text id="email-describe" className={cx('alert')} hidden={!state.signupEmailAlert}>
                                {state.signupEmailAlertContent}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className={`mb-3 ${cx('pass-form')}`} controlId="formPassword">
                            <Form.Label column>Mật khẩu</Form.Label>
                            <Form.Control
                                className={cx('text-input')}
                                type={passEye ? 'text' : 'password'}
                                placeholder="Mật khẩu"
                                name="password"
                                onChange={(e) => handleInput(e)}
                            />
                            <Form.Text id="pass-describe" className={cx('alert')} hidden={!state.signupPassAlert}>
                                {state.signupPassAlertContent}
                            </Form.Text>
                            <button className={cx('passEye')} onClick={handlePassEye} type="button">
                                {passEye ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                            </button>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formAgainPassword">
                            <Form.Label column>Nhập lại mật khẩu</Form.Label>
                            <Form.Control
                                className={cx('text-input')}
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                                name="againPass"
                                onChange={(e) => handleInput(e)}
                            />
                            <Form.Text
                                id="again-pass-describe"
                                className={cx('alert')}
                                hidden={!state.signupAgainPassAlert}
                            >
                                Mật khẩu không trùng khớp!
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label column>Tên hiễn thị</Form.Label>
                            <Form.Control
                                className={cx('text-input')}
                                type="text"
                                placeholder="Tên hiễn thị"
                                name="name"
                                onChange={(e) => handleInput(e)}
                            />
                            <Form.Text id="name-describe" className={cx('alert')} hidden={!state.signupNameAlert}>
                                Tên hiễn thị không hợp lệ!
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-5" controlId="formBỉrthDate">
                            <Form.Label column>Ngày sinh</Form.Label>
                            <Form.Control
                                className={cx('text-input')}
                                type="date"
                                placeholder="dd/mm/yyyy"
                                name="birthDate"
                                onChange={(e) => handleInput(e)}
                            />
                            <Form.Text
                                id="birthdate-describe"
                                className={cx('alert')}
                                hidden={!state.signupBirthDateAlert}
                            >
                                Ngày sinh không hợp lệ!
                            </Form.Text>
                        </Form.Group>

                        <Button primary className={cx('submit')} type="submit">
                            {pending ? 'Đang đăng ký' : 'Đăng ký'}
                        </Button>
                    </Form>
                );
            case 1:
                return (
                    <Form className={cx('login-form')}>
                        <h1 className={cx('title')}>
                            Đăng ký thành công{' '}
                            <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'var(--green-highlight-color)' }} />
                        </h1>
                        <Form.Group className="mb-5">
                            <Form.Text className={cx('notify-text')}>
                                Chúc mừng bạn đã đăng kí tài khoản thành công!
                                <br />
                                Phần sau đây là những khảo sát sở thích xem phim của bạn, để đưa ra gợi ý và trải nghiệm
                                phù hợp nhất dành cho bạn.
                                <br />
                                Tham gia khảo sát cùng chúng tôi?
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className={cx('btn-group')}>
                            <Button primary className={cx('skip')} type="button" onClick={handleToLogin}>
                                Bỏ qua
                            </Button>
                            <Button primary to="/survey" className={cx('submit')} type="button">
                                Tiếp tục
                            </Button>
                        </Form.Group>
                    </Form>
                );
            default:
                return <></>;
        }
    };

    return (
        <DefaultLayout>
            <div className={cx('wrapper')}>{renderForm(currForm)}</div>
        </DefaultLayout>
    );
}

export default SignUp;
