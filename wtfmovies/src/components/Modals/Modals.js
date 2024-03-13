import { useDispatch, useSelector } from 'react-redux';
import { modalFaceSelector } from '~/redux/selectors';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Modal, Form, Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';

import Button from '../Button';
import style from './Modals.module.scss';
import { changeModalFace } from '~/layouts/components/Header/headerSlice';

const cx = classNames.bind(style);

const gerneOption = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

function Modals({ ...props }) {
    const modalFace = useSelector(modalFaceSelector);

    const dispatch = useDispatch();

    const handleSignUp = () => {
        dispatch(changeModalFace(false));
    };

    const handleSignIn = () => {
        dispatch(changeModalFace(true));
    };

    const handleShow = () => {
        dispatch(changeModalFace(true));
    };

    return (
        <Modal
            size={!modalFace ? 'xl' : ''}
            className={cx('wrapper')}
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            onShow={handleShow}
            centered
        >
            {modalFace ? (
                <>
                    <Modal.Header closeButton>
                        <Modal.Title className={cx('title')} id="contained-modal-title-vcenter">
                            Đăng nhập
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={cx('modal-body')}>
                        <Form.Group className={cx('btn-group')} controlId="formHorizontalCheck">
                            <Button primary leftIcon={<FontAwesomeIcon icon={faGoogle} />}>
                                Google
                            </Button>

                            <Button primary leftIcon={<FontAwesomeIcon icon={faFacebook} />}>
                                Facebook
                            </Button>

                            <Button primary leftIcon={<FontAwesomeIcon icon={faTwitter} />}>
                                Twitter
                            </Button>
                        </Form.Group>

                        <h3 className={cx('divider', 'line', 'one-line')}>Đăng nhập bằng tài khoản</h3>

                        <Form className={cx('login-form')}>
                            <Form.Group className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label column sm={2}>
                                    Email
                                </Form.Label>
                                <Form.Control
                                    className={cx('text-input')}
                                    type="email"
                                    placeholder="Email"
                                    required
                                    autoFocus
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formHorizontalPassword">
                                <Form.Label column sm={2}>
                                    Password
                                </Form.Label>
                                <Form.Control
                                    className={cx('text-input')}
                                    type="password"
                                    placeholder="Password"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formHorizontalCheck">
                                <Form.Check label="Ghi nhớ đăng nhập" />
                            </Form.Group>
                            <Form.Group className="mb-5" controlId="formHorizontalCheck">
                                <Form.Text id="passwordHelpBlock">
                                    Bạn chưa có tài khoản?{' '}
                                    <Link className={cx('switch-page')} to="" onClick={handleSignUp}>
                                        Đăng kí tài khoản.
                                    </Link>
                                </Form.Text>
                            </Form.Group>

                            <Button primary className={cx('submit')} type="submit">
                                Đăng nhập
                            </Button>
                        </Form>
                    </Modal.Body>
                </>
            ) : (
                <>
                    <Modal.Header closeButton>
                        <Modal.Title className={cx('title')} id="contained-modal-title-vcenter">
                            Đăng ký
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={cx('modal-body')}>
                        <Form className={cx('login-form')}>
                            <Row className="mb-3">
                                <Form.Group as={Col} className="mb-3" controlId="formHorizontalName">
                                    <Form.Label column>Họ và tên</Form.Label>
                                    <Form.Control
                                        className={cx('text-input')}
                                        type="text"
                                        placeholder="Họ và tên"
                                        required
                                        autoFocus
                                    />
                                </Form.Group>

                                <Form.Group as={Col} className="mb-3" controlId="formHorizontalBỉrthDate">
                                    <Form.Label column>Ngày sinh</Form.Label>
                                    <Form.Control
                                        className={cx('text-input')}
                                        type="date"
                                        placeholder="dd/mm/yyyy"
                                        required
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formHorizontalEmail">
                                    <Form.Label column>Email</Form.Label>
                                    <Form.Control
                                        className={cx('text-input')}
                                        type="email"
                                        placeholder="Email"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formHorizontalPassword">
                                    <Form.Label column>Mật khẩu</Form.Label>
                                    <Form.Control
                                        className={cx('text-input')}
                                        type="password"
                                        placeholder="Mật khẩu"
                                        required
                                    />
                                </Form.Group>
                            </Row>

                            <h3 className={cx('divider', 'line', 'one-line')}>Sở thích xem phim của bạn</h3>

                            <Form.Group className="mb-3" controlId="formHorizontalCheck">
                                <Form.Text id="passwordHelpBlock">
                                    *Những thông tin phía dưới đây nhằm đưa ra những gợi ý phù hợp đem lại trải nghiệm
                                    xem phim tốt nhất cho bạn nhưng không bắt buộc bỏ qua nếu bạn không muốn chia sẽ.
                                </Form.Text>
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formHorizontalLoveGerne">
                                    <Form.Label column>Thể loại bạn yêu thích</Form.Label>
                                    <Select
                                        isMulti
                                        defaultValue={[gerneOption[2], gerneOption[3]]}
                                        name="colors"
                                        options={gerneOption}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formHorizontalLanguege">
                                    <Form.Label column>Ngôn ngữ phim bạn yêu thích</Form.Label>
                                    <Select
                                        isMulti
                                        defaultValue={[gerneOption[2], gerneOption[3]]}
                                        name="colors"
                                        options={gerneOption}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formHorizontalActor">
                                    <Form.Label column>Diễn viên và Đạo diễn bạn yêu thích</Form.Label>
                                    <Form.Control
                                        className={cx('text-input')}
                                        type="text"
                                        placeholder="Tên diễn viên, đạo diễn"
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formHorizontalTime">
                                    <Form.Label column>Thời lượng phim phù hợp</Form.Label>
                                    <Form.Control
                                        className={cx('text-input')}
                                        type="number"
                                        placeholder="Tên diễn viên, đạo diễn"
                                    />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formHorizontalCheck">
                                <Form.Check label="Ghi nhớ tài khoản" />
                            </Form.Group>

                            <Form.Group className="mb-5" controlId="formHorizontalCheck">
                                <Form.Text id="passwordHelpBlock">
                                    Bạn đã có tài khoản?{' '}
                                    <Link to="" className={cx('switch-page')} onClick={handleSignIn}>
                                        Đăng nhập.
                                    </Link>
                                </Form.Text>
                            </Form.Group>

                            <Button primary className={cx('submit')} type="submit">
                                Đăng ký
                            </Button>
                        </Form>
                    </Modal.Body>
                </>
            )}
        </Modal>
    );
}

export default Modals;
