import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBell,
    faCircleQuestion,
    faCrown,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faRightToBracket,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Genres from '~/components/Genres';
import Modals from '~/components/Modals';
import config from '~/config';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/image';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import Search from '../Search';
const cx = classNames.bind(styles);

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
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Bàn phím & phím tắt',
    },
];

const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Thông tin tài khoản',
        to: '/@hoaa',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Cài đặt',
        to: '/settings',
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
    const currentUser = true;
    const [modalShow, setModalShow] = useState(false);

    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                console.log('aaaa');
                // Handle change language
                break;
            default:
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('inner')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <img src={images.logo} alt="wtfmovies" />
                    </Link>

                    <Search />

                    <div className={cx('actions')}>
                        {currentUser ? (
                            <>
                                <Tippy delay={[0, 50]} content="VIP" placement="bottom">
                                    <button className={cx('action-btn')}>
                                        <FontAwesomeIcon icon={faCrown} />
                                    </button>
                                </Tippy>
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
                                    className={cx('header-btn')}
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
                                <Image className={cx('user-avatar')} src="" alt="Itadory" />
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
                    <Link key={index} to={genre.to} className={cx('genre')}>
                        {genre.name}
                    </Link>
                ))}
            </Genres>
            <Modals show={modalShow} onHide={() => setModalShow(false)} />
        </header>
    );
}

export default Header;
