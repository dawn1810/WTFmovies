import classNames from 'classnames/bind';

import FilmInfo from '~/components/FilmInfo/FilmInfo';
import CommentContent from '~/components/CommentContent';
import style from './Watch.module.scss';
import TabsBox from '~/components/TabsBox';
import FilmInteract from '~/components/FilmInteract';
import Player from '~/components/Player';
import DefaultLayout from '~/layouts/DefaultLayout';
import { auth } from '../api/auth/[...nextauth]/auth';

const cx = classNames.bind(style);

const films = [
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
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
        content: <CommentContent />,
    },
    {
        title: '#THÔNG TIN PHIM',
        eventKey: 'film-info',
        content: <FilmInfo />,
    },
];

async function Watch() {
    const session = await auth();
    return (
        <DefaultLayout currentUser={!!session && !!session?.user}>
            <div className={cx('wrapper')}>
                <h1 className={cx('title')}>Inuyashiki (いぬやしき)</h1>
                <TabsBox tabs={notyfyTabs} textContent defaultActiveKey="celender" className={cx('tab-box')} />
                <Player url={'https://p21-ad-sg.ibyteimg.com/obj/ad-site-i18n-sg/202404075d0ddd9fdb8ed672411ea059?.m3u8'} />
                <FilmInteract />
                <TabsBox
                    tabs={episodesTabs}
                    flexContent
                    textContent
                    defaultActiveKey="visub"
                    className={cx('tab-box')}
                />
                <TabsBox
                    tabs={proposeFilmsTabs}
                    listContent
                    // textContent
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
        </DefaultLayout>
    );
}

export default Watch;
