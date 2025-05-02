'use client';
import { Fragment } from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import CategoryIcon from '@mui/icons-material/Category';
import VideocamIcon from '@mui/icons-material/Videocam';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import Filter9PlusIcon from '@mui/icons-material/Filter9Plus';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import PublicIcon from '@mui/icons-material/Public';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined';
import classNames from 'classnames/bind';

import ImageCustom from '../ImageCustom';
import style from './FilmInfo.module.scss';
import Button from '../Button';
import Link from 'next/link';
import images from '~/assets/image';
import Tippy from '@tippyjs/react';
import { FilmInfoInterface, FilmReviewInfoInterface } from '~/libs/interfaces';
import FilmButtonGroup from '../FilmButtonGroup/FilmButtonGroup';
import { formatNumber } from '~/libs/clientFunc';

const cx = classNames.bind(style);

const icons = [
    <VisibilityOutlinedIcon />,
    <FavoriteBorderOutlinedIcon />,
    <PendingActionsIcon />,
    <HistoryEduIcon />,
    <CategoryIcon />,
    <VideocamIcon />,
    <HourglassEmptyIcon />,
    <Filter9PlusIcon />,
    <LocalOfferIcon />,
    <CalendarMonthIcon />,
    <FmdGoodOutlinedIcon />,
    <DirectionsRunIcon />,
    <LooksOneOutlinedIcon />,
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
    let totalEpisodes = '?';
    let lastThreeEpisodes = [];
    if (subsType && subsType?.episode?.length > 0) {
        totalEpisodes = subsType?.episode?.[subsType.episode.length - 1];
        lastThreeEpisodes = subsType?.episode?.slice(Math.max(subsType.episode.length - 3, 1));
    }
    const infoList: FilmReviewInfoInterface = {
        searchName: filmInfo.searchName,
        image: filmInfo.img,
        title: filmInfo.name,
        rating: filmInfo.rating,
        episodes: totalEpisodes,
        describe: filmInfo.describe,
        info: [
            { title: 'Lượt xem', info: formatNumber(filmInfo.views), type: 'highLight' },
            { title: 'Lượt yêu thích', info: formatNumber(filmInfo.likes), type: 'highLight' },
            {
                title: 'Trạng thái',
                info: subsType && subsType?.episode?.length > 0 ? filmInfo.status : 'Sắp phát hành',
                type: 'highLight',
            },
            { title: 'Tác giả', info: filmInfo.author, type: 'searchAble', category: 'author' },
            { title: 'Thể loại', info: filmInfo.genre, type: 'searchAble', category: 'genre' },
            {
                title: 'Đạo diễn',
                info: filmInfo.director,
                type: 'searchAble',
                category: 'director',
            },
            { title: 'Thời lượng', info: filmInfo.duration ? filmInfo.duration / 60 + ' phút' : 'Unknown' },
            {
                title: 'Số tập',
                info: `${lastThreeEpisodes[lastThreeEpisodes.length - 1] || 0} / ${filmInfo.maxEp || '?'}`,
            },

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
    const loveState = loveFilms.includes(filmInfo.film_id);

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
                                ) : info.type === 'watchAble' &&
                                  typeof info.info === 'object' &&
                                  subsType &&
                                  subsType?.episode?.length > 0 ? (
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
                    {subsType && subsType?.episode?.length > 0 && (
                        <FilmButtonGroup
                            dir={watch ? `/review/${filmInfo.searchName}` : `/watch/${filmInfo.searchName}/tap1`}
                            loveState={loveState}
                            filmId={filmInfo.film_id}
                            searchName={filmInfo.searchName}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default FilmInfo;
