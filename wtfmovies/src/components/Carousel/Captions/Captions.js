import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import style from './Captions.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(style);

function Captions({ item }) {
    return (
        <>
            <div className={cx('film-info')}>
                <h3 className={cx('film-title')}>{item.filmTitle}</h3>
                <div className={cx('film-content')}>{item.filmContent}</div>
            </div>
            <div className={cx('film-detail')}>
                <ul className={cx('info-list')}>
                    {item.infoList.map((info, index) => (
                        <li key={index}>
                            <span>{info.icon}</span>
                            <span className={cx('info-title')}>
                                <span>{info.title}:</span> {info.info}
                            </span>
                        </li>
                    ))}
                </ul>
                <div className={cx('btn-group')}>
                    <Button primary leftIcon={<FontAwesomeIcon icon={faPlay} />}>
                        Xem phim
                    </Button>
                    <button className={cx('action-btn')}>
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <button className={cx('action-btn')}>
                        <FontAwesomeIcon icon={faShareFromSquare} />
                    </button>
                </div>
            </div>
        </>
    );
}

Captions.propTypes = {
    item: PropTypes.object.isRequired,
};

export default Captions;
