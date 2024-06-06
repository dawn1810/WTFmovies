'use client';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import classNames from 'classnames/bind';

import FilmCard from '~/components/FilmCard';
import Button from '~/components/Button';
import style from './TabGridContent.module.scss';
import { useViewport } from '~/hooks';
import { FilmInfoInterface } from '~/libs/interfaces';
import { mapFilms } from '~/libs/clientFunc';

const cx = classNames.bind(style);

function TabGridContent({ films }: { films: FilmInfoInterface[] }) {
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
                    <div>Không có phim cho tabs này</div>
                )}
            </div>
            <Button to="/search" primary rightIcon={<ExpandMoreIcon />} className={cx('more-btn')}>
                Xem thêm
            </Button>
        </div>
    );
}

export default TabGridContent;
