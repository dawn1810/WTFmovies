'use client';
import { Form } from 'react-bootstrap';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import Rating from '~/components/Rating';
import style from './FilmInteract.module.scss';

const cx = classNames.bind(style);

function FilmInteract() {
    return (
        <div className={cx('wrapper')}>
            <Rating />
            <Form.Select aria-label="Default select example" className={cx('server-list')}>
                <option value="1">#Máy chủ miền Tây</option>
            </Form.Select>
            <Button primary className={cx('report-btn')}>
                #Méc bọ
            </Button>
        </div>
    );
}

export default FilmInteract;
