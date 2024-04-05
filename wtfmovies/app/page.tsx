import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEye, faFire, faHeart } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import { auth } from './api/auth/[...nextauth]/auth';
import FilmCarousel from '~/components/Carousel/FilmCarousel';
import FilmProposeList from '~/components/FilmProposeList';
import FilmClassify from '~/components/FilmClassify';
import style from './Home.module.scss';
import DefaultLayout from '~/layouts/DefaultLayout';

const cx = classNames.bind(style);

const filmClassifyFilms = [
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

const tabs = [
    {
        title: '#TẤT CẢ',
        eventKey: 'all',
        content: filmClassifyFilms,
    },
    {
        title: '#MÙA ĐÔNG - 2024',
        eventKey: 'winterTo2024',
        content: filmClassifyFilms,
    },
    // {
    //     title: '#PHIM BỘ',
    //     eventKey: 'phimBo',
    //     content: films,
    // },
    // {
    //     title: '#PHIM LẺ',
    //     eventKey: 'phimLe',
    //     content: films,
    // },
    // {
    //     title: '#KHÔNG GÌ CẢ',
    //     eventKey: 'nothing',
    //     content: films,
    // },
];

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

const items = [
    {
        imgSrc: '/jjk-wallpaper-3.jpg',
        filmTitle: 'Jujutsu Kaisen0',
        filmContent:
            "Jujutsu Kaisen is a Japanese manga series written and illustrated by Gege Akutami. It has been serialized in Shueisha's shōnen manga magazine Weekly Shōnen Jump since March 2018, with its chapters collected and published in 25 tankōbon volumes as of January 2024",
        infoList: [
            { title: 'Tác giả', info: ['Gege Akutami'], type: 'searchAble' },
            { title: 'Thể loại', info: ['Shonen manga', 'Dark fantasy'], type: 'searchAble' },
            { title: 'Số tập', info: '36/36' },
            { title: 'Lượt xem', info: '100M' },
            { title: 'Đánh giá', info: '4.9' },
        ],
    },
    {
        imgSrc: '/jjk-wallpaper-3.jpg',
        filmTitle: 'Jujutsu Kaisen1',
        filmContent:
            "Jujutsu Kaisen is a Japanese manga series written and illustrated by Gege Akutami. It has been serialized in Shueisha's shōnen manga magazine Weekly Shōnen Jump since March 2018, with its chapters collected and published in 25 tankōbon volumes as of January 2024",
        infoList: [
            { title: 'Tác giả', info: ['Gege Akutami'], type: 'searchAble' },
            { title: 'Thể loại', info: ['Shonen manga', 'Dark fantasy'], type: 'searchAble' },
            { title: 'Số tập', info: '36/36' },
            { title: 'Lượt xem', info: '100M' },
            { title: 'Đánh giá', info: '4.9' },
        ],
    },
    {
        imgSrc: '/jjk-wallpaper-3.jpg',
        filmTitle: 'Jujutsu Kaisen2',
        filmContent:
            "Jujutsu Kaisen is a Japanese manga series written and illustrated by Gege Akutami. It has been serialized in Shueisha's shōnen manga magazine Weekly Shōnen Jump since March 2018, with its chapters collected and published in 25 tankōbon volumes as of January 2024",
        infoList: [
            { title: 'Tác giả', info: ['Gege Akutami'], type: 'searchAble' },
            { title: 'Thể loại', info: ['Shonen manga', 'Dark fantasy'], type: 'searchAble' },
            { title: 'Số tập', info: '36/36' },
            { title: 'Lượt xem', info: '100M' },
            { title: 'Đánh giá', info: '4.9' },
        ],
    },
];

async function Home() {
    const session = await auth();

    return (
        <DefaultLayout currentUser={!!session && !!session?.user}>
            <div className={cx('wrapper')}>
                <div className={cx('home-top')}>
                    <FilmCarousel items={items} />
                    <FilmProposeList films={films} />
                </div>
                <FilmClassify
                    films={filmClassifyFilms}
                    tabs={tabs}
                    tags={{
                        mainDir: '/new_update',
                        extraDir: '/most_views',
                        mainTitle: 'MỚI CẬP NHẬT',
                        extraTitle: 'XEM NHIỀU NHẤT',
                        mainIcon: <FontAwesomeIcon icon={faClock} />,
                        extraIcon: <FontAwesomeIcon icon={faEye} />,
                    }}
                />
                <FilmClassify
                    films={filmClassifyFilms}
                    tabs={tabs}
                    tags={{
                        mainDir: '/hot',
                        extraDir: '/most_likes',
                        mainTitle: 'PHIM HOT',
                        extraTitle: 'YÊU THÍCH NHẤT',
                        mainIcon: <FontAwesomeIcon icon={faFire} />,
                        extraIcon: <FontAwesomeIcon icon={faHeart} />,
                    }}
                />
            </div>
        </DefaultLayout>
    );
}

export default Home;
