'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import FilmCard from '~/components/FilmCard';
import Button from '~/components/Button';
import style from './TabGridContent.module.scss';
import { useViewport } from '~/hooks';
import { FilmsInterFace } from '~/libs/interfaces';

const cx = classNames.bind(style);

function TabGridContent({ films }: { films: FilmsInterFace[] }) {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-info')}>
                {films.length > 0 ? (
                    films.map((film, index) => (
                        <FilmCard
                            key={index}
                            large={isMobile}
                            imgSrc={film.img}
                            filmName={film.name}
                            views={film.views}
                            rating={film.rating}
                            episodes={film.episodes}
                        />
                    ))
                ) : (
                    <div>Không có phim cho tabs này</div>
                )}
            </div>
            <Button to="/search" primary rightIcon={<FontAwesomeIcon icon={faAngleRight} />} className={cx('more-btn')}>
                Xem thêm
            </Button>
        </div>
    );
}

export default TabGridContent;
