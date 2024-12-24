'use client';
import styles from './Leftbar.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';
import MenuSidebar from '~/components/MenusSidebar';
import images from '~/assets/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
const cx = classNames.bind(styles);

type MenuItem = {
    title: string;
    icon: React.JSX.Element;
    scene?: string;
    children?: MenuItem[];
};

function Leftbar({ menuItems, type }: { menuItems: MenuItem[], type: "admin" | "editor" }) {
    const router = useRouter();
    const params = useParams<{ page: string }>();
    // console.log(params);

    const [activeMenu, setActiveMenu] = useState(
        !!params.page[1] ? `/${type}/` + params.page[0] + '/' + params.page[1] : `/${type}/` + params.page[0],
    ); // set for start
    const [open, setOpen] = useState(false);

    const handleButtonClick = (item: any) => {
        if (item.scene) {
            // for item not have subitem
            console.log(item.scene);

            setActiveMenu(item.scene);
            router.replace(item.scene);
        }
        item.children && setOpen(!open);
    };

    const handleSubButtonClick = (child: any) => {
        if (child.scene) {
            setActiveMenu(child.scene);
            router.replace(child.scene);
        }
    };

    return (
        <aside key={params?.page[0]} className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <div className={cx('inner')}>
                    <Link href={'/'} className={cx('logo-link')}>
                        <img src={images.logo} alt="wtfmovies" />
                    </Link>
                </div>
                <div>
                    <MenuSidebar
                        menuItems={menuItems}
                        scene={params?.page[0]}
                        open={open}
                        activeMenu={activeMenu}
                        handleButtonClick={handleButtonClick}
                        handleSubButtonClick={handleSubButtonClick}
                    ></MenuSidebar>
                </div>
            </div>
        </aside>
    );
}

export default Leftbar;
