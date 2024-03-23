'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import { DefaultLayout } from '~/layouts';
import classNames from 'classnames/bind';

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
    return (
        <DefaultLayout>
            <div className={cx('wrapper')}>
                <Form className={cx('login-form')}>
                    <h1 className={cx('title')}>Đăng ký tài khoản</h1>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label column>Email</Form.Label>
                        <Form.Control
                            className={cx('text-input')}
                            type="email"
                            placeholder="Email"
                            required
                            autoFocus
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label column>Mật khẩu</Form.Label>
                        <Form.Control className={cx('text-input')} type="password" placeholder="Mật khẩu" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label column>Họ và tên</Form.Label>
                        <Form.Control className={cx('text-input')} type="text" placeholder="Họ và tên" required />
                    </Form.Group>

                    <Form.Group className="mb-5" controlId="formBỉrthDate">
                        <Form.Label column>Ngày sinh</Form.Label>
                        <Form.Control className={cx('text-input')} type="date" placeholder="dd/mm/yyyy" required />
                    </Form.Group>

                    <Button primary className={cx('submit')} type="submit">
                        Đăng ký
                    </Button>
                </Form>

                {/* <Form className={cx('login-form')}>
                    <h1 className={cx('title')}>
                        Đăng ký thành công{' '}
                        <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'var(--green-highlight-color)' }} />
                    </h1>
                    <Form.Group className="mb-5">
                        <Form.Text>
                            Chúc mừng bạn đã đăng kí tài khoản thành công!
                            <br />
                            Phần sau đây là những khảo sát sở thích xem phim của bạn, để đưa ra gợi ý và trải nghiệm phù
                            hợp nhất dành cho bạn.
                            <br />
                            Tham gia khảo sát cùng chúng tôi?
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className={cx('btn-group')}>
                        <Button primary className={cx('skip')} type="button">
                            Bỏ qua
                        </Button>
                        <Button primary className={cx('submit')} type="button">
                            Tiếp tục
                        </Button>
                    </Form.Group>
                </Form> */}

                {/* <Form className={cx('login-form')}>
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
                        <Button primary className={cx('skip')} type="button">
                            Bỏ qua
                        </Button>
                        <Button primary className={cx('submit')} type="button">
                            Tiếp tục
                        </Button>
                    </Form.Group>
                </Form> */}

                {/* <Form className={cx('login-form')}>
                    <h1 className={cx('title')}>Ngôn ngữ phim bạn yêu thích?</h1>
                    <Image className={cx('quest-image')} width={500} height={252} src={images.language} alt="gerne" />
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
                        <Button primary className={cx('skip')} type="button">
                            Bỏ qua
                        </Button>
                        <Button primary className={cx('submit')} type="button">
                            Tiếp tục
                        </Button>
                    </Form.Group>
                </Form> */}

                {/* <Form className={cx('login-form')}>
                    <h1 className={cx('title')}>Đạo diễn bạn yêu thích?</h1>
                    <Image className={cx('quest-image')} width={320} height={252} src={images.director} alt="gerne" />
                    <Form.Group className="mb-5" controlId="formHorizontalActor">
                        <Form.Control className={cx('text-input')} type="text" placeholder="Tên đạo diễn" />
                    </Form.Group>
                    <Form.Group className={cx('btn-group')}>
                        <Button primary className={cx('skip')} type="button">
                            Bỏ qua
                        </Button>
                        <Button primary className={cx('submit')} type="button">
                            Tiếp tục
                        </Button>
                    </Form.Group>
                </Form> */}

                {/* <Form className={cx('login-form')}>
                    <h1 className={cx('title')}>Diễn viên bạn yêu thích?</h1>
                    <Image className={cx('quest-image')} width={300} height={252} src={images.actor} alt="gerne" />
                    <Form.Group className="mb-5" controlId="formHorizontalActor">
                        <Form.Control className={cx('text-input')} type="text" placeholder="Tên diễn viên" />
                    </Form.Group>
                    <Form.Group className={cx('btn-group')}>
                        <Button primary className={cx('skip')} type="button">
                            Bỏ qua
                        </Button>
                        <Button primary className={cx('submit')} type="button">
                            Tiếp tục
                        </Button>
                    </Form.Group>
                </Form> */}

                {/* <Form className={cx('login-form')}>
                    <h1 className={cx('title')}>
                        Hoàn thành khảo sát{' '}
                        <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'var(--green-highlight-color)' }} />
                    </h1>
                    <Form.Group className="mb-5">
                        <Form.Text>
                            Cảm ơn bạn đã tham gia khảo sát!
                            <br />
                            Phần khảo sát đã giúp chúng tôi rất nhiều để mang đến cho người xem những trải nghiệm tốt
                            nhất
                            <br />
                            Chúc các bạn xem phim vui vẻ!
                        </Form.Text>
                    </Form.Group>
                    <Button primary className={cx('submit')} type="button">
                        Quay lại xem phim
                    </Button>
                </Form> */}
            </div>
        </DefaultLayout>
    );
}

export default SignUp;
