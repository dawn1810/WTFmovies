'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import FilmCard from '~/components/FilmCard';
import Button from '~/components/Button';
import style from './SideBox.module.scss';
import { useState } from 'react';
import { useViewport } from '~/hooks';
import Title from '../Title';

const cx = classNames.bind(style);

// const firstOne = {
//     imgSrc: '/jjk_shibuya_incident_arc_1693914044447_1693914064181.webp',
//     filmName: 'asdfasd',
//     views: '1.000.000',
//     rating: '4.8',
//     episodes: '10199',
// };

const films = [
    {
        imgSrc: '/jjk_shibuya_incident_arc_1693914044447_1693914064181.webp',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
];

function SideBox({ to, title, icon }) {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    const [filmHide, setFilmHide] = useState(true);

    const handleMoreFilmClick = () => {
        setFilmHide((prev) => !prev);
    };

    return (
        <div className={cx('wrapper')}>
            <Title title={title} icon={icon} />
            <div className={cx('side-films')}>
                <div className={cx('side-films-top')}>
                    <FilmCard
                        large
                        imgSrc={films[0].imgSrc}
                        filmName={films[0].filmName}
                        views={films[0].views}
                        rating={films[0].rating}
                        episodes={films[0].episodes}
                    />
                </div>
                {films
                    .slice(1)
                    .map((film, index) =>
                        index < 2 ? (
                            <FilmCard
                                key={index}
                                noOverlay
                                imgSrc={film.imgSrc}
                                filmName={film.filmName}
                                views={film.views}
                                rating={film.rating}
                                episodes={film.episodes}
                                className={cx('show-films')}
                            />
                        ) : (
                            <FilmCard
                                key={index}
                                noOverlay
                                imgSrc={film.imgSrc}
                                filmName={film.filmName}
                                views={film.views}
                                rating={film.rating}
                                episodes={film.episodes}
                                className={cx('show-films', { 'hidden-films': filmHide })}
                            />
                        ),
                    )}
            </div>
            {isMobile && (
                <Button
                    primary
                    rightIcon={<FontAwesomeIcon icon={filmHide ? faAngleDown : faAngleUp} />}
                    className={cx('more-btn')}
                    onClick={handleMoreFilmClick}
                >
                    {filmHide ? 'Xem thêm' : 'Ẩn bớt'}
                </Button>
            )}
        </div>
    );
}

SideBox.propTypes = {
    to: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
};

export default SideBox;
