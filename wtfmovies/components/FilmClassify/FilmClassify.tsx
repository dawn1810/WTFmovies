'use client';
import classNames from 'classnames/bind';

import Title from './Title';
import { useViewport } from '~/hooks';
import SideBox from './SideBox';
import TabsBox from '~/components/TabsBox';
import style from './FilmClassify.module.scss';
import Button from '../Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { FilmClassifyInterface, TabInterface } from '~/libs/interfaces';
import { mapFilms } from '~/libs/clientFunc';

const cx = classNames.bind(style);

function FilmClassify({ films, tabs, tags }: FilmClassifyInterface) {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    const newFilmTabs: TabInterface[] = [
        {
            title: '#TẤT CẢ',
            eventKey: 'all',
            content: tabs[0],
        },
        {
            title: '#QUÝ NÀY',
            eventKey: 'summerTo2024',
            content: tabs[1],
        },
        {
            title: '#PHIM BỘ',
            eventKey: 'phimBo',
            content: tabs[2],
        },
        {
            title: '#PHIM LẺ',
            eventKey: 'phimLe',
            content: tabs[3],
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <Title title={tags.mainTitle} icon={tags.mainIcon} />
            {!isMobile ? (
                <>
                    <TabsBox tabs={newFilmTabs} defaultActiveKey="all" gridContent />
                    <SideBox to={tags.extraDir} title={tags.extraTitle} icon={tags.extraIcon} films={mapFilms(films)} />
                </>
            ) : (
                <>
                    <TabsBox
                        tabs={newFilmTabs}
                        listContent
                        textContent
                        defaultActiveKey="all"
                        className={cx('tab-box')}
                    />
                    <Button to={tags.mainDir} primary rightIcon={<ArrowForwardIosIcon />} className={cx('more-btn')}>
                        Xem thêm
                    </Button>
                    <SideBox to={tags.extraDir} title={tags.extraTitle} icon={tags.extraIcon} films={mapFilms(films)} />
                </>
            )}
        </div>
    );
}

export default FilmClassify;
