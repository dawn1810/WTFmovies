'use client';
import styles from './Leftbar.module.scss';
import classNames from 'classnames/bind';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useViewport } from '~/hooks';
import config from '~/config';
import MenuSidebar from '~/components/MenusSidebar';
import images from '~/assets/image';
function handleClickSidebar(scene: string) {
    console.log(scene);
}
const cx = classNames.bind(styles);

function Leftbar({ menuItems }: {
    menuItems: {
        title: string;
        icon: IconDefinition,
        scene: string,
    }[]
}) {
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
