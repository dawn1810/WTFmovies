import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const interactiveRef = useRef(null);
    const btnContainerRef = useRef(null);

    useEffect(() => {
        const interBubble = interactiveRef.current;
        const btnContainer = btnContainerRef.current;

        let curX = 0;
        let curY = 0;
        let tgX = 0;
        let tgY = 0;

        const move = () => {
            curX += (tgX - curX) / 20;
            curY += (tgY - curY) / 20;

            if (interBubble) {
                interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
            }
            requestAnimationFrame(move);
        };

        // Xác định sự kiện handleMouseMove trên container
        const handleMouseMove = (event) => {
            if (btnContainer && interBubble) {
                const rect = btnContainer.getBoundingClientRect();
                tgX = event.pageX - rect.left;
                tgY = event.pageY - rect.top;
            }
        };

        // Thêm event listener vào container
        btnContainer.addEventListener('mousemove', handleMouseMove);

        move();

        // Cleanup function để gỡ bỏ event listener khi component unmount
        return () => {
            if (btnContainer) {
                btnContainer.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            <input className={cx('search-input')} type="text" placeholder="Tìm kiếm" />
            <div className={cx('search-btn-w-bg')} ref={btnContainerRef}>
                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
                <div className={cx('gradient-bg')}>
                    <svg xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <filter id="goo">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                                <feColorMatrix
                                    in="blur"
                                    mode="matrix"
                                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                                    result="goo"
                                />
                                <feBlend in="SourceGraphic" in2="goo" />
                            </filter>
                        </defs>
                    </svg>
                    <div className={cx('gradients-container')}>
                        <div className={cx('g1')}></div>
                        <div className={cx('g2')}></div>
                        <div className={cx('g3')}></div>
                        <div className={cx('g4')}></div>
                        <div className={cx('g5')}></div>
                        <div className={cx('interactive')} ref={interactiveRef}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
