'use client';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Slider from 'react-slick';
import classNames from 'classnames/bind';

import { useViewport } from '~/hooks';
import FilmCard from '../FilmCard';
import style from './FilmProposeList.module.scss';
import { FilmProposeListInterface, FilmsInterFace } from '~/libs/interfaces';

const cx = classNames.bind(style);

function NextArrow(props: { onClick?: any }) {
    const { onClick } = props;
    return (
        <button className={cx('right-btn')} onClick={onClick}>
            <ArrowForwardIosIcon />
        </button>
    );
}

function PrevArrow(props: { onClick?: any }) {
    const { onClick } = props;
    return (
        <button className={cx('left-btn')} onClick={onClick}>
            <ArrowBackIosNewIcon />
        </button>
    );
}

function FilmProposeList({ films, className }: FilmProposeListInterface) {
    const viewPort = useViewport();
    // const isMobile = viewPort.width;

    const mappedFilms: FilmsInterFace[] = films.map(
        ({ img, name, searchName, videoType, views, rating }): FilmsInterFace => {
            const subsType = videoType.find((type) => type.title === 'Subs') as any;
            if (!subsType || !subsType.episode) return { img, name, searchName, views, rating, episodes: 0 };
            const totalEpisodes = subsType?.episode[subsType.episode.length - 1];

            return {
                img,
                name,
                searchName,
                views,
                rating,
                episodes: totalEpisodes,
            };
        },
    );

    const settings = {
        className: cx('carousel'),
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        swipeToSlide: true,
        pauseOnHover: true,

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
            {mappedFilms.length > 0 ?
                <Slider {...settings}>
                    {mappedFilms.map((film, index) => (
                        <FilmCard
                            key={index}
                            imgSrc={film.img}
                            filmName={film.name}
                            searchName={film.searchName}
                            views={film.views}
                            rating={film.rating}
                            episodes={film.episodes}
                        />
                    ))}
                </Slider> :
                (<div className={cx('noFilm')}>Không có phim cho tab này</div>)}
        </div>
    );
}

export default FilmProposeList;
