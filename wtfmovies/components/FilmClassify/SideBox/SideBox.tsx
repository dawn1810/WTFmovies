'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import FilmCard from '~/components/FilmCard';
import Button from '~/components/Button';
import style from './SideBox.module.scss';
import React, { useState } from 'react';
import { useViewport } from '~/hooks';
import Title from '../Title';
import { FilmsInterFace } from '~/libs/interfaces';

const cx = classNames.bind(style);

function SideBox({ to, title, icon, films }: { to: string; title: string; icon: any; films: FilmsInterFace[] }) {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    const [filmHide, setFilmHide] = useState(true);

    const handleMoreFilmClick = () => {
        setFilmHide((prev) => !prev);
    };

    return (
        <div className={cx('wrapper')}>
            <Title title={title} icon={icon} className={cx('title')} />
            <div className={cx('side-films')}>
                <div className={cx('side-films-top')}>
                    <FilmCard
                        large
                        imgSrc={films[0].poster || films[0].img}
                        filmName={films[0].name}
                        searchName={films[0].searchName}
                        views={films[0].views}
                        rating={films[0].rating}
                        episodes={films[0].episodes}
                    />
                </div>
                {films
                    .slice(1)
                    .map((film, index) =>
                        index < 3 ? (
                            <FilmCard
                                key={index}
                                noOverlay
                                imgSrc={film.img}
                                filmName={film.name}
                                searchName={film.searchName}
                                views={film.views}
                                rating={film.rating}
                                episodes={film.episodes}
                                className={cx('show-films')}
                            />
                        ) : (
                            <FilmCard
                                key={index}
                                noOverlay
                                imgSrc={film.img}
                                filmName={film.name}
                                searchName={film.searchName}
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

export default SideBox;
