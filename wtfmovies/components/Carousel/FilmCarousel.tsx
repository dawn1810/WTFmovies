'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useViewport } from '~/hooks';
import ImageCustom from '../ImageCustom';
import style from './FilmCarousel.module.scss';
import Captions from './Captions';
import { CaptionsItemInterface } from '~/libs/interfaces';
const cx = classNames.bind(style);

const NextButton = () => {
    return (
        <button className={cx('slide-btn')}>
            <FontAwesomeIcon icon={faAngleRight} />
        </button>
    );
};

const PrevButton = () => {
    return (
        <button className={cx('slide-btn')}>
            <FontAwesomeIcon icon={faAngleLeft} />
        </button>
    );
};

function FilmCarousel({ items }: { items: CaptionsItemInterface[] }) {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    return (
        <div className={cx('home-slider')}>
            <Carousel touch indicators={!isMobile} nextIcon={<NextButton />} prevIcon={<PrevButton />}>
                {items.map((item, index) => (
                    <Carousel.Item key={index}>
                        <ImageCustom className={`d-block w-100 ${cx('bg-img')}`} src={item.img} alt={item.name} />
                        {isMobile ? (
                            <div className={cx('carousel-caption')}>
                                <Captions item={item} />
                            </div>
                        ) : (
                            <Carousel.Caption className={cx('carousel-caption')}>
                                <Captions item={item} />
                            </Carousel.Caption>
                        )}
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default FilmCarousel;
