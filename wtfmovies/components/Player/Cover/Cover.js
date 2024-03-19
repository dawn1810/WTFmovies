'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Image from 'next/image'

import { showCenterBtn } from '../playerSlice';
import { coverPlayerSelector } from '~/redux/selectors';
import style from './Cover.module.scss';
import images from '~/assets/image';

const cx = classNames.bind(style);

function Cover({ handleMouseMove, handlePlayPause, handleClickFullscreen }) {
    let y;
    const coverState = useSelector(coverPlayerSelector);

    const dispatch = useDispatch();

    const handleAnimBtnClick = () => {
        clearTimeout(y);
        dispatch(showCenterBtn(true));

        y = setTimeout(function () {
            dispatch(showCenterBtn(false));
        }, 500);
    };

    return (
        <div
            className={cx('player-cover')}
            onMouseMove={handleMouseMove}
            onClick={() => {
                handlePlayPause();
                handleAnimBtnClick();
            }}
            onDoubleClick={handleClickFullscreen}
        >
            <div
                className={cx('center-btn', {
                    'loading-btn': coverState.loading,
                })}
            >
                <img className={cx('loading-img')} src={images.logo} alt="" />
            </div>
            <div
                className={cx('center-btn', {
                    'animation-btn': coverState.centerBtn,
                })}
            >
                {!coverState.playing ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
            </div>
            <div
                className={cx('center-btn', 'left-btn', {
                    'animation-btn': coverState.leftBtn,
                })}
            >
                <FontAwesomeIcon icon={faClockRotateLeft} />
            </div>
            <div
                className={cx('center-btn', 'right-btn', {
                    'animation-btn': coverState.rightBtn,
                })}
            >
                <FontAwesomeIcon icon={faClockRotateLeft} flip="horizontal" />
            </div>
        </div>
    );
}

Cover.propTypes = {
    handleMouseMove: PropTypes.func.isRequired,
    handlePlayPause: PropTypes.func.isRequired,
    handleClickFullscreen: PropTypes.func.isRequired,
};

export default Cover;
