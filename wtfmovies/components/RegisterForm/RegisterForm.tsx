'use client';
import { encryptData } from '~/libs/clientFunc';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Form } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { validateBirthDate, validateEmail, validatePassword } from '~/libs/clientFunc';
import {
    changeSignUpEmailAlert,
    changeSignupEmailAlertContent,
    changeSignUpBirthDateAlert,
    changeSignupAgainPassAlert,
    changeSignUpNameAlert,
    changeSignUpPassAlert,
    changeSignUpPassAlertContent,
} from './registerSlice';
import { signupSelector } from '~/redux/selectors';
import Button from '~/components/Button';
import style from './RegisterForm.module.scss';
import { changeModalShow } from '~/layouts/components/Header/headerSlice';
import { changeNotifyContent, changeNotifyOpen, changeNotifyType } from '~/redux/actions';
// import { cookies } from 'next/headers';

const cx = classNames.bind(style);

function RegisterForm() {
    const [passEye, setPassEye] = useState(false);
    const [pending, setPending] = useState(false);
    const [info, setInfo] = useState({ email: '', password: '', againPass: '', name: '', birthDate: '' });

    // redux
    const state = useSelector(signupSelector);
    const dispatch = useDispatch();

    const showAlert = (content: string, type: any) => {
        dispatch(changeNotifyContent(content));
        dispatch(changeNotifyType(type));
        dispatch(changeNotifyOpen(true));
    };

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
        setPending(true);

        const { email, password, againPass, name, birthDate } = info;

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
        } else if (!validateBirthDate(birthDate)) {
            dispatch(changeSignUpBirthDateAlert(true));
        } else {
            // const cookieStore = cookies();
            // const key = String(cookieStore.get('PUBLISH_KEY'));
            // console.log(key);
            // const encriptPass: string = await encryptData(key, password);

            const keyRes = await fetch('/api/v1/getPublishKey', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (keyRes.ok) {
                const key: string = await keyRes.json();
                const encriptPass: string = await encryptData(key, password);

                const response = await fetch('/api/v1/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password: encriptPass, name, birthDate }),
                });

                if (response.ok) {
                    dispatch(changeModalShow(true));
                    setInfo({ email: '', password: '', againPass: '', name: '', birthDate: '' });
                    showAlert('Đăng ký thành công', 'success');
                } else if (response.status === 400) {
                    dispatch(changeSignUpPassAlert(true));
                    dispatch(changeSignUpPassAlertContent('Mật khẩu không hợp lệ'));
                } else if (response.status === 403) {
                    dispatch(changeSignUpEmailAlert(true));
                    dispatch(changeSignupEmailAlertContent('Email đã tồn tại!'));
                } else if (response.status === 422) {
                    showAlert('Thông tin đăng ký không hợp lệ', 'error');
                } else if (response.status === 500) {
                    showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
                }
            }
        }
        setPending(false);
    };

    return (
        <div className={cx('wrapper')}>
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
                        {passEye ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
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
                    <Form.Text id="again-pass-describe" className={cx('alert')} hidden={!state.signupAgainPassAlert}>
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
                    <Form.Text id="birthdate-describe" className={cx('alert')} hidden={!state.signupBirthDateAlert}>
                        Ngày sinh không hợp lệ!
                    </Form.Text>
                </Form.Group>

                <Button disabled={pending} primary className={cx('submit')} type="submit">
                    {pending ? 'Đăng ký...' : 'Đăng ký'}
                </Button>
            </Form>
        </div>
    );
}

export default RegisterForm;
