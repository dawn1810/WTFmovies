'use client';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBookOpen,
    faCalendar,
    faCat,
    faCloudArrowUp,
    faEye,
    faFeather,
    faPlay,
    faUnlock,
} from '@fortawesome/free-solid-svg-icons';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CategoryIcon from '@mui/icons-material/Category';
import PublishIcon from '@mui/icons-material/Publish';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

import classNames from 'classnames/bind';

import images from '~/assets/image';
import ImageCustom from '../ImageCustom';
import style from './FilmCard.module.scss';
import { FilmCardInterface } from '~/libs/interfaces';
import Link from 'next/link';
import { formatNumber } from '~/libs/clientFunc';

const cx = classNames.bind(style);

function FilmCard({
    large = false,
    noOverlay = false,
    largeNoOverlay = false,
    imgSrc,
    filmName,
    searchName,
    releaseYear,
    maxEp,
    views,
    rating,
    genre,
    tag,
    author,
    episodes,
    className,
}: FilmCardInterface) {
    const formatViews = useRef(formatNumber(views));
    return (
        <div
            className={cx('wrapper', className, {
                'nooverlay-wrapper': noOverlay,
                'large-wrapper': large,
                'large-nooverlay-wrapper': largeNoOverlay,
            })}
        >
            <div
                className={cx('image-box', {
                    'nooverlay-img-box': noOverlay,
                    'large-nooverlay-img-box': largeNoOverlay,
                })}
            >
                <ImageCustom
                    className={cx('film-img', { 'nooverlay-img': noOverlay, 'large-nooverlay-img': largeNoOverlay })}
                    src={imgSrc}
                    alt={filmName}
                />
            </div>
            <div
                className={cx('info', {
                    'nooverlay-info': noOverlay || largeNoOverlay,
                    'large-info': large,
                    'large-nooverlay-info': largeNoOverlay,
                })}
            >
                <h4 className={cx('large-title')}>{filmName}</h4>
                {noOverlay || largeNoOverlay ? (
                    <div className={cx('nooverlay-subinfo-list', { 'large-nooverlay-subinfo-list': largeNoOverlay })}>
                        <h5>
                            <FontAwesomeIcon icon={faEye} /> {formatViews.current}
                        </h5>
                        <h5>
                            <FontAwesomeIcon icon={faCloudArrowUp} /> {`${episodes} / ${maxEp || '?'}`}
                        </h5>
                        <h5>
                            <FontAwesomeIcon icon={faCalendar} /> {releaseYear?.getFullYear()}
                        </h5>
                        {largeNoOverlay && (
                            <>
                                <h5>
                                    <FontAwesomeIcon icon={faFeather} />{' '}
                                    {author?.length && author.length > 0 ? author?.join(', ') : 'Chưa cập nhật'}
                                </h5>
                                <h5>
                                    <FontAwesomeIcon icon={faCat} />{' '}
                                    {genre?.length && genre?.length > 0 ? genre?.join(', ') : 'Chưa cập nhật'}
                                </h5>
                                <h5>
                                    <FontAwesomeIcon icon={faUnlock} />{' '}
                                    {tag?.length && tag.length > 0 ? tag.join(', ') : 'Chưa cập nhật'}
                                </h5>
                            </>
                        )}
                    </div>
                ) : (
                    <h5>Lượt xem: {formatViews.current}</h5>
                )}
            </div>
            <div
                className={cx('rating', {
                    'nooverlay-rating': noOverlay,
                    'large-rating': large,
                    'large-nooverlay-rating': largeNoOverlay,
                })}
            >
                <ImageCustom src={images.star} alt="rating" />
                <span>{rating || 'NR'}</span>
            </div>
            <div
                className={cx('episodes', {
                    'nooverlay-episodes': noOverlay,
                    'large-episodes': large,
                    'large-nooverlay-episodes': largeNoOverlay,
                })}
            >
                <ImageCustom src={images.episodes} alt="episodes" />
                <span>{episodes}</span>
            </div>
            {noOverlay || largeNoOverlay ? (
                <div className={cx('noOverlay-btn-list', { 'large-noOverlay-btn-list': largeNoOverlay })}>
                    <Link href={`/watch/${searchName}`} className={cx('hover-btn')}>
                        <FontAwesomeIcon icon={faPlay} />
                    </Link>
                    <Link href={`/review/${searchName}`} className={cx('hover-btn')}>
                        <FontAwesomeIcon icon={faBookOpen} />
                    </Link>
                </div>
            ) : (
                <div className={cx('hover-btn-list')}>
                    <Link href={`/watch/${searchName}`} className={cx('hover-btn', 'watch-btn')}>
                        <FontAwesomeIcon icon={faPlay} />
                    </Link>
                    <Link href={`/review/${searchName}`} className={cx('hover-btn', 'review-btn')}>
                        <FontAwesomeIcon icon={faBookOpen} />
                    </Link>
                </div>
            )}
        </div>
    );
}

export default FilmCard;
