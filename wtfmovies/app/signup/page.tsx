'use client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import { DefaultLayout } from '~/layouts';
import classNames from 'classnames/bind';

import { encryptData } from '~/libs/clientFunc';
import { validateEmail, validatePassword } from '~/libs/clientFunc';
import {
    changeSignUpEmailAlert,
    changeCurrentForm,
    changeSignUpBirthDateAlert,
    changeSignupAgainPassAlert,
    changeSignUpNameAlert,
    changeSignUpPassAlert,
    changeSignUpPassAlertContent,
} from './signupSlice';
import { signupSelector } from '~/redux/selectors';
import images from '~/assets/image';
import Button from '~/components/Button';
import style from './signup.module.scss';
import Image from 'next/image';

const cx = classNames.bind(style);

const gerneOption = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

function SignUp() {
    const [passEye, setPassEye] = useState(false);

    // redux
    const state = useSelector(signupSelector);
    const dispatch = useDispatch();

    const nextPage = () => dispatch(changeCurrentForm(state.currentForm + 1));
    const prevPage = () => dispatch(changeCurrentForm(state.currentForm - 1));

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

    const handleSubmit = async (event: any): Promise<void> => {
        event.preventDefault();
        clearAllAlert();

        const form = event.target;
        const email = form.formEmail.value;
        const password = form.formPassword.value;
        const againPassword = form.formAgainPassword.value;
        const formName = form.formName.value;
        const birthDate = form.formBỉrthDate.value;

        const today = new Date();
        const bd = new Date(birthDate);

        if (!validateEmail(email)) {
            // email validate
            dispatch(changeSignUpEmailAlert(true));
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
                    break;
            }
        } else if (againPassword !== password) {
            dispatch(changeSignupAgainPassAlert(true));
        } else if (formName.trim().length === 0) {
            dispatch(changeSignUpNameAlert(true));
        } else if (bd.getTime() > today.getTime()) {
            dispatch(changeSignUpBirthDateAlert(true));
        } else {
            const PUBLIC_KEY = String(sessionStorage.getItem('publicKey'));
            const newPassword = await encryptData(PUBLIC_KEY, password);

            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password: newPassword, formName, birthDate }),
            });

            if (response.ok) {
                nextPage();
            }
            if (response.status === 500) {
                dispatch(changeSignUpEmailAlert(true));
            }
        }
    };

    const renderForm = (form: number): React.ReactNode => {
        switch (form) {
            case 0:
                return (
                    <Form noValidate className={cx('login-form')} onSubmit={(e) => handleSubmit(e)}>
                        <h1 className={cx('title')}>Đăng ký tài khoản</h1>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label column>Email</Form.Label>
                            <Form.Control className={cx('text-input')} type="email" placeholder="Email" autoFocus />
                            <Form.Text id="email-describe" className={cx('alert')} hidden={!state.signupEmailAlert}>
                                Email không hợp lệ!
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className={`mb-3 ${cx('pass-form')}`} controlId="formPassword">
                            <Form.Label column>Mật khẩu</Form.Label>
                            <Form.Control
                                className={cx('text-input')}
                                type={passEye ? 'text' : 'password'}
                                placeholder="Mật khẩu"
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
                            <Form.Control className={cx('text-input')} type="text" placeholder="Tên hiễn thị" />
                            <Form.Text id="name-describe" className={cx('alert')} hidden={!state.signupNameAlert}>
                                Tên hiễn thị không hợp lệ!
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-5" controlId="formBỉrthDate">
                            <Form.Label column>Ngày sinh</Form.Label>
                            <Form.Control className={cx('text-input')} type="date" placeholder="dd/mm/yyyy" />
                            <Form.Text
                                id="birthdate-describe"
                                className={cx('alert')}
                                hidden={!state.signupBirthDateAlert}
                            >
                                Ngày sinh không hợp lệ!
                            </Form.Text>
                        </Form.Group>

                        <Button primary className={cx('submit')} type="submit">
                            Đăng ký
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
                            <Form.Text>
                                Chúc mừng bạn đã đăng kí tài khoản thành công!
                                <br />
                                Phần sau đây là những khảo sát sở thích xem phim của bạn, để đưa ra gợi ý và trải nghiệm
                                phù hợp nhất dành cho bạn.
                                <br />
                                Tham gia khảo sát cùng chúng tôi?
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className={cx('btn-group')}>
                            <Button primary className={cx('skip')} type="button">
                                Bỏ qua
                            </Button>
                            <Button primary className={cx('submit')} type="button" onClick={nextPage}>
                                Tiếp tục
                            </Button>
                        </Form.Group>
                    </Form>
                );
            case 2:
                return (
                    <Form className={cx('login-form')}>
                        <h1 className={cx('title')}>Thể loại phim bạn yêu thích?</h1>
                        <Image className={cx('quest-image')} width={300} height={252} src={images.gerne} alt="gerne" />
                        <Form.Group className="mb-5" controlId="formHorizontalLoveGerne">
                            <Select
                                isMulti
                                defaultValue={[gerneOption[2], gerneOption[3]]}
                                name="colors"
                                options={gerneOption}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        </Form.Group>
                        <Form.Group className={cx('btn-group')}>
                            <Button primary className={cx('submit')} type="button" onClick={prevPage}>
                                Trở lại
                            </Button>
                            <Button primary className={cx('submit')} type="button" onClick={nextPage}>
                                Tiếp tục
                            </Button>
                        </Form.Group>
                    </Form>
                );
            case 3:
                return (
                    <Form className={cx('login-form')}>
                        <h1 className={cx('title')}>Đạo diễn bạn yêu thích?</h1>
                        <Image
                            className={cx('quest-image')}
                            width={320}
                            height={252}
                            src={images.director}
                            alt="gerne"
                        />
                        <Form.Group className="mb-5" controlId="formHorizontalActor">
                            <Form.Control className={cx('text-input')} type="text" placeholder="Tên đạo diễn" />
                        </Form.Group>
                        <Form.Group className={cx('btn-group')}>
                            <Button primary className={cx('submit')} type="button" onClick={prevPage}>
                                Trở lại
                            </Button>
                            <Button primary className={cx('submit')} type="button" onClick={nextPage}>
                                Tiếp tục
                            </Button>
                        </Form.Group>
                    </Form>
                );
            case 4:
                return (
                    <Form className={cx('login-form')}>
                        <h1 className={cx('title')}>Diễn viên bạn yêu thích?</h1>
                        <Image className={cx('quest-image')} width={300} height={252} src={images.actor} alt="gerne" />
                        <Form.Group className="mb-5" controlId="formHorizontalActor">
                            <Form.Control className={cx('text-input')} type="text" placeholder="Tên diễn viên" />
                        </Form.Group>
                        <Form.Group className={cx('btn-group')}>
                            <Button primary className={cx('submit')} type="button" onClick={prevPage}>
                                Trở lại
                            </Button>
                            <Button primary className={cx('submit')} type="button" onClick={nextPage}>
                                Tiếp tục
                            </Button>
                        </Form.Group>
                    </Form>
                );
            case 5:
                return (
                    <Form className={cx('login-form')}>
                        <h1 className={cx('title')}>Ngôn ngữ phim bạn yêu thích?</h1>
                        <Image
                            className={cx('quest-image')}
                            width={500}
                            height={252}
                            src={images.language}
                            alt="gerne"
                        />
                        <Form.Group className="mb-5">
                            <Select
                                isMulti
                                defaultValue={[gerneOption[2], gerneOption[3]]}
                                name="colors"
                                options={gerneOption}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        </Form.Group>
                        <Form.Group className={cx('btn-group')}>
                            <Button primary className={cx('submit')} type="button" onClick={prevPage}>
                                Trở lại
                            </Button>
                            <Button primary className={cx('submit')} type="button" onClick={nextPage}>
                                Tiếp tục
                            </Button>
                        </Form.Group>
                    </Form>
                );
            case 6:
                return (
                    <Form className={cx('login-form')}>
                        <h1 className={cx('title')}>
                            Hoàn thành khảo sát{' '}
                            <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'var(--green-highlight-color)' }} />
                        </h1>
                        <Form.Group className="mb-5">
                            <Form.Text>
                                Cảm ơn bạn đã tham gia khảo sát!
                                <br />
                                Phần khảo sát đã giúp chúng tôi rất nhiều để mang đến cho người xem những trải nghiệm
                                tốt nhất
                                <br />
                                Chúc các bạn xem phim vui vẻ!
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className={cx('btn-group')}>
                            <Button primary className={cx('submit')} type="button" onClick={prevPage}>
                                Trở lại
                            </Button>
                            <Button primary className={cx('submit')} type="button">
                                Quay lại xem phim
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
            <div className={cx('wrapper')}>{renderForm(state.currentForm)}</div>
        </DefaultLayout>
    );
}

export default SignUp;
