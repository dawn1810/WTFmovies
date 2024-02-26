import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarDays,
    faCat,
    faClapperboard,
    faClock,
    faClosedCaptioning,
    faEarthAsia,
    faFeather,
    faLanguage,
    faPersonChalkboard,
    faPersonThroughWindow,
    faPlay,
    faStar,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';

import Image from '../Image';
import style from './FilmInfo.module.scss';
import Button from '../Button';

const cx = classNames.bind(style);

const infoList = {
    image: 'https://www.enwallpaper.com/wp-content/uploads/2023/11/jjk-wallpaper-3.jpg',
    title: 'Jujutsu Kaisen',
    decript:
        "Jujutsu Kaisen is a Japanese manga series written and illustrated by Gege Akutami. It has been serialized in Shueisha's shōnen manga magazine Weekly Shōnen Jump since March 2018, with its chapters collected and published in 25 tankōbon volumes as of January 2024",
    info: [
        { icon: <FontAwesomeIcon icon={faClapperboard} />, title: 'Trạng thái', info: 'Hoàn thành' },
        { icon: <FontAwesomeIcon icon={faFeather} />, title: 'Tác giả', info: 'Gege Akutami' },
        { icon: <FontAwesomeIcon icon={faCat} />, title: 'Thể loại', info: 'Shonen manga, Dark fantasy' },
        {
            icon: <FontAwesomeIcon icon={faPersonChalkboard} />,
            title: 'Đạo diễn',
            info: ' Sunghoo Park (S1); Shōta Goshozono (S2)',
        },
        { icon: <FontAwesomeIcon icon={faClock} />, title: 'Thời lượng', info: '24 phút/tập' },
        { icon: <FontAwesomeIcon icon={faLanguage} />, title: 'Ngôn ngữ', info: 'Nhật Bản, Anh' },
        { icon: <FontAwesomeIcon icon={faClosedCaptioning} />, title: 'Phụ đề', info: 'Vietsub, Thuyết minh' },
        { icon: <FontAwesomeIcon icon={faCalendarDays} />, title: 'Năm sản xuất', info: '2021' },
        { icon: <FontAwesomeIcon icon={faEarthAsia} />, title: 'Quốc gia sản xuất', info: 'Nhật Bản' },
        {
            icon: <FontAwesomeIcon icon={faPersonThroughWindow} />,
            title: 'Diển viên nổi bật',
            info: 'Kenjiro Tsuda, Yuichi Nakamura, Junya Enoki,...',
        },

        { icon: <FontAwesomeIcon icon={faStar} />, title: 'Tập mới cập nhật', info: '29, 28, 27, 26' },
    ],
};

function FilmInfo() {
    return (
        <div className={cx('wrapper')}>
            <Image className={cx('film-image')} src={infoList.image} alt={infoList.title} />
            <div className={cx('film-left-container')}>
                <div className={cx('film-info')}>
                    <h3 className={cx('film-title')}>{infoList.title}</h3>
                    <div className={cx('film-content')}>{infoList.decript}</div>
                </div>
                <div className={cx('film-detail')}>
                    <ul className={cx('info-list')}>
                        {infoList.info.map((info, index) => (
                            <li key={index}>
                                <span>{info.icon}</span>
                                <span className={cx('info-title')}>
                                    <span>{info.title}:</span> {info.info}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className={cx('btn-group')}>
                        <Button primary leftIcon={<FontAwesomeIcon icon={faPlay} />}>
                            Xem phim
                        </Button>
                        <button className={cx('action-btn')}>
                            <FontAwesomeIcon icon={faHeart} />
                        </button>
                        <button className={cx('action-btn')}>
                            <FontAwesomeIcon icon={faShareFromSquare} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilmInfo;
