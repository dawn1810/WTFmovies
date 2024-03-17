'use client'
import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarDays,
    faCat,
    faClapperboard,
    faClock,
    faEarthAsia,
    faFeather,
    faLanguage,
    faPersonChalkboard,
    faPersonThroughWindow,
    faPlay,
    faStar,
    faUnlock,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';

import ImageCustom from '../ImageCustom';
import style from './FilmInfo.module.scss';
import Button from '../Button';
import Link from 'next/link';
import images from '~/assets/image';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(style);

const icons = [
    <FontAwesomeIcon icon={faClapperboard} />,
    <FontAwesomeIcon icon={faFeather} />,
    <FontAwesomeIcon icon={faCat} />,
    <FontAwesomeIcon icon={faPersonChalkboard} />,
    <FontAwesomeIcon icon={faClock} />,
    <FontAwesomeIcon icon={faLanguage} />,
    <FontAwesomeIcon icon={faUnlock} />,
    <FontAwesomeIcon icon={faCalendarDays} />,
    <FontAwesomeIcon icon={faEarthAsia} />,
    <FontAwesomeIcon icon={faPersonThroughWindow} />,
    <FontAwesomeIcon icon={faStar} />,
];

const infoList = {
    image: 'https://www.enwallpaper.com/wp-content/uploads/2023/11/jjk-wallpaper-3.jpg',
    title: 'Jujutsu Kaisen',
    rating: '4.9',
    episodes: '100M',
    decript:
        "Jujutsu Kaisen is a Japanese manga series written and illustrated by Gege Akutami. It has been serialized in Shueisha's shōnen manga magazine Weekly Shōnen Jump since March 2018, with its chapters collected and published in 25 tankōbon volumes as of January 2024Jujutsu Kaisen is a Japanese manga series written and illustrated by Gege Akutami. It has been serialized in Shueisha's shōnen manga magazine Weekly Shōnen Jump since March 2018, with its chapters collected and published in 25 tankōbon volumes as of January 2024",
    info: [
        { title: 'Trạng thái', info: 'Hoàn thành', type: 'highLight' },
        { title: 'Tác giả', info: ['Gege Akutami'], type: 'searchAble' },
        { title: 'Thể loại', info: ['Shonen manga', 'Dark fantasy'], type: 'searchAble' },
        {
            title: 'Đạo diễn',
            info: ['Sunghoo Park (S1)', 'Shōta Goshozono (S2)'],
            type: 'searchAble',
        },
        { title: 'Thời lượng', info: '24 phút/tập' },
        { title: 'Ngôn ngữ', info: ['Nhật Bản', 'Anh'], type: 'searchAble' },
        { title: 'Nhãn', info: 'R-16 (Restricted-16)', type: 'highLight' },
        { title: 'Năm sản xuất', info: '2021' },
        { title: 'Quốc gia sản xuất', info: 'Nhật Bản' },
        {
            title: 'Diển viên nổi bật',
            info: ['Kenjiro Tsuda', 'Yuichi Nakamura', 'Junya Enoki'],
            type: 'searchAble',
        },

        {
            title: 'Tập mới cập nhật',
            info: [29, 28, 27],
            type: 'watchAble',
        },
    ],
};

function FilmInfo() {
    const handleCopyTitle = () => {
        navigator.clipboard.writeText(infoList.title);
    };

    return (
        <div className={cx('wrapper')}>
            <ImageCustom className={cx('film-image')} src={infoList.image} alt={infoList.title} />
            <div className={cx('film-left-container')}>
                <div className={cx('film-info')}>
                    <Tippy content="Copied" placement="top" arrow={false} trigger="click">
                        <h3 className={cx('film-title')} onClick={handleCopyTitle}>
                            {infoList.title}
                        </h3>
                    </Tippy>
                    <div className={cx('film-content')}>{infoList.decript}</div>
                    <div className={cx('rating')}>
                        <ImageCustom src={images.star} alt="rating" />
                        <span>{infoList.rating}</span>
                    </div>
                    <div className={cx('episodes')}>
                        <ImageCustom src={images.episodes} alt="episodes" />
                        <span>{infoList.episodes}</span>
                    </div>
                </div>
                <div className={cx('film-detail')}>
                    <ul className={cx('info-list')}>
                        {infoList.info.map((info, index) => (
                            <li key={index}>
                                <span>{icons[index]}</span>
                                {info.type === 'searchAble' ? (
                                    <span className={cx('info-title')}>
                                        <span>{info.title}:</span>{' '}
                                        {info.info.slice(0, -1).map((info, index) => (
                                            <Fragment key={index}>
                                                <Link href={'/result?search_query=' + info} className={cx('search-able')}>
                                                    {info + ','}
                                                </Link>{' '}
                                            </Fragment>
                                        ))}
                                        <Link
                                            key={index}
                                            href={'/result?search_query=' + info.info.slice(-1)}
                                            className={cx('search-able')}
                                        >
                                            {info.info.slice(-1)}
                                        </Link>
                                    </span>
                                ) : info.type === 'highLight' ? (
                                    <span className={cx('info-title')}>
                                        <span>{info.title}:</span> <span className={cx('high-light')}>{info.info}</span>
                                    </span>
                                ) : info.type === 'watchAble' ? (
                                    <span className={cx('info-title')}>
                                        <span>{info.title}:</span>
                                        {info.info.map((info, index) => (
                                            <Button
                                                key={index}
                                                primary
                                                to={`/watch?film=${infoList.title}&eps=${info}`}
                                                className={cx('episodes-btn')}
                                            >
                                                {info}
                                            </Button>
                                        ))}
                                    </span>
                                ) : (
                                    <span className={cx('info-title')}>
                                        <span>{info.title}:</span> {info.info}
                                    </span>
                                )}
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
            </div>
        </div>
    );
}

export default FilmInfo;
