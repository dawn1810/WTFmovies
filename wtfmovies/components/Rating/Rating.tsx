'use client';
import classNames from 'classnames/bind';

import style from './Rating.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function Rating({ rating }: { rating?: number }) {
    if (rating)
        return (
            <div className={cx('wrapper')}>
                <span className={cx('title')}>Đánh giá:</span>
                <span className={cx('star-rating')}>
                    <label htmlFor="rate-1" style={{ '--i': 1 } as React.CSSProperties}>
                        <FontAwesomeIcon icon={faStar} />
                    </label>
                    <input type="radio" name="rating" id="rate-1" value="1" defaultChecked={Math.ceil(rating) === 1} />
                    <label htmlFor="rate-1" style={{ '--i': 2 } as React.CSSProperties}>
                        <FontAwesomeIcon icon={faStar} />
                    </label>
                    <input type="radio" name="rating" id="rate-2" value="2" defaultChecked={Math.ceil(rating) === 2} />
                    <label htmlFor="rate-1" style={{ '--i': 3 } as React.CSSProperties}>
                        <FontAwesomeIcon icon={faStar} />
                    </label>
                    <input type="radio" name="rating" id="rate-3" value="3" defaultChecked={Math.ceil(rating) === 3} />
                    <label htmlFor="rate-1" style={{ '--i': 4 } as React.CSSProperties}>
                        <FontAwesomeIcon icon={faStar} />
                    </label>
                    <input type="radio" name="rating" id="rate-4" value="4" defaultChecked={Math.ceil(rating) === 4} />
                    <label htmlFor="rate-1" style={{ '--i': 5 } as React.CSSProperties}>
                        <FontAwesomeIcon icon={faStar} />
                    </label>
                    <input type="radio" name="rating" id="rate-5" value="5" defaultChecked={Math.ceil(rating) === 5} />
                </span>
            </div>
        );
}

export default Rating;
