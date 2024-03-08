import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlay } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import images from '~/assets/image';
import Image from '../Image';
import style from './FilmCard.module.scss';

const cx = classNames.bind(style);

function FilmCard({ large = false, noOverlay = false, imgSrc, filmName, views, rating, episodes, className }) {
    return (
        <div className={cx('wrapper', className, { 'nooverlay-wrapper': noOverlay, 'large-wrapper': large })}>
            <div className={cx('image-box')}>
                <Image className={cx('film-img', { 'nooverlay-img': noOverlay })} src={imgSrc} alt={filmName} />
            </div>
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
                <button className={cx('hover-btn', 'watch-btn')}>
                    <FontAwesomeIcon icon={faPlay} />
                </button>
                <button className={cx('hover-btn', 'review-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
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
    className: PropTypes.string,
};

export default FilmCard;
