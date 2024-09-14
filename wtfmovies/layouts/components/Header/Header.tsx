'use client';
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import CloseIcon from '@mui/icons-material/Close';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';

import styles from './Header.module.scss';
import { headerSelector } from '~/redux/selectors';
import { changeFbDialog, changeFbDialogType, changeModalShow, changeWsdata } from './headerSlice';
import { useViewport } from '~/hooks';
import Genres from '~/components/Genres';
import Modals from '~/components/Modals';
import Button from '~/components/Button';
import images from '~/assets/image';
import Menu from '~/components/Popper/Menu';
import ImageCustom from '~/components/ImageCustom';
import Search from '../Search';
import { ExtendedUser } from '~/libs/interfaces';
import { Badge, IconButton } from '@mui/material';
import FeedbackDialog from '~/components/FeedbackDialog';
import BanNotify from '~/components/BanNotifyDialog';
import Notify from '~/components/Notify';
import { socket } from '~/websocket/websocketService';
import { showNotify } from '~/components/Notify/notifySlide';

const cx = classNames.bind(styles);

type MenuItem = {
    type?: string;
    code?: string;
    title: string;
};

const MENU_ITEMS = [
    // {
    //     icon: ,
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
    //     icon: ,
    //     title: 'Nâng cấp VIP',
    //     to: '/vip',
    // },
    // {
    //     icon: <SettingsOutlined />,
    //     title: 'Cài đặt',
    //     to: '/settings',
    // },
    {
        icon: <HelpOutlineIcon />,
        title: 'Trợ giúp',
        type: 'feedbacks',
    },
    {
        icon: <FeedbackOutlinedIcon />,
        title: 'Gởi ý kiến phản hồi',
        type: 'feedbacks',
    },
];

const userMenu = [
    {
        icon: <PersonOutlineIcon />,
        title: 'Thông tin tài khoản',
        type: 'profile',
    },

    ...MENU_ITEMS,
    {
        icon: <LogoutIcon />,
        title: 'Đăng xuất',
        type: 'logout',
        separate: true,
    },
];

const adminMenu = [
    {
        icon: <ManageAccountsOutlinedIcon />,
        title: 'Admin',
        type: 'admin',
    },
    ...userMenu,
];

const editorMenu = [
    {
        icon: <ManageAccountsOutlinedIcon />,
        title: 'Editor',
        type: 'editor',
    },
    ...userMenu,
];

function Header({
    currentUser,
    isDatabase = false,
    title,
    genres,
    notifyLength,
}: {
    currentUser?: ExtendedUser;
    isDatabase?: boolean;
    title?: string;
    genres?: { name: string; to: string; special?: boolean }[] | any;
    notifyLength?: number;
}) {
    // session
    const { data: session, update } = useSession();
    const extendedUser: ExtendedUser | undefined = session?.user;
    const isLogged = !!currentUser && !!currentUser.email;

    //router
    const router = useRouter();

    //redux
    const state = useSelector(headerSelector);
    const dispatch = useDispatch();

    const [searchShow, setSearchShow] = useState<boolean>(false);
    const [openBanNotify, setOpenBanNotify] = useState<boolean>(false);
    const [unBanDate, setUnBanDate] = useState<string>('');
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    useEffect(() => {
        const checkStatus = async () => {
            const check = await fetch('/api/v1/checkAuth', {
                method: 'GET',
            });

            if (check.status === 400) {
                const res: any = check.json();
                setOpenBanNotify(true);
                setUnBanDate(res.date);
            }
        };

        checkStatus();
    }, []);

    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }

        function onConnect() {
            socket.emit('join', currentUser?.email);

            socket.io.engine.on('upgrade', (transport) => {
                console.log(transport.name);
            });
        }

        function onDisconnect() {
            console.log('Server disconnected');
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        socket.on('commentNotify', async (message) => {
            showAlert(`${message} nhắc đến bạn trong một bình luận`, 'info');
        });

        socket.on('banCurrUser', async (message) => {
            setOpenBanNotify(true);
            setUnBanDate(message);
        });

        // socket.on('changeUserRole', async (message) => {
        //     console.log(session);
        //     await update({ role: message });
        // });

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('commentNotify');
            socket.off('banCurrUser');
            // socket.off('changeUserRole');
        };
    }, []);

    useEffect(() => {
        socket.on('changeUserRole', async (message) => {
            await update({ user: { ...session?.user, role: message } });
        });

        return () => {
            socket.off('changeUserRole');
        };
    }, [session]);

    const showAlert = (content: string, type: any) => {
        dispatch(showNotify({ content, type, open: true }));
    };

    const handleSearchClose = () => setSearchShow(false);
    const handleSearchShow = () => setSearchShow(true);

    // Handle logic
    const handleMenuChange = (menuItem: MenuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            case 'logout':
                signOut();
                break;
            case 'admin':
                router.push(`/admin/overviews`);
                break;
            case 'editor':
                router.push(`/editor/overviews`);
                break;
            case 'profile':
                router.push(`/profile/${extendedUser?.email}`);
                break;
            case 'feedbacks':
                dispatch(changeFbDialog(true));
                dispatch(changeFbDialogType('feedback'));
                break;
            default:
        }
    };

    // Handle notification
    const handleNotification = () => {
        router.push(`/notification`);
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
                        <Link href={'/'} className={cx('logo-link')}>
                            <img src={images.logo} alt="wtfmovies" />
                        </Link>
                    )}
                    {isDatabase ||
                        (!isMobile ? (
                            <Search />
                        ) : (
                            <div className={cx('search-box', { 'search-box-show': searchShow })}>
                                <button className={cx('back-btn')} onClick={handleSearchClose}>
                                    <CloseIcon />
                                </button>
                                <Search />
                            </div>
                        ))}

                    <div className={cx('actions')}>
                        {isMobile && (
                            <button className={cx('action-btn')} onClick={handleSearchShow}>
                                <SearchIcon />
                            </button>
                        )}
                        {isLogged || (!!session && !!extendedUser) ? (
                            <>
                                <Tippy delay={[0, 50]} content="Notify" placement="bottom">
                                    <IconButton onClick={handleNotification}>
                                        <Badge badgeContent={notifyLength} max={999} color="error">
                                            <NotificationsNoneIcon />
                                        </Badge>
                                    </IconButton>
                                </Tippy>

                                <Menu
                                    key="loginyet"
                                    items={
                                        extendedUser?.role === 'admin' || currentUser?.role === 'admin'
                                            ? adminMenu
                                            : extendedUser?.role === 'editor' || currentUser?.role === 'editor'
                                            ? editorMenu
                                            : userMenu
                                    }
                                    placement="bottom-end"
                                    delay={[0, 500]}
                                    onChange={handleMenuChange}
                                >
                                    <ImageCustom className={cx('user-avatar')} src={extendedUser?.avatar} alt="Avt" />
                                </Menu>
                            </>
                        ) : (
                            <>
                                {!isMobile ? (
                                    <Button
                                        primary
                                        leftIcon={<LoginIcon />}
                                        onClick={() => dispatch(changeModalShow(true))}
                                    >
                                        Đăng Nhập
                                    </Button>
                                ) : (
                                    <Button
                                        primary
                                        className={cx('mb-login-btn')}
                                        onClick={() => dispatch(changeModalShow(true))}
                                    >
                                        <LoginIcon />
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
                                        <MoreVertIcon />
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
            <FeedbackDialog />
            <BanNotify open={openBanNotify} unBanDate={unBanDate} />
            <Notify />
        </header>
    );
}

export default Header;
