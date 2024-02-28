import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import config from '~/config';
import style from './Footer.module.scss';
import images from '~/assets/image';

const cx = classNames.bind(style);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
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
                        <li>Mã số thuế: 8656789939</li>
                        <li>Ngày thành lập: 31/01/2024</li>
                        <li>Lĩnh vực: Công nghệ, WTFdev xây dựng những ứng dụng giải trí dành cho người dùng</li>
                    </ul>
                </div>
            </div>
            <div className={cx('bottom')}>
                <div>© 2022 - 2024 WTFdev. Nền tảng giải trí trực tuyến số một thế giới</div>
                <div className={cx('btn-list')}>
                    <button className={cx('action-btn')}>
                        <FontAwesomeIcon icon={faFacebook} />
                    </button>
                    <button className={cx('action-btn')}>
                        <FontAwesomeIcon icon={faGithub} />
                    </button>
                    <button className={cx('action-btn')}>
                        <FontAwesomeIcon icon={faYoutube} />
                    </button>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
