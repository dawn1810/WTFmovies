'use client';
import classNames from 'classnames/bind';

import style from './Rating.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function Rating() {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Đánh giá:</span>
            <span className={cx('star-rating')}>
                <label htmlFor="rate-1" style={{ '--i': 1 }}>
                    <FontAwesomeIcon icon={faStar} />
                </label>
                <input type="radio" name="rating" id="rate-1" value="1" />
                <label htmlFor="rate-2" style={{ '--i': 2 }}>
                    <FontAwesomeIcon icon={faStar} />
                </label>
                <input type="radio" name="rating" id="rate-2" value="2" defaultChecked />
                <label htmlFor="rate-3" style={{ '--i': 3 }}>
                    <FontAwesomeIcon icon={faStar} />
                </label>
                <input type="radio" name="rating" id="rate-3" value="3" />
                <label htmlFor="rate-4" style={{ '--i': 4 }}>
                    <FontAwesomeIcon icon={faStar} />
                </label>
                <input type="radio" name="rating" id="rate-4" value="4" />
                <label htmlFor="rate-5" style={{ '--i': 5 }}>
                    <FontAwesomeIcon icon={faStar} />
                </label>
                <input type="radio" name="rating" id="rate-5" value="5" />
            </span>
        </div>
    );
}

export default Rating;
