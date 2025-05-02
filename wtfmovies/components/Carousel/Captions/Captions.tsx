'use client';
import Link from 'next/link';
import Filter9PlusIcon from '@mui/icons-material/Filter9Plus';
import CategoryIcon from '@mui/icons-material/Category';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { Fragment } from 'react';
import classNames from 'classnames/bind';

import { CaptionsItemInterface } from '~/libs/interfaces';
import style from './Captions.module.scss';
import FilmButtonGroup from '~/components/FilmButtonGroup/FilmButtonGroup';

const cx = classNames.bind(style);

const icons = [
    <HistoryEduIcon />,
    <CategoryIcon />,
    <Filter9PlusIcon />,
    <VisibilityOutlinedIcon />,
    <StarBorderIcon />,
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
                <FilmButtonGroup
                    dir={`/review/${item.searchName}`}
                    loveState={loveState}
                    filmId={item.film_id}
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
