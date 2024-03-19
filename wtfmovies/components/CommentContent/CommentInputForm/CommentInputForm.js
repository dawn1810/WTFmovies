'use client';
import classNames from 'classnames/bind';

import { Form } from 'react-bootstrap';
import style from './CommentInputForm.module.scss';
import ImageCustom from '../../ImageCustom';
import Button from '../../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function CommentInputForm() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-info')}>
                <ImageCustom className={cx('avatar')} src="" alt="unknown" />
                <div className={cx('user-name')}>Người ẩn danh</div>
            </div>
            <Form className={cx('form')}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea" rows={5} placeholder="Viết bình luận của bạn" />
                </Form.Group>
                <Form.Group className={`mb-3 ${cx('form-bottom')}`} controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder="Nhập tên của bạn (bắt buộc)" />
                    <Button primary leftIcon={<FontAwesomeIcon icon={faPaperPlane} />}>
                        Gửi
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default CommentInputForm;
