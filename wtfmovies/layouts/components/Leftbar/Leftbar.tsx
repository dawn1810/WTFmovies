'use client';
import { useDispatch, useSelector } from 'react-redux';
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

import { headerSelector } from '~/redux/selectors';
import { useViewport } from '~/hooks';
import Modals from '~/components/Modals';
import config from '~/config';
import Button from '~/components/Button';
import styles from './Leftbar.module.scss';
import images from '~/assets/image';
import Search from '../Search';

const cx = classNames.bind(styles);


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
                    <Button primary className={cx('navBtn')}>
                        Đăng ký
                    </Button>
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
