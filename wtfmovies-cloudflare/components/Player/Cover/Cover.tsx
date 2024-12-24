'use client';
import Replay5RoundedIcon from '@mui/icons-material/Replay5Rounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import { showCenterBtn } from '../playerSlice';
import { coverPlayerSelector } from '~/redux/selectors';
import style from './Cover.module.scss';
import images from '~/assets/image';

const cx = classNames.bind(style);
interface coverI {
    handleMouseMove: () => void;
    handlePlayPause: (e: any) => void;
    handleClickFullscreen: (e: any) => void;
}
function Cover({ handleMouseMove, handlePlayPause, handleClickFullscreen }: coverI) {
    let y: NodeJS.Timeout;
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
            onClick={(e) => {
                handlePlayPause(e);
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
                {!coverState.playing ? (
                    <PauseRoundedIcon fontSize="large" />
                ) : (
                    <PlayArrowRoundedIcon fontSize="large" />
                )}
            </div>
            <div
                className={cx('center-btn', 'left-btn', {
                    'animation-btn': coverState.leftBtn,
                })}
            >
                <Replay5RoundedIcon fontSize="large" />
            </div>
            <div
                className={cx('center-btn', 'right-btn', {
                    'animation-btn': coverState.rightBtn,
                })}
            >
                <Replay5RoundedIcon fontSize="large" style={{ transform: 'scaleX(-1)' }} />
            </div>
        </div>
    );
}

export default Cover;
