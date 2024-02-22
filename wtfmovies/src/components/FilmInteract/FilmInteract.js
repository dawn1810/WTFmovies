import classNames from 'classnames/bind';

import Button from '~/components/Button';
import Rating from '~/components/Rating';
import style from './FilmInteract.module.scss';

const cx = classNames.bind(style);

function FilmInteract() {
    return (
        <div className={cx('wrapper')}>
            <Rating />
            <div className={cx('server-list')}>
                <Button primary>#Máy chủ miền Tây</Button>
                <Button primary>#Máy chủ miền Đất Hứa</Button>
                <Button primary>#Máy chủ miền Đất Trống</Button>
            </div>
            <Button primary>#Méc bọ</Button>
        </div>
    );
}

export default FilmInteract;
