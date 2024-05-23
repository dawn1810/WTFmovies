'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useViewport } from '~/hooks';
import ImageCustom from '../ImageCustom';
import style from './FilmCarousel.module.scss';
import Captions from './Captions';
import { CaptionsItemInterface, FilmInfoInterface } from '~/libs/interfaces';
import { formatNumber } from '~/libs/clientFunc';
const cx = classNames.bind(style);

const NextButton = () => {
    return (
        <button className={cx('slide-btn')}>
            <FontAwesomeIcon icon={faAngleRight} />
        </button>
    );
};

const PrevButton = () => {
    return (
        <button className={cx('slide-btn')}>
            <FontAwesomeIcon icon={faAngleLeft} />
        </button>
    );
};

function FilmCarousel({ items }: { items: { films: FilmInfoInterface[]; loveFilms: string[] } }) {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    const mappedItems: CaptionsItemInterface[] = items.films.map((item): CaptionsItemInterface => {
        const subsType = item.videoType.find((type) => type.title === 'Subs') as any;
        const totalEpisodes = subsType.episode[subsType.episode.length - 1];
        const love = items.loveFilms.includes(item.searchName);

        return {
            img: item.poster,
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
                        {isMobile ? (
                            <div className={cx('carousel-caption')}>
                                <Captions item={item} loveState={item.love} />
                            </div>
                        ) : (
                            <Carousel.Caption className={cx('carousel-caption')}>
                                <Captions item={item} loveState={item.love} />
                            </Carousel.Caption>
                        )}
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default FilmCarousel;
