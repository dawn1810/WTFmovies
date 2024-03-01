import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import style from './Cover.module.scss';
import images from '~/assets/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function Cover({
    loading,
    playing,
    animBtnShow,
    animLeftBtnShow,
    animRightBtnShow,
    handleMouseMove,
    handlePlayPause,
    handleClickFullscreen,
}) {
    return (
        <div
            className={cx('player-cover')}
            onMouseMove={handleMouseMove}
            onClick={handlePlayPause}
            onDoubleClick={handleClickFullscreen}
        >
            <div
                className={cx('center-btn', {
                    'loading-btn': loading,
                })}
            >
                <img className={cx('loading-img')} src={images.logo} alt="" />
            </div>
            <div
                className={cx('center-btn', {
                    'animation-btn': animBtnShow,
                })}
            >
                {!playing ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
            </div>
            <div
                className={cx('center-btn', 'left-btn', {
                    'animation-btn': animLeftBtnShow,
                })}
            >
                <FontAwesomeIcon icon={faClockRotateLeft} />
            </div>
            <div
                className={cx('center-btn', 'right-btn', {
                    'animation-btn': animRightBtnShow,
                })}
            >
                <FontAwesomeIcon icon={faClockRotateLeft} flip="horizontal" />
            </div>
        </div>
    );
}

Cover.propTypes = {
    loading: PropTypes.bool.isRequired,
    playing: PropTypes.bool.isRequired,
    animBtnShow: PropTypes.bool.isRequired,
    animLeftBtnShow: PropTypes.bool.isRequired,
    animRightBtnShow: PropTypes.bool.isRequired,
    handleMouseMove: PropTypes.func.isRequired,
    handlePlayPause: PropTypes.func.isRequired,
    handleClickFullscreen: PropTypes.func.isRequired,
};

export default Cover;
