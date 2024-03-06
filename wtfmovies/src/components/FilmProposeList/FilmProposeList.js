import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import { Carousel } from '@trendyol-js/react-carousel';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

// import { useViewport } from '~/hooks';
import { useViewport } from '~/hooks';
import FilmCard from '../FilmCard';
import style from './FilmProposeList.module.scss';

const cx = classNames.bind(style);

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button className={cx('right-btn')} onClick={onClick}>
            <FontAwesomeIcon icon={faChevronRight} />
        </button>
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button className={cx('left-btn')} onClick={onClick}>
            <FontAwesomeIcon icon={faChevronLeft} />
        </button>
    );
}

function FilmProposeList({ films, className }) {
    const viewPort = useViewport();
    // const isMobile = viewPort.width;
    console.log((viewPort.width - 20) / 180 - 0.1);

    const settings = {
        className: cx('carousel'),
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        swipeToSlide: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: (viewPort.width - 20) / 180 - 0.1,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
        ],
    };

    return (
        <div className={cx('wrapper', className)}>
            <Slider {...settings}>
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
            </Slider>
            {/* <Carousel
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
            > */}
            {/* </Carousel> */}
        </div>
    );
}

FilmProposeList.propTypes = {
    films: PropTypes.array.isRequired,
    classNames: PropTypes.string,
};

export default FilmProposeList;
