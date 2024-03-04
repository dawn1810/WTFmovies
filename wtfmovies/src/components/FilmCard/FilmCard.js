import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlay } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Button from '../Button';
import images from '~/assets/image';
import Image from '../Image';
import style from './FilmCard.module.scss';

const cx = classNames.bind(style);

function FilmCard({ large = false, noOverlay = false, imgSrc, filmName, views, rating, episodes }) {
    return (
        <div className={cx('wrapper', { 'nooverlay-wrapper': noOverlay, 'large-wrapper': large })}>
            <Image className={cx({ 'nooverlay-img': noOverlay })} src={imgSrc} alt={filmName} />
            <div className={cx('info', { 'nooverlay-info': noOverlay, 'large-info': large })}>
                <h4>{filmName}</h4>
                <h5>Lượt xem: {views}</h5>
            </div>
            <div className={cx('rating', { 'large-rating': large })}>
                <Image src={images.star} alt="rating" />
                <span>{rating}</span>
            </div>
            <div className={cx('episodes', { 'nooverlay-episodes': noOverlay, 'large-episodes': large })}>
                <Image src={images.episodes} alt="episodes" />
                <span>{episodes}</span>
            </div>
            <div className={cx('hover-btn-list')}>
                <Button primary leftIcon={<FontAwesomeIcon icon={faPlay} />} className={cx('hover-btn', 'watch-btn')}>
                    Xem phim
                </Button>
                <Button
                    primary
                    leftIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                    className={cx('hover-btn', 'info-btn')}
                >
                    Thông tin
                </Button>
            </div>
        </div>
    );
}

FilmCard.propTypes = {
    large: PropTypes.bool,
    noOverlay: PropTypes.bool,
    imgSrc: PropTypes.string.isRequired,
    filmName: PropTypes.string.isRequired,
    views: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    episodes: PropTypes.string.isRequired,
};

export default FilmCard;
