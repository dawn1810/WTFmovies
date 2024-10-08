'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useViewport } from '~/hooks';
import ImageCustom from '../ImageCustom';
import style from './FilmCarousel.module.scss';
import Captions from './Captions';
const cx = classNames.bind(style);

const items = [
    {
        imgSrc: '/jjk-wallpaper-3.jpg',
        filmTitle: 'Jujutsu Kaisen0',
        filmContent:
            "Jujutsu Kaisen is a Japanese manga series written and illustrated by Gege Akutami. It has been serialized in Shueisha's shōnen manga magazine Weekly Shōnen Jump since March 2018, with its chapters collected and published in 25 tankōbon volumes as of January 2024",
        infoList: [
            { title: 'Tác giả', info: ['Gege Akutami'], type: 'searchAble' },
            { title: 'Thể loại', info: ['Shonen manga', 'Dark fantasy'], type: 'searchAble' },
            { title: 'Số tập', info: '36/36' },
            { title: 'Lượt xem', info: '100M' },
            { title: 'Đánh giá', info: '4.9' },
        ],
    },
    {
        imgSrc: '/jjk-wallpaper-3.jpg',
        filmTitle: 'Jujutsu Kaisen1',
        filmContent:
            "Jujutsu Kaisen is a Japanese manga series written and illustrated by Gege Akutami. It has been serialized in Shueisha's shōnen manga magazine Weekly Shōnen Jump since March 2018, with its chapters collected and published in 25 tankōbon volumes as of January 2024",
        infoList: [
            { title: 'Tác giả', info: ['Gege Akutami'], type: 'searchAble' },
            { title: 'Thể loại', info: ['Shonen manga', 'Dark fantasy'], type: 'searchAble' },
            { title: 'Số tập', info: '36/36' },
            { title: 'Lượt xem', info: '100M' },
            { title: 'Đánh giá', info: '4.9' },
        ],
    },
    {
        imgSrc: '/jjk-wallpaper-3.jpg',
        filmTitle: 'Jujutsu Kaisen2',
        filmContent:
            "Jujutsu Kaisen is a Japanese manga series written and illustrated by Gege Akutami. It has been serialized in Shueisha's shōnen manga magazine Weekly Shōnen Jump since March 2018, with its chapters collected and published in 25 tankōbon volumes as of January 2024",
        infoList: [
            { title: 'Tác giả', info: ['Gege Akutami'], type: 'searchAble' },
            { title: 'Thể loại', info: ['Shonen manga', 'Dark fantasy'], type: 'searchAble' },
            { title: 'Số tập', info: '36/36' },
            { title: 'Lượt xem', info: '100M' },
            { title: 'Đánh giá', info: '4.9' },
        ],
    },
];

const NextButton = () => {
    return <button className={cx('slide-btn')}>
        <FontAwesomeIcon icon={faAngleRight} />
    </button>
}

const PrevButton = () => {
    return <button className={cx('slide-btn')}>
        <FontAwesomeIcon icon={faAngleLeft} />
    </button>
}


function FilmCarousel() {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    return (
        <div className={cx('home-slider')}>
            <Carousel touch indicators={!isMobile} nextIcon={<NextButton />} prevIcon={<PrevButton />}>
                {items.map((item, index) => (
                    <Carousel.Item key={index}>
                        <ImageCustom className="d-block w-100" src={item.imgSrc} alt={item.filmTitle} />
                        {isMobile ? (
                            <div className={cx('carousel-caption')}>
                                <Captions item={item} />
                            </div>
                        ) : (
                            <Carousel.Caption className={cx('carousel-caption')}>
                                <Captions item={item} />
                            </Carousel.Caption>
                        )}
                    </Carousel.Item>
                ))}
            </Carousel>
        </div >
    );
}

export default FilmCarousel;
