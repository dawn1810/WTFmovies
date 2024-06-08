'use client';
import classNames from 'classnames/bind';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Carousel } from 'react-bootstrap';
import { useViewport } from '~/hooks';

import style from './FilmCarousel.module.scss';
import ImageCustom from '../ImageCustom';
import Captions from './Captions';
import { CaptionsItemInterface, FilmInfoInterface } from '~/libs/interfaces';
import { formatNumber } from '~/libs/clientFunc';

const cx = classNames.bind(style);

const NextButton = () => {
    return (
        <button className={cx('slide-btn')}>
            <ArrowForwardIosIcon />
        </button>
    );
};

const PrevButton = () => {
    return (
        <button className={cx('slide-btn')}>
            <ArrowBackIosNewIcon />
        </button>
    );
};

function FilmCarousel({ items }: { items: { films: FilmInfoInterface[]; loveFilms: string[] } }) {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    const mappedItems: CaptionsItemInterface[] = items.films.map((item): CaptionsItemInterface => {
        const subsType = item.videoType.find((type) => type.title === 'Subs') as any;
        const totalEpisodes = subsType?.episode?.[subsType.episode.length - 1];
        const love = items.loveFilms.includes(item.film_id);

        return {
            img: item.poster,
            film_id: item.film_id,
            name: item.name,
            searchName: item.searchName,
            describe: item.describe,
            infoList: [
                { title: 'Tác giả', info: item.author, type: 'searchAble' },
                { title: 'Thể loại', info: item.genre, type: 'searchAble' },
                { title: 'Số tập', info: totalEpisodes },
                { title: 'Lượt xem', info: formatNumber(item.views) },
                { title: 'Đánh giá', info: item.rating },
            ],
            love: !!love,
        };
    });

    return (
        <div className={cx('home-slider')}>
            <Carousel touch indicators={!isMobile} nextIcon={<NextButton />} prevIcon={<PrevButton />}>
                {mappedItems.map((item, index) => (
                    <Carousel.Item key={index}>
                        <ImageCustom className={`d-block w-100 ${cx('bg-img')}`} src={item.img} alt={item.name} />
                        {!isMobile ? (
                            <Carousel.Caption className={cx('carousel-caption')}>
                                <Captions item={item} loveState={item.love} />
                            </Carousel.Caption>
                        ) : (
                            <div className={cx('carousel-caption')}>
                                <Captions item={item} loveState={item.love} />
                            </div>
                        )}
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default FilmCarousel;
