'use client';
import styles from './Leftbar.module.scss';
const cx = classNames.bind(styles);
import classNames from 'classnames/bind';
import { faChartSimple, faFilm, faHouse } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import 'tippy.js/dist/tippy.css';
import { useViewport } from '~/hooks';
import config from '~/config';
import MenuSidebar from '~/components/MenusSidebar';
import images from '~/assets/image';
function handleClickSidebar(scene: string) {
    console.log(scene);
}
const menuItems = [
    {
        title: 'Tổng quan',
        icon: faHouse,
        scene: 'overview',
    },
    {
        title: 'Quản lý phim',
        icon: faFilm,
        scene: 'film',
    },
    {
        title: 'Thống kê',
        icon: faChartSimple,
        scene: 'chart',
    },
];
function Leftbar() {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    return (
        <aside className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <div className={cx('inner')}>
                    <Link href={config.routes.home} className={cx('logo-link')}>
                        <img src={images.logo} alt="wtfmovies" />
                    </Link>
                </div>
                <div>
                    <MenuSidebar menuItems={menuItems} handleClick={handleClickSidebar}></MenuSidebar>
                </div>

                {/* {isMobile ? (
                        <div className={cx('search-box', { 'search-box-show': searchShow })}>
                            <button className={cx('back-btn')} onClick={handleSearchClose}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                            <Search />
                        </div>
                    ) : (
                        <Search />
                    )} */}
            </div>
        </aside>
    );
}

export default Leftbar;
