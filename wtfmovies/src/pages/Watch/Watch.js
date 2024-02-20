import ReactPlayer from 'react-player/youtube';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import Rating from '~/components/Rating';
import style from './Watch.module.scss';
import TabsBox from '~/components/TabsBox';

const cx = classNames.bind(style);

const films = [
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
];

const notyfyTabs = [
    {
        title: 'LỊCH CHIẾU',
        eventKey: 'celender',
        content: 'LỊCH CHIẾU: Thứ 2 hàng tuần trên WTF movie.',
    },
    {
        title: 'THÔNG BÁO',
        eventKey: 'notify',
        content:
            'THÔNG BÁO: Tuần này do một vài lý do chúng mình sẽ ra bản Thuyết minh chậm hơn một chút mong mọi người thông cảm',
    },
];

const episodesTabs = [
    {
        title: '#VIETSUB',
        eventKey: 'visub',
        content: [
            'Trailer',
            '1',
            '2 + 3',
            '4',
            '5',
            '6',
            '6.1',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28',
        ],
    },
    {
        title: '#THUYẾT MINH',
        eventKey: 'present',
        content: [
            'Trailer',
            '1',
            '2 + 3',
            '4',
            '5',
            '6',
            '6.1',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28',
        ],
    },
];

const proposeFilmsTabs = [
    {
        title: '#CÓ THỂ BẠN SẼ THÍCH',
        eventKey: 'like',
        content: films,
    },
    {
        title: '#PHIM HÀN QUỐC',
        eventKey: 'korean',
        content: films,
    },
    {
        title: '#PHIM MỚI',
        eventKey: 'new',
        content: films,
    },
];

const commentTabs = [
    {
        title: '#BÌNH LUẬN',
        eventKey: 'comment',
        content: 'LỊCH CHIẾU: Thứ 2 hàng tuần trên WTF movie.',
    },
    {
        title: '#THÔNG TIN PHIM',
        eventKey: 'film-info',
        content:
            'THÔNG BÁO: Tuần này do một vài lý do chúng mình sẽ ra bản Thuyết minh chậm hơn một chút mong mọi người thông cảm',
    },
];
function Watch() {
    return (
        <div className={cx('wrapper')}>
            <h1>CÔ GÁI ĐẾN TỪ TƯƠNG LAI</h1>
            <TabsBox tabs={notyfyTabs} textContent defaultActiveKey="celender" className={cx('tab-box')} />
            <ReactPlayer
                url="https://www.youtube.com/watch?v=zU3hvvv15jQ"
                width="1250px"
                height="690px"
                controls
                light
            />
            <div className={cx('film-ỉnteract')}>
                <Rating />
                <div className={cx('server-list')}>
                    <Button primary>#Máy chủ miền Tây</Button>
                    <Button primary>#Máy chủ miền Đất Hứa</Button>
                    <Button primary>#Máy chủ miền Đất Trống</Button>
                </div>
                <Button primary>#Méc bọ</Button>
            </div>
            <TabsBox tabs={episodesTabs} flexContent textContent defaultActiveKey="visub" className={cx('tab-box')} />
            <TabsBox
                tabs={proposeFilmsTabs}
                listContent
                textContent
                defaultActiveKey="like"
                className={cx('tab-box')}
            />
            <TabsBox
                tabs={commentTabs}
                commentContent
                textContent
                defaultActiveKey="comment"
                className={cx('cmt-tab-box')}
            />
        </div>
    );
}

export default Watch;
