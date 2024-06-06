'use client';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';

import Link from 'next/link';
import classNames from 'classnames/bind';

// import config from '~/config';
import style from './Footer.module.scss';
import images from '~/assets/image';

const cx = classNames.bind(style);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* config.routes.home */}
                <Link href="" className={cx('logo-link')}>
                    <img src={images.logo} alt="wtfmovies" className={cx('logo')} />
                </Link>
                <div className={cx('about-tag')}>
                    <h3 className={cx('title')}>Về WTFdev</h3>
                    <ul>
                        <li>Giới thiệu</li>
                        <li>Liên hệ</li>
                        <li>Điều khoản</li>
                        <li>Bảo mật</li>
                    </ul>
                </div>
                <div className={cx('about-tag')}>
                    <h3 className={cx('title')}>Sản phẩm</h3>
                    <ul>
                        <li>WTFnovels</li>
                        <li>WTFmusics</li>
                        <li>WTFmovies</li>
                        <li>WTFgames</li>
                    </ul>
                </div>
                <div className={cx('about-tag')}>
                    <h3 className={cx('title')}>Thành viên</h3>
                    <ul>
                        <li>Nguyễn Bình Minh</li>
                        <li>Nguyễn Trần Hoàng Long</li>
                        <li>Nguyễn Ngọc Long</li>
                        <li>Nguyễn Hưng Thịnh</li>
                    </ul>
                </div>
                <div className={cx('about-tag')}>
                    <h3 className={cx('title')}>WTFdev team</h3>
                    <ul>
                        <li>
                            Liên hệ:{' '}
                            <Link className={cx('mailtoEle')} href="mailto:mail@wtfdev.pages.dev">
                                mail@wtfdev.pages.dev
                            </Link>
                        </li>
                        <li>Ngày thành lập: 31/01/2024</li>
                        <li>Lĩnh vực: Công nghệ, WTFdev xây dựng những ứng dụng giải trí dành cho người dùng</li>
                    </ul>
                </div>
            </div>
            <div className={cx('bottom')}>
                <div>© 2022 - 2024 WTFdev. Nền tảng giải trí trực tuyến số một thế giới</div>
                <div className={cx('btn-list')}>
                    <IconButton size="large">
                        <FacebookIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton size="large">
                        <GitHubIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton size="large">
                        <YouTubeIcon fontSize="inherit" />
                    </IconButton>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
