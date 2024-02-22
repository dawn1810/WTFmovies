import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Modal, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';

import Button from '../Button';
import style from './Modals.module.scss';

const cx = classNames.bind(style);

function Modals({ ...props }) {
    return (
        <Modal className={cx('wrapper')} {...props} aria-labelledby="contained-modal-title-vcenter" centered>
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
                        <Form.Control className={cx('text-input')} type="email" placeholder="Email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Password
                        </Form.Label>
                        <Form.Control className={cx('text-input')} type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formHorizontalCheck">
                        <Form.Check label="Ghi nhớ đăng nhập" />
                    </Form.Group>
                    <Form.Group className="mb-5" controlId="formHorizontalCheck">
                        <Form.Text id="passwordHelpBlock">
                            Bạn chưa có tài khoản? <Link to="/signup">Đăng kí tài khoản.</Link>
                        </Form.Text>
                    </Form.Group>

                    <Button primary className={`mb-5 ${cx('submit')}`} type="submit">
                        Đăng nhập
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default Modals;
