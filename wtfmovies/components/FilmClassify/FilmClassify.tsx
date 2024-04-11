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

function FilmClassify({ films, tabs, tags }: FilmClassifyInterface) {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    return (
        <div className={cx('wrapper')}>
            <Title title={tags.mainTitle} icon={tags.mainIcon} />
            {isMobile ? (
                <>
                    <TabsBox tabs={tabs} listContent textContent defaultActiveKey="all" className={cx('tab-box')} />
                    <Button
                        to={tags.mainDir}
                        primary
                        rightIcon={<FontAwesomeIcon icon={faAngleRight} />}
                        className={cx('more-btn')}
                    >
                        Xem thêm
                    </Button>
                    <SideBox to={tags.extraDir} title={tags.extraTitle} icon={tags.extraIcon} films={films} />
                </>
            ) : (
                <>
                    <TabsBox tabs={tabs} defaultActiveKey="all" gridContent />
                    <SideBox to={tags.extraDir} title={tags.extraTitle} icon={tags.extraIcon} films={films} />
                </>
            )}
        </div>
    );
}

export default FilmClassify;
