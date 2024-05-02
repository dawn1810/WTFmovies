'use client';
import styles from './Leftbar.module.scss';
import classNames from 'classnames/bind';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import config from '~/config';
import MenuSidebar from '~/components/MenusSidebar';
import images from '~/assets/image';
import { useParams } from 'next/navigation';

const cx = classNames.bind(styles);

function Leftbar({
    menuItems,
}: {
    menuItems: {
        title: string;
        icon: IconDefinition;
        scene: string;
    }[];
}) {
    const params = useParams<{ page: string }>();
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <div className={cx('inner')}>
                    <Link href={config.routes.home} className={cx('logo-link')}>
                        <img src={images.logo} alt="wtfmovies" />
                    </Link>
                </div>
                <div>
                    <MenuSidebar menuItems={menuItems} scene={params.page[0]}></MenuSidebar>
                </div>
            </div>
        </aside>
    );
}

export default Leftbar;
