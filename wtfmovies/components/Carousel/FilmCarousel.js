"use client"
import { Carousel } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useViewport } from '~/hooks';
import Image from '../Image';
import style from './FilmCarousel.module.scss';
import Captions from './Captions';
const cx = classNames.bind(style);

const items = [
    {
        imgSrc: 'https://www.enwallpaper.com/wp-content/uploads/2023/11/jjk-wallpaper-3.jpg',
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
        imgSrc: 'https://www.enwallpaper.com/wp-content/uploads/2023/11/jjk-wallpaper-3.jpg',
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
        imgSrc: 'https://www.enwallpaper.com/wp-content/uploads/2023/11/jjk-wallpaper-3.jpg',
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

function FilmCarousel() {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    return (
        <div className={cx('home-slider')}>
            <Carousel touch indicators={!isMobile}>
                {items.map((item, index) => (
                    <Carousel.Item key={index}>
                        <Image className="d-block w-100" src={item.imgSrc} alt={item.filmTitle} />
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
        </div>
    );
}

export default FilmCarousel;
