'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import { Carousel } from '@trendyol-js/react-carousel';
import Slider from 'react-slick';
import classNames from 'classnames/bind';

import { useViewport } from '~/hooks';
import FilmCard from '../FilmCard';
import style from './FilmProposeList.module.scss';
import { FilmProposeListInterface } from '~/libs/interfaces';

const cx = classNames.bind(style);

function NextArrow(props: { onClick?: any }) {
    const { onClick } = props;
    return (
        <button className={cx('right-btn')} onClick={onClick}>
            <FontAwesomeIcon icon={faChevronRight} />
        </button>
    );
}

function PrevArrow(props: { onClick?: any }) {
    const { onClick } = props;
    return (
        <button className={cx('left-btn')} onClick={onClick}>
            <FontAwesomeIcon icon={faChevronLeft} />
        </button>
    );
}

function FilmProposeList({ films, className }: FilmProposeListInterface) {
    const viewPort = useViewport();
    // const isMobile = viewPort.width;
    // console.log((viewPort.width - 20) / 180 - 0.1);

    const settings = {
        className: cx('carousel'),
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        swipeToSlide: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: (viewPort.width - 20) / 160 - 0.1,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
        ],
    };

    return (
        <div className={cx('wrapper', className)}>
            <Slider {...settings}>
                {films.map((film, index) =>
                (
                    <FilmCard
                        key={index}
                        imgSrc={film.img}
                        filmName={film.name}
                        views={film.views}
                        rating={film.rating}
                        episodes={film.episodes}
                    />
                )
                )}
            </Slider>
        </div>
    );
}

export default FilmProposeList;
