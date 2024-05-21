'use client';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp91, faCat, faEye, faFeather, faPlay, faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { CaptionsItemInterface } from '~/libs/interfaces';
import Button from '~/components/Button';
import style from './Captions.module.scss';
import { Favorite, FavoriteBorder, PlayArrow, ShareOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(style);

const icons = [
    <FontAwesomeIcon icon={faFeather} />,
    <FontAwesomeIcon icon={faCat} />,
    <FontAwesomeIcon icon={faArrowUp91} />,
    <FontAwesomeIcon icon={faEye} />,
    <FontAwesomeIcon icon={faStar} />,
];

function Captions({ item }: { item: CaptionsItemInterface }) {
    const [love, setLove] = useState(false);
    const [loading, setLoading] = useState(false);

    const loveDebounce = useDebounce(love, 2000);

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);

            const result = await fetch('/api/v1/evaluate/addStandard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ love: loveDebounce }),
            });

            // if (response.ok) {
            //     const res = await response.json();
            //     dispatch(changeRow([...rows, { ...newValue, _id: res }]));
            //     setValue({ name: '', maxScore: 0 });
            //     handleCloseDialog();
            // } else if (response.status === 400) {
            //     alert('Thêm tiêu chuẩn thất bại!');
            // } else if (response.status === 500) {
            //     alert('Lỗi trong quá trình thêm tiêu chuẩn!');
            // }

            // setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [loveDebounce]);

    const handleLike = () => {
        setLove((prev) => !prev);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(`localhost:3000/review/${item.searchName}`);
        alert('Copied 😽😽😽');
    };

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
                <div className={cx('btn-group')}>
                    <Button to={`/review/${item.searchName}`} primary leftIcon={<PlayArrow />}>
                        Xem phim
                    </Button>
                    <IconButton
                        size="large"
                        style={{ color: love ? 'var(--highlight-color)' : 'var(--text-color)' }}
                        onClick={handleLike}
                    >
                        {love ? <Favorite fontSize="inherit" /> : <FavoriteBorder fontSize="inherit" />}
                    </IconButton>
                    <IconButton size="large" onClick={handleShare}>
                        <ShareOutlined fontSize="inherit" />
                    </IconButton>
                </div>
            </div>
        </>
    );
}

Captions.propTypes = {
    item: PropTypes.object.isRequired,
};

export default Captions;
