import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from '@trendyol-js/react-carousel';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { useViewport } from '~/hooks';
import FilmCard from '../FilmCard';
import style from './FilmProposeList.module.scss';

const cx = classNames.bind(style);

function FilmProposeList({ films, className }) {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    return (
        <div className={cx('wrapper', className)}>
            <Carousel
                show={isMobile ? 2.3 : 6.1}
                slide={isMobile ? 2 : 6}
                swiping
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
