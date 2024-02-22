import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from '@trendyol-js/react-carousel';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import FilmCard from '../FilmCard';
import style from './FilmProposeList.module.scss';

const cx = classNames.bind(style);

function FilmProposeList({ films, className }) {
    return (
        <div className={cx('wrapper', className)}>
            <Carousel
                show={6.5}
                slide={3}
                leftArrow={
                    <button className={cx('left-btn')}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                }
                rightArrow={
                    <button className={cx('right-btn')}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                }
                className={cx('carousel')}
                swiping
            >
                {films.map((film, index) => (
                    <FilmCard
                        key={index}
                        imgSrc={film.imgSrc}
                        filmName={film.filmName}
                        views={film.views}
                        rating={film.rating}
                        episodes={film.episodes}
                    />
                ))}
            </Carousel>
        </div>
    );
}

FilmProposeList.propTypes = {
    films: PropTypes.array.isRequired,
    classNames: PropTypes.string,
};

export default FilmProposeList;
