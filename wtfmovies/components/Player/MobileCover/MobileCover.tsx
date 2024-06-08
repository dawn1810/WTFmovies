'use client';
import Replay5RoundedIcon from '@mui/icons-material/Replay5Rounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import { showCenterBtn } from '../playerSlice';
import { coverPlayerSelector } from '~/redux/selectors';
import style from './MobileCover.module.scss';
import images from '~/assets/image';
import { useEffect, useRef, useState } from 'react';
import { showLeftBtn, showRightBtn } from '~/redux/actions';

const cx = classNames.bind(style);
interface coverI {
    playerRef: any;
    handlePlayPause: (e: any) => void;
    handleNextEp: () => void;
    handlePrevEp: () => void;
}
function Cover({ playerRef, handlePlayPause, handleNextEp, handlePrevEp }: coverI) {
    let x: NodeJS.Timeout, y: NodeJS.Timeout, z: NodeJS.Timeout;
    const coverState = useSelector(coverPlayerSelector);
    const [visible, setVisible] = useState(false);
    const divRef = useRef<any>(null);
    const [clickNum, setClickNum] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        const timeId = setTimeout(() => {
            setClickNum(0);
        }, 400);

        return () => clearTimeout(timeId);
    }, [clickNum]);

    useEffect(() => {
        const timeId = setTimeout(() => {
            setVisible(false);
        }, 1800);

        return () => clearTimeout(timeId);
    }, [visible]);

    const handleTimeChange = (time: number) => {
        const currTime = playerRef.current.getCurrentTime();
        playerRef.current.seekTo(currTime + time);
    };

    const handleClick = (e: any) => {
        setClickNum((prev) => prev + 1);
        if (clickNum >= 1) {
            const divWidth = divRef.current.getBoundingClientRect().width;
            const halfDivWidth = divWidth / 2;
            const mouseXPos = e.nativeEvent.offsetX;

            if (mouseXPos <= halfDivWidth) {
                handleTimeChange(-5);
                handleAnimLeftBtnClick();
            } else {
                handleTimeChange(5);
                handleAnimRightBtnClick();
            }
            setClickNum(0);
        } else {
            setVisible(true);
        }
    };

    const handleAnimLeftBtnClick = () => {
        clearTimeout(z);
        dispatch(showLeftBtn(true));

        z = setTimeout(function () {
            dispatch(showLeftBtn(false));
        }, 500);
    };

    const handleAnimRightBtnClick = () => {
        clearTimeout(x);
        dispatch(showRightBtn(true));

        x = setTimeout(function () {
            dispatch(showRightBtn(false));
        }, 500);
    };

    return (
        <div ref={divRef} className={cx('player-cover')} onClick={handleClick}>
            <div
                className={cx('center-btn', 'load-btn', {
                    'loading-btn': coverState.loading,
                })}
            >
                <img className={cx('loading-img')} src={images.logo} alt="" />
            </div>
            {visible && (
                <>
                    <div
                        className={cx('center-btn', {
                            'animation-btn': coverState.centerBtn,
                        })}
                        onClick={(e) => handlePlayPause(e)}
                    >
                        {coverState.playing ? (
                            <PauseRoundedIcon fontSize="large" />
                        ) : (
                            <PlayArrowRoundedIcon fontSize="large" />
                        )}
                    </div>
                    <div
                        className={cx('center-btn', 'left-btn', {
                            'animation-btn': coverState.leftBtn,
                        })}
                        onClick={handlePrevEp}
                    >
                        <SkipPreviousIcon fontSize="large" />
                    </div>
                    <div
                        className={cx('center-btn', 'right-btn', {
                            'animation-btn': coverState.rightBtn,
                        })}
                        onClick={handleNextEp}
                    >
                        <SkipNextIcon fontSize="large" />
                    </div>
                </>
            )}
            <div
                className={cx('center-btn', 'left-btn', 'skip-btn', {
                    'animation-btn': coverState.leftBtn,
                })}
            >
                <Replay5RoundedIcon fontSize="large" />
            </div>
            <div
                className={cx('center-btn', 'right-btn', 'skip-btn', {
                    'animation-btn': coverState.rightBtn,
                })}
            >
                <Replay5RoundedIcon fontSize="large" style={{ transform: 'scaleX(-1)' }} />
            </div>
        </div>
    );
}

export default Cover;
