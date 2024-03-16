'use client'
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import style from './Captions.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp91, faCat, faEye, faFeather, faPlay, faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';

const cx = classNames.bind(style);

const icons = [
    <FontAwesomeIcon icon={faFeather} />,
    <FontAwesomeIcon icon={faCat} />,
    <FontAwesomeIcon icon={faArrowUp91} />,
    <FontAwesomeIcon icon={faEye} />,
    <FontAwesomeIcon icon={faStar} />,
];

function Captions({ item }) {
    return (
        <>
            <div className={cx('film-info')}>
                <h3 className={cx('film-title')}>{item.filmTitle}</h3>
                <div className={cx('film-content')}>{item.filmContent}</div>
            </div>
            <div className={cx('film-detail')}>
                <ul className={cx('info-list')}>
                    {item.infoList.map((item, index) => (
                        <li key={index}>
                            <span>{icons[index]}</span>
                            {item.type === 'searchAble' ? (
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
        </>
    );
}

Captions.propTypes = {
    item: PropTypes.object.isRequired,
};

export default Captions;
