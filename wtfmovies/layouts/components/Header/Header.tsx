'use client';
import { useState } from 'react';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faBell,
    faCircleQuestion,
    faCrown,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faMagnifyingGlass,
    faRightToBracket,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { useViewport } from '~/hooks';
import Genres from '~/components/Genres';
import Modals from '~/components/Modals';
import config from '~/config';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/image';
import Menu from '~/components/Popper/Menu';
import ImageCustom from '~/components/ImageCustom';
import Search from '../Search';

const cx = classNames.bind(styles);

type MenuItem = {
    type?: string;
    code?: string;
    title: string;
};

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'Tiếng Việt',
        children: {
            title: 'Ngôn ngữ',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Trợ giúp & phản hồi',
        to: '/feedbacks',
    },
    {
        icon: <FontAwesomeIcon icon={faCrown} />,
        title: 'Nâng cấp VIP',
        to: '/vip',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Cài đặt',
        to: '/settings',
    },
];

const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Thông tin tài khoản',
        to: '/@hoaa',
    },

    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Đăng xuất',
        to: '/logout',
        separate: true,
    },
];

const genres = [
    { name: 'Tất cả', to: '/' },
    { name: 'Thịnh hành', to: '/hot' },
    { name: 'Mới', to: '/new' },
    { name: 'Hành động', to: '/action' },
    { name: 'Tình cảm', to: '/romance' },
    { name: 'Trinh thám', to: '/detective' },
    { name: 'Tâm lý tội phạm', to: 'crime' },
    { name: 'Hành động', to: '/action' },
    { name: 'Tình cảm', to: '/romance' },
    { name: 'Trinh thám', to: '/detective' },
    { name: 'Hành động', to: '/action' },
    { name: 'Tình cảm', to: '/romance' },
    { name: 'Trinh thám', to: '/detective' },
    { name: 'Tâm lý tội phạm', to: 'crime' },
    { name: 'Tâm lý tội phạm', to: 'crime' },
    { name: 'Trinh thám', to: '/detective' },
    { name: 'Tâm lý tội phạm', to: 'crime' },
    { name: 'Tâm lý tội phạm', to: 'crime' },
    { name: 'Trinh thám', to: '/detective' },
    { name: 'Tâm lý tội phạm', to: 'crime' },
    { name: 'Tâm lý tội phạm', to: 'crime' },
];

function Header() {
    const currentUser = false;
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [searchShow, setSearchShow] = useState<boolean>(false);

    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    // Handle logic
    const handleMenuChange = (menuItem: MenuItem) => {
        switch (menuItem.type) {
            case 'language':
                console.log('aaaa');
                // Handle change language
                break;
            default:
        }
    };

    const handleHide = () => setModalShow(false);

    const handleSearchClose = () => setSearchShow(false);
    const handleSearchShow = () => setSearchShow(true);

    const handleSubmit = async (event: any): Promise<void> => {
        event.preventDefault();

        const form = event.target;
        const email = form.formEmail.value;
        const password = form.formPassword.value;
        const remember = form.formPassword.value;

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, remember }),
        });

        if (response.ok) {
            setModalShow(false); // hide modal
        } else {
            console.log('err me no luon');
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('inner')}>
                    <Link href={config.routes.home} className={cx('logo-link')}>
                        <img src={images.logo} alt="wtfmovies" />
                    </Link>

                    {/* search */}
                    {isMobile ? (
                        <div className={cx('search-box', { 'search-box-show': searchShow })}>
                            <button className={cx('back-btn')} onClick={handleSearchClose}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                            <Search />
                        </div>
                    ) : (
                        <Search />
                    )}

                    <div className={cx('actions')}>
                        {currentUser ? (
                            <>
                                {isMobile && (
                                    <Tippy delay={[0, 50]} content="Search" placement="bottom">
                                        <button className={cx('action-btn')} onClick={handleSearchShow}>
                                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        </button>
                                    </Tippy>
                                )}
                                <Tippy delay={[0, 50]} content="Notify" placement="bottom">
                                    <button className={cx('action-btn')}>
                                        <FontAwesomeIcon icon={faBell} />
                                        <span className={cx('badge')}>12</span>
                                    </button>
                                </Tippy>
                            </>
                        ) : (
                            <>
                                <Button
                                    primary
                                    leftIcon={<FontAwesomeIcon icon={faRightToBracket} />}
                                    onClick={() => setModalShow(true)}
                                >
                                    Đăng Nhập
                                </Button>
                            </>
                        )}

                        <Menu
                            items={currentUser ? userMenu : MENU_ITEMS}
                            placement="bottom-end"
                            delay={[0, 500]}
                            onChange={handleMenuChange}
                        >
                            {currentUser ? (
                                <ImageCustom className={cx('user-avatar')} src="" alt="Itadory" />
                            ) : (
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            )}
                        </Menu>
                    </div>
                </div>
            </div>
            <Genres>
                {genres.map((genre, index) => (
                    <Link key={index} href={genre.to} className={cx('genre')}>
                        {genre.name}
                    </Link>
                ))}
            </Genres>
            {modalShow && <Modals show={modalShow} onHide={handleHide} onSubmit={handleSubmit} />}
        </header>
    );
}

export default Header;
