'use client';
import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import style from './Genres.module.scss';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';

const cx = classNames.bind(style);

function Genres({ children }) {
    const genresRef = useRef(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    useEffect(() => {
        const currentGenresRef = genresRef.current.querySelector('.styles-module_slider__o0fqa');
        const checkScrollPosition = () => {
            const threshold = 10;
            setIsAtStart(currentGenresRef.scrollLeft <= threshold);
            setIsAtEnd(
                currentGenresRef.scrollWidth - currentGenresRef.scrollLeft - threshold <= currentGenresRef.clientWidth,
            );
        };

        checkScrollPosition();
        currentGenresRef.addEventListener('scroll', checkScrollPosition);
        return () => currentGenresRef.removeEventListener('scroll', checkScrollPosition);
    }, []);

    const scroll = (scrollOffset) => {
        genresRef.current.querySelector('.styles-module_slider__o0fqa').scrollTo({
            left: genresRef.current.querySelector('.styles-module_slider__o0fqa').scrollLeft + scrollOffset,
            behavior: 'smooth',
        });
    };

    return (
        <div className={cx('wrapper')}>
            <button style={{ opacity: isAtStart ? 0 : 1 }} className={cx('left-btn')} onClick={() => scroll(-500)}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <div ref={genresRef} className={cx('genres')}>
                <ScrollingCarousel className={cx('genres-carousel')}>{children}</ScrollingCarousel>
            </div>

            <button style={{ opacity: isAtEnd ? 0 : 1 }} className={cx('right-btn')} onClick={() => scroll(500)}>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    );
}

Genres.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Genres;
