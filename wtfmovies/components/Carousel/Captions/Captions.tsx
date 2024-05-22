'use client';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp91, faCat, faEye, faFeather, faStar } from '@fortawesome/free-solid-svg-icons';
import { Fragment, memo, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import { CaptionsItemInterface } from '~/libs/interfaces';
import Button from '~/components/Button';
import style from './Captions.module.scss';
import { Favorite, FavoriteBorder, PlayArrow, ShareOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDebounce } from '~/hooks';
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
    // const isFirstRender = useRef(true);
    // const [love, setLove] = useState(loveState);
    // const [loading, setLoading] = useState(false);

    // const loveDebounce = useDebounce(love, 1000);

    // useEffect(() => {
    //     if (isFirstRender.current) {
    //         return;
    //     }

    //     const fetchApi = async () => {
    //         setLoading(true);

    //         const response = await fetch('/api/v1/updateLike', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ searchName: item.searchName, love: loveDebounce }),
    //         });

    //         if (response.ok) {
    //             setLoading(false);
    //         } else if (response.status === 400) {
    //             alert('Cập nhật yêu thích thất bại!');
    //         } else if (response.status === 500) {
    //             alert('Lỗi trong quá trình cập nhật yêu thích');
    //         }
    //     };

    //     fetchApi();
    // }, [loveDebounce]);

    // const handleLike = () => {
    //     isFirstRender.current = false;
    //     setLove((prev) => !prev);
    // };

    // const handleShare = () => {
    //     navigator.clipboard.writeText(`localhost:3000/review/${item.searchName}`);
    //     alert("film's link copied 😽😽😽");
    // };

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
                <FilmButtonGroup
                    dir={`/review/${item.searchName}`}
                    loveState={loveState}
                    searchName={item.searchName}
                />
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
