'use client';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp91, faCat, faEye, faFeather, faStar } from '@fortawesome/free-solid-svg-icons';
import { Fragment } from 'react';
import classNames from 'classnames/bind';

import { CaptionsItemInterface } from '~/libs/interfaces';
import style from './Captions.module.scss';
import FilmButtonGroup from '~/components/FilmButtonGroup/FilmButtonGroup';

const cx = classNames.bind(style);

const icons = [
    <FontAwesomeIcon icon={faFeather} />,
    <FontAwesomeIcon icon={faCat} />,
    <FontAwesomeIcon icon={faArrowUp91} />,
    <FontAwesomeIcon icon={faEye} />,
    <FontAwesomeIcon icon={faStar} />,
];

function Captions({ item, loveState }: { item: CaptionsItemInterface; loveState: boolean }) {
    return (
        <>
            <div className={cx('film-info')}>
                <h3 className={cx('film-title')}>{item.name}</h3>
                <div className={cx('film-content')}>{item.describe}</div>
            </div>
            <div className={cx('film-detail')}>
                <ul className={cx('info-list')}>
                    {item.infoList.map((item, index) => (
                        <li key={index}>
                            <span>{icons[index]}</span>
                            {item.type === 'searchAble' && typeof item.info === 'object' ? (
                                <span className={cx('info-title')}>
                                    <span>{item.title}:</span>{' '}
                                    {item.info.slice(0, -1).map((info, infoIndex) => (
                                        <Fragment key={infoIndex}>
                                            <Link href={'/result?search_query=' + info} className={cx('search-able')}>
                                                {info + ','}
                                            </Link>{' '}
                                        </Fragment>
                                    ))}
                                    <Link
                                        key={-1}
                                        href={'/result?search_query=' + item.info.slice(-1)}
                                        className={cx('search-able')}
                                    >
                                        {item.info.slice(-1)}
                                    </Link>
                                </span>
                            ) : (
                                <span className={cx('info-title')}>
                                    <span>{item.title}:</span> <span className={cx('high-light')}>{item.info}</span>
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
                <FilmButtonGroup dir={`/review/${item.searchName}`} loveState={loveState} searchName={item.film_id} />
                {/* <div className={cx('btn-group')}>
                    <Button to={`/review/${item.searchName}`} primary leftIcon={<PlayArrow />}>
                        Xem phim
                    </Button>
                    <IconButton
                        disabled={loading}
                        size="large"
                        style={{ color: love ? 'var(--highlight-color)' : 'var(--text-color)' }}
                        onClick={handleLike}
                    >
                        {love ? <Favorite fontSize="inherit" /> : <FavoriteBorder fontSize="inherit" />}
                    </IconButton>
                    <IconButton size="large" onClick={handleShare}>
                        <ShareOutlined fontSize="inherit" />
                    </IconButton>
                </div> */}
            </div>
        </>
    );
}

export default Captions;
