'use client';
import classNames from 'classnames/bind';

import Title from './Title';
import { useViewport } from '~/hooks';
import SideBox from './SideBox';
import TabsBox from '~/components/TabsBox';
// import Button from '~/components/Button';
import style from './FilmClassify.module.scss';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FilmClassifyInterface } from '~/libs/interfaces';

const cx = classNames.bind(style);

const films = [
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
];

const tabs = [
    {
        title: '#TẤT CẢ',
        eventKey: 'all',
        content: films,
    },
    {
        title: '#MÙA ĐÔNG - 2024',
        eventKey: 'winterTo2024',
        content: films,
    },
    // {
    //     title: '#PHIM BỘ',
    //     eventKey: 'phimBo',
    //     content: films,
    // },
    // {
    //     title: '#PHIM LẺ',
    //     eventKey: 'phimLe',
    //     content: films,
    // },
    // {
    //     title: '#KHÔNG GÌ CẢ',
    //     eventKey: 'nothing',
    //     content: films,
    // },
];

function FilmClassify({ films, tabs, tags }: FilmClassifyInterface) {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    return (
        <div className={cx('wrapper')}>
            <Title title={tags.mainTitle} icon={tags.mainIcon} />
            {isMobile ? (
                <>
                    <TabsBox tabs={tabs} listContent textContent defaultActiveKey="all" className={cx('tab-box')} />
                    <Button primary rightIcon={<FontAwesomeIcon icon={faAngleRight} />} className={cx('more-btn')}>
                        Xem thêm
                    </Button>
                    <SideBox to={tags.extraDir} title={tags.extraTitle} icon={tags.extraIcon} />
                </>
            ) : (
                <>
                    <TabsBox tabs={tabs} defaultActiveKey="all" gridContent />
                    <SideBox to={tags.extraDir} title={tags.extraTitle} icon={tags.extraIcon} />
                </>
            )}
        </div>
    );
}

export default FilmClassify;
