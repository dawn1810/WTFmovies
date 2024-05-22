'use client';
import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarDays,
    faCat,
    faClapperboard,
    faClock,
    faCloudArrowUp,
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
import { FilmInfoInterface, FilmReviewInfoInterface } from '~/libs/interfaces';
import FilmButtonGroup from '../FilmButtonGroup/FilmButtonGroup';

const cx = classNames.bind(style);

const icons = [
    <FontAwesomeIcon icon={faClapperboard} />,
    <FontAwesomeIcon icon={faFeather} />,
    <FontAwesomeIcon icon={faCat} />,
    <FontAwesomeIcon icon={faPersonChalkboard} />,
    <FontAwesomeIcon icon={faClock} />,
    <FontAwesomeIcon icon={faCloudArrowUp} />,
    <FontAwesomeIcon icon={faLanguage} />,
    <FontAwesomeIcon icon={faUnlock} />,
    <FontAwesomeIcon icon={faCalendarDays} />,
    <FontAwesomeIcon icon={faEarthAsia} />,
    <FontAwesomeIcon icon={faPersonThroughWindow} />,
    <FontAwesomeIcon icon={faStar} />,
];

function FilmInfo({
    filmInfo,
    loveFilms,
    watch = false,
}: {
    filmInfo: FilmInfoInterface;
    loveFilms: string[];
    watch?: boolean;
}) {
    const releaseYear = filmInfo.releaseYear ? new Date(filmInfo.releaseYear) : null;
    const subsType = filmInfo.videoType.find((type) => type.title === 'Subs') as any;
    const totalEpisodes = subsType.episode[subsType.episode.length - 1];
    const lastThreeEpisodes = subsType.episode.slice(Math.max(subsType.episode.length - 3, 1));
    const infoList: FilmReviewInfoInterface = {
        searchName: filmInfo.searchName,
        image: filmInfo.img,
        title: filmInfo.name,
        rating: filmInfo.rating,
        episodes: totalEpisodes,
        describe: filmInfo.describe,
        info: [
            { title: 'Trạng thái', info: filmInfo.status, type: 'highLight' },
            { title: 'Tác giả', info: filmInfo.author, type: 'searchAble', category: 'author' },
            { title: 'Thể loại', info: filmInfo.genre, type: 'searchAble', category: 'genre' },
            {
                title: 'Đạo diễn',
                info: filmInfo.director,
                type: 'searchAble',
                category: 'director',
            },
            { title: 'Thời lượng', info: filmInfo.duration ? filmInfo.duration / 60 + ' phút' : 'Unknown' },
            { title: 'Số tập', info: `${lastThreeEpisodes[lastThreeEpisodes.length - 1]} / ${filmInfo.maxEp || '?'}` },

            { title: 'Nhãn', info: filmInfo.tag, type: 'highLight' },
            { title: 'Năm sản xuất', info: releaseYear?.getFullYear() },
            { title: 'Quốc gia sản xuất', info: filmInfo.country },
            {
                title: 'Diễn viên',
                info: filmInfo.actor,
                type: 'searchAble',
                category: 'actor',
            },

            {
                title: 'Tập mới cập nhật',
                info: lastThreeEpisodes,
                type: 'watchAble',
            },
        ],
    };
    const loveState = loveFilms.includes(filmInfo.searchName);

    const handleCopyTitle = () => {
        navigator.clipboard.writeText(infoList.title);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('image-box')}>
                <div className={cx('film-bg-image')} style={{ backgroundImage: `url("${infoList.image}")` }} />
                <ImageCustom className={cx('film-image')} src={infoList.image} alt={infoList.title} />
            </div>
            <div className={cx('film-left-container')}>
                <div className={cx('film-info')}>
                    <Tippy content="Copied" placement="top" arrow={false} trigger="click">
                        <h3 className={cx('film-title')} onClick={handleCopyTitle}>
                            {infoList.title}
                        </h3>
                    </Tippy>
                    <div className={cx('film-content')}>{infoList.describe}</div>
                    <div className={cx('rating')}>
                        <ImageCustom src={images.star} alt="rating" />
                        <span>{infoList.rating || 'NR'}</span>
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
                                <span className={cx('info-icon')}>{icons[index]}</span>
                                {info.type === 'searchAble' && typeof info.info === 'object' ? (
                                    <span className={cx('info-title')}>
                                        <span>{info.title}:</span>{' '}
                                        {info.info.slice(0, -1).map((infoitem, index) => (
                                            <Fragment key={index}>
                                                <Link
                                                    href={'/search?query=' + infoitem + '&type=' + info.category}
                                                    className={cx('search-able')}
                                                >
                                                    {infoitem + ','}
                                                </Link>{' '}
                                            </Fragment>
                                        ))}
                                        <Link
                                            key={index}
                                            href={'/search?query=' + info.info.slice(-1) + '&type=' + info.category}
                                            className={cx('search-able')}
                                        >
                                            {info.info.slice(-1)}
                                        </Link>
                                    </span>
                                ) : info.type === 'highLight' ? (
                                    <span className={cx('info-title')}>
                                        <span>{info.title}:</span> <span className={cx('high-light')}>{info.info}</span>
                                    </span>
                                ) : info.type === 'watchAble' && typeof info.info === 'object' ? (
                                    <span className={cx('info-title')}>
                                        <span>{info.title}:</span>
                                        {info.info.map((info, index) => (
                                            <Button
                                                key={index}
                                                primary
                                                to={`/watch/${infoList.searchName}/tap${info}`}
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
                    <FilmButtonGroup
                        dir={watch ? `/review/${filmInfo.searchName}` : `/watch/${filmInfo.searchName}/tap1`}
                        loveState={loveState}
                        searchName={filmInfo.searchName}
                    />
                </div>
            </div>
        </div>
    );
}

export default FilmInfo;
