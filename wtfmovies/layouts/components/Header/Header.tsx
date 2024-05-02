'use client';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
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
import { changeModalShow } from './headerSlice';
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
import { ExtendedUser } from '~/libs/interfaces';

const cx = classNames.bind(styles);

type MenuItem = {
    type?: string;
    code?: string;
    title: string;
};

const MENU_ITEMS = [
    // {
    //     icon: <FontAwesomeIcon icon={faEarthAsia} />,
    //     title: 'Tiếng Việt',
    //     children: {
    //         title: 'Ngôn ngữ',
    //         data: [
    //             {
    //                 type: 'language',
    //                 code: 'en',
    //                 title: 'English',
    //             },
    //             {
    //                 type: 'language',
    //                 code: 'vi',
    //                 title: 'Tiếng Việt',
    //             },
    //         ],
    //     },
    // },

    // {
    //     icon: <FontAwesomeIcon icon={faCrown} />,
    //     title: 'Nâng cấp VIP',
    //     to: '/vip',
    // },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Cài đặt',
        to: '/settings',
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Trợ giúp & phản hồi',
        to: '/feedbacks',
    },
];

const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Thông tin tài khoản',
        type: 'profile',
    },

    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Đăng xuất',
        type: 'logout',
        separate: true,
    },
];

function Header({
    currentUser,
    isDatabase = false,
    title,
    genres,
}: {
    currentUser?: ExtendedUser;
    isDatabase?: boolean;
    title?: string;
    genres?: { name: string; to: string; special?: boolean }[] | any;
}) {
    //router
    const router = useRouter();

    // session
    const { data: session } = useSession();
    const extendedUser: ExtendedUser | undefined = session?.user;
    const isLogged = !!currentUser && !!currentUser.email;

    //redux
    const state = useSelector(headerSelector);
    const dispatch = useDispatch();

    const [searchShow, setSearchShow] = useState<boolean>(false);
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    const handleSearchClose = () => setSearchShow(false);
    const handleSearchShow = () => setSearchShow(true);

    // Handle logic
    const handleMenuChange = (menuItem: MenuItem) => {
        switch (menuItem.type) {
            case 'language':
                console.log('aaaa');
                // Handle change language
                break;
            case 'logout':
                signOut();
                break;
            case 'profile':
                router.push(`/profile/${extendedUser?.email}`);
                break;
            default:
        }
    };

    const [headerClass, setHeaderClass] = useState('wrapper-database');

    if (!isDatabase) {
        const [scrollPosition, setScrollPosition] = useState(0);
        const [scrollSpeed, setScrollSpeed] = useState(0);
        const [lastScrollTop, setLastScrollTop] = useState(0);
        useEffect(() => {
            setHeaderClass('wrapper-show');
        }, []);
        useEffect(() => {
            let ticking = false;

            const handleScroll = () => {
                const currentPosition = window.scrollY;

                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        const distance = Math.abs(currentPosition - lastScrollTop) * 100;
                        const speed = distance / 60;
                        setScrollSpeed(speed);

                        setLastScrollTop(currentPosition);
                        ticking = false;
                    });

                    ticking = true;
                }

                if (currentPosition < scrollPosition - scrollSpeed) {
                    setHeaderClass('wrapper-show');
                } else if (currentPosition > scrollPosition + scrollSpeed) {
                    setHeaderClass('wrapper-hide');
                }

                setScrollPosition(currentPosition <= 0 ? 0 : currentPosition);
            };

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, [scrollPosition, scrollSpeed]);
    }

    return (
        <header className={cx('wrapper', headerClass)}>
            <div className={cx('header')}>
                <div className={cx('inner')}>
                    {isDatabase ? (
                        <h1 className={cx('tileDtB')}>{title}</h1>
                    ) : (
                        <Link href={config.routes.home} className={cx('logo-link')}>
                            <img src={images.logo} alt="wtfmovies" />
                        </Link>
                    )}
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
                        {isLogged || (!!session && !!extendedUser) ? (
                            <>
                                <Tippy delay={[0, 50]} content="Notify" placement="bottom">
                                    <button className={cx('action-btn')}>
                                        <FontAwesomeIcon icon={faBell} />
                                        <span className={cx('badge')}>12</span>
                                    </button>
                                </Tippy>

                                <Menu
                                    key="loginyet"
                                    items={userMenu}
                                    placement="bottom-end"
                                    delay={[0, 500]}
                                    onChange={handleMenuChange}
                                >
                                    <ImageCustom className={cx('user-avatar')} src={extendedUser?.avatar} alt="Avt" />
                                </Menu>
                            </>
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

                                <Menu
                                    key="nologinyet"
                                    items={MENU_ITEMS}
                                    placement="bottom-end"
                                    delay={[0, 500]}
                                    onChange={handleMenuChange}
                                >
                                    <button className={cx('more-btn')}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                    </button>
                                </Menu>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {isDatabase || (
                <Genres>
                    {genres.map((genre: any, index: number) => {
                        return (
                            <Link key={index} href={genre.to} className={cx(genre.special && 'special-genre', 'genre')}>
                                {genre.name}
                            </Link>
                        );
                    })}
                </Genres>
            )}

            <Modals show={state.modalShow} onHide={() => dispatch(changeModalShow(false))} />
        </header>
    );
}

export default Header;
