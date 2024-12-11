'use client';
import styles from './Leftbar.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';
import MenuSidebar from '~/components/MenusSidebar';
import images from '~/assets/image';
import { useParams } from 'next/navigation';
const cx = classNames.bind(styles);

type MenuItem = {
    title: string;
    icon: React.JSX.Element;
    scene?: string;
    children?: MenuItem[];
};

function Leftbar({ menuItems }: { menuItems: MenuItem[] }) {
    const params = useParams<{ page: string }>();

    return (
        <aside key={params?.page[0]} className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <div className={cx('inner')}>
                    <Link href={'/'} className={cx('logo-link')}>
                        <img src={images.logo} alt="wtfmovies" />
                    </Link>
                </div>
                <div>
                    <MenuSidebar menuItems={menuItems} scene={params?.page[0]}></MenuSidebar>
                </div>
            </div>
        </aside>
    );
}

export default Leftbar;
