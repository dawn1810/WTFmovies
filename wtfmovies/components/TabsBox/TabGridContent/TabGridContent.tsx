'use client';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import classNames from 'classnames/bind';

import FilmCard from '~/components/FilmCard';
import Button from '~/components/Button';
import style from './TabGridContent.module.scss';
import { useViewport } from '~/hooks';
import { FilmInfoInterface } from '~/libs/interfaces';
import { mapFilms } from '~/libs/clientFunc';
import { useState } from 'react';

const cx = classNames.bind(style);

function TabGridContent({ films, to, currTab = '' }: { films: FilmInfoInterface[], to?: string, currTab?: string }) {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;
    const mappedFilms = mapFilms(films);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-info')}>
                {mappedFilms.length > 0 ? (
                    mappedFilms.map((film, index) => (
                        <FilmCard
                            key={index}
                            large={isMobile}
                            imgSrc={film.img}
                            filmName={film.name}
                            searchName={film.searchName}
                            views={film.views}
                            rating={film.rating}
                            episodes={film.episodes}
                        />
                    ))
                ) : (
                    <div className={cx('noFilm')}>Không có phim cho tab này</div>
                )}
            </div>
            <Button to={`/search?query=${to}&tab=${currTab}&type=rcm`} primary rightIcon={<ExpandMoreIcon />} className={cx('more-btn')}>
                Xem thêm
            </Button>
        </div>
    );
}

export default TabGridContent;
