import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { useViewport } from '~/hooks';
import SideBox from './SideBox';
import TabsBox from '~/components/TabsBox';
import Button from '~/components/Button';
import style from './FilmClassify.module.scss';
import FilmProposeList from '../FilmProposeList';

const cx = classNames.bind(style);

const films = [
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
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

function FilmClassify({ mainDir, extraDir, mainTitle, extraTitle, mainIcon, extraIcon }) {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    return (
        <div className={cx('wrapper')}>
            <Button primary large to={mainDir} leftIcon={mainIcon} className={cx('film-classify-title')}>
                {mainTitle}
            </Button>
            {isMobile ? (
                <>
                    {/* <FilmProposeList films={films} className={cx('films-list')} /> */}
                    <TabsBox tabs={tabs} listContent textContent defaultActiveKey="all" className={cx('tab-box')} />
                    {/* <Button primary large to={extraDir} leftIcon={extraIcon} className={cx('film-classify-title')}>
                        {extraTitle}
                    </Button> */}
                    <SideBox to={extraDir} title={extraTitle} icon={extraIcon} />
                </>
            ) : (
                <>
                    <TabsBox tabs={tabs} defaultActiveKey="all" gridContent />
                    <SideBox to={extraDir} title={extraTitle} icon={extraIcon} />
                </>
            )}
        </div>
    );
}

FilmClassify.propTypes = {
    mainDir: PropTypes.string.isRequired,
    extraDir: PropTypes.string.isRequired,
    mainTitle: PropTypes.string.isRequired,
    extraTitle: PropTypes.string.isRequired,
    mainIcon: PropTypes.node.isRequired,
    extraIcon: PropTypes.node.isRequired,
};

export default FilmClassify;
