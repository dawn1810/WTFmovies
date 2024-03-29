'use client';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
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
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { headerSelector } from '~/redux/selectors';
import { changeModalShow, changeCurrentUser } from './headerSlice';
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
        type: 'logout',
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

function Header({ isDatabase = false, title }: { isDatabase?: boolean; title?: string }) {
    const state = useSelector(headerSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        const updateCookies = async () => {
            try {
                const response = await fetch('/api/auth/updateUserCookies', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.status === 200) {
                    dispatch(changeCurrentUser(true));
                } else if (response.status === 204) {
                    dispatch(changeCurrentUser(false));
                }
            } catch (error) {
                console.error('Error fetching public key:', error);
            }
        };

        updateCookies();
    }, []);

    // const [modalShow, setModalShow] = useState<boolean>(false);
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
            case 'logout':
                const Logout = async () => {
                    try {
                        const response = await fetch('/api/auth/logout', {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                        });

                        if (response.ok) {
                            dispatch(changeCurrentUser(false));
                            const pathname = usePathname();
                            const router = useRouter();
                            router.push(pathname);
                        } else {
                            throw new Error('Network response was not ok.');
                        }
                    } catch (error) {
                        console.error('Error fetching public key:', error);
                    }
                };

                Logout();
                break;
            default:
        }
    };

    const handleSearchClose = () => setSearchShow(false);
    const handleSearchShow = () => setSearchShow(true);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('inner')}>
                    {isDatabase ? (
                        <h1 className={cx('tileDtB')}>{title}</h1>
                    ) : (
                        <Link href={config.routes.home} className={cx('logo-link')}>
                            <img src={images.logo} alt="wtfmovies" />
                        </Link>
                    )}
                    {/* search */}
                    {isDatabase ||
                        (isMobile ? (
                            <div className={cx('search-box', { 'search-box-show': searchShow })}>
                                <button className={cx('back-btn')} onClick={handleSearchClose}>
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                                <Search />
                            </div>
                        ) : (
                            <Search />
                        ))}

                    <div className={cx('actions')}>
                        {isMobile && (
                            <Tippy delay={[0, 50]} content="Search" placement="bottom">
                                <button className={cx('action-btn')} onClick={handleSearchShow}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                            </Tippy>
                        )}
                        {state.currentUser ? (
                            <Tippy delay={[0, 50]} content="Notify" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faBell} />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        ) : (
                            <>
                                {isMobile ? (
                                    <Button
                                        primary
                                        className={cx('mb-login-btn')}
                                        onClick={() => dispatch(changeModalShow(true))}
                                    >
                                        <FontAwesomeIcon icon={faRightToBracket} />
                                    </Button>
                                ) : (
                                    <Button
                                        primary
                                        leftIcon={<FontAwesomeIcon icon={faRightToBracket} />}
                                        onClick={() => dispatch(changeModalShow(true))}
                                    >
                                        Đăng Nhập
                                    </Button>
                                )}
                            </>
                        )}

                        <Menu
                            key={String(state.currentUser)}
                            items={state.currentUser ? userMenu : MENU_ITEMS}
                            placement="bottom-end"
                            delay={[0, 500]}
                            onChange={handleMenuChange}
                        >
                            {state.currentUser ? (
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
            {isDatabase || (
                <Genres>
                    {genres.map((genre, index) => (
                        <Link key={index} href={genre.to} className={cx('genre')}>
                            {genre.name}
                        </Link>
                    ))}
                </Genres>
            )}

            <Modals show={state.modalShow} onHide={() => dispatch(changeModalShow(false))} />
        </header>
    );
}

export default Header;
