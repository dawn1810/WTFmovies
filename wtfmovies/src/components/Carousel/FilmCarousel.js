import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp91, faCat, faFeather, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { Carousel } from 'react-bootstrap';
import classNames from 'classnames/bind';

import Button from '../Button';
import Image from '../Image';
import style from './FilmCarousel.module.scss';
const cx = classNames.bind(style);

const items = [
    {
        imgSrc: 'https://www.enwallpaper.com/wp-content/uploads/2023/11/jjk-wallpaper-3.jpg',
        filmTitle: 'Jujutsu Kaisen',
        filmContent:
            "Jujutsu Kaisen is a Japanese manga series written and illustrated by Gege Akutami. It has been serialized in Shueisha's shōnen manga magazine Weekly Shōnen Jump since March 2018, with its chapters collected and published in 25 tankōbon volumes as of January 2024",
        infoList: [
            { icon: <FontAwesomeIcon icon={faFeather} />, title: 'Tác giả', info: 'Gege Akutami' },
            { icon: <FontAwesomeIcon icon={faCat} />, title: 'Thể loại', info: 'Shonen manga, Dark fantasy' },
            { icon: <FontAwesomeIcon icon={faArrowUp91} />, title: 'Số tập', info: '36/36' },
        ],
    },
    {
        imgSrc: 'https://www.enwallpaper.com/wp-content/uploads/2023/11/jjk-wallpaper-3.jpg',
        filmTitle: 'Jujutsu Kaisen',
        filmContent:
            "Jujutsu Kaisen is a Japanese manga series written and illustrated by Gege Akutami. It has been serialized in Shueisha's shōnen manga magazine Weekly Shōnen Jump since March 2018, with its chapters collected and published in 25 tankōbon volumes as of January 2024",
        infoList: [
            { icon: <FontAwesomeIcon icon={faFeather} />, title: 'Tác giả', info: 'Gege Akutami' },
            { icon: <FontAwesomeIcon icon={faCat} />, title: 'Thể loại', info: 'Shonen manga, Dark fantasy' },
            { icon: <FontAwesomeIcon icon={faArrowUp91} />, title: 'Số tập', info: '36/36' },
        ],
    },
    {
        imgSrc: 'https://www.enwallpaper.com/wp-content/uploads/2023/11/jjk-wallpaper-3.jpg',
        filmTitle: 'Jujutsu Kaisen',
        filmContent:
            "Jujutsu Kaisen is a Japanese manga series written and illustrated by Gege Akutami. It has been serialized in Shueisha's shōnen manga magazine Weekly Shōnen Jump since March 2018, with its chapters collected and published in 25 tankōbon volumes as of January 2024",
        infoList: [
            { icon: <FontAwesomeIcon icon={faFeather} />, title: 'Tác giả', info: 'Gege Akutami' },
            { icon: <FontAwesomeIcon icon={faCat} />, title: 'Thể loại', info: 'Shonen manga, Dark fantasy' },
            { icon: <FontAwesomeIcon icon={faArrowUp91} />, title: 'Số tập', info: '36/36' },
        ],
    },
];

function FilmCarousel() {
    return (
        <div className={cx('home-slider')}>
            <Carousel>
                {items.map((item, index) => (
                    <Carousel.Item key={index}>
                        <Image className="d-block w-100" src={item.imgSrc} alt={item.filmTitle} />
                        <Carousel.Caption className={cx('carousel-caption')}>
                            <div className={cx('film-info')}>
                                <h3 className={cx('film-title')}>{item.filmTitle}</h3>
                                <div className={cx('film-content')}>{item.filmContent}</div>
                            </div>
                            <div className={cx('film-detail')}>
                                <ul className={cx('info-list')}>
                                    {item.infoList.map((info, index) => (
                                        <li key={index}>
                                            <span>{info.icon}</span>
                                            <span className={cx('info-title')}>
                                                <span>{info.title}:</span> {info.info}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <div className={cx('btn-group')}>
                                    <Button primary leftIcon={<FontAwesomeIcon icon={faPlay} />}>
                                        Xem phim
                                    </Button>
                                    <button className={cx('action-btn')}>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </button>
                                    <button className={cx('action-btn')}>
                                        <FontAwesomeIcon icon={faShareFromSquare} />
                                    </button>
                                </div>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default FilmCarousel;
