'use client';
import { Form } from 'react-bootstrap';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import Rating from '~/components/Rating';
import style from './FilmInteract.module.scss';

const cx = classNames.bind(style);

function FilmInteract({ rating }: { rating: number }) {
    return (
        <div className={cx('wrapper')}>
            <Rating rating={rating} />
            <Form.Select aria-label="Default select example" className={cx('server-list')}>
                <option value="1">#Máy chủ miền Tây</option>
                <option value="2">#Máy chủ miền Đất Hứa</option>
                <option value="3">#Máy chủ miền Đất Trống</option>
            </Form.Select>
            <Button primary className={cx('report-btn')}>
                #Méc bọ
            </Button>
        </div>
    );
}

export default FilmInteract;
