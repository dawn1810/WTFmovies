import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEye, faFire, faHeart } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import { auth } from './api/auth/[...nextauth]/auth';
import FilmCarousel from '~/components/Carousel/FilmCarousel';
import FilmProposeList from '~/components/FilmProposeList';
import FilmClassify from '~/components/FilmClassify';
import style from './Home.module.scss';
import DefaultLayout from '~/layouts/DefaultLayout';
import { getCaroselFilms, getNewClassifyFilms, getProposeListFilms } from '~/libs/getData/home';

const cx = classNames.bind(style);

const filmClassifyFilms = [
    {
        img: '/zdwfbkt301n51.jpg',
        name: 'Jujutsu Kaisen',
        views: 999999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        img: '/zdwfbkt301n51.jpg',
        name: 'Jujutsu Kaisen',
        views: 999999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        img: '/zdwfbkt301n51.jpg',
        name: 'Jujutsu Kaisen',
        views: 999999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        img: '/zdwfbkt301n51.jpg',
        name: 'Jujutsu Kaisen',
        views: 999999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        img: '/zdwfbkt301n51.jpg',
        name: 'Jujutsu Kaisen',
        views: 999999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        img: '/zdwfbkt301n51.jpg',
        name: 'Jujutsu Kaisen',
        views: 999999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        img: '/zdwfbkt301n51.jpg',
        name: 'Jujutsu Kaisen',
        views: 999999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        img: '/zdwfbkt301n51.jpg',
        name: 'Jujutsu Kaisen',
        views: 999999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        img: '/zdwfbkt301n51.jpg',
        name: 'Jujutsu Kaisen',
        views: 999999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        img: '/zdwfbkt301n51.jpg',
        name: 'Jujutsu Kaisen',
        views: 999999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        img: '/zdwfbkt301n51.jpg',
        name: 'Jujutsu Kaisen',
        views: 999999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        img: '/zdwfbkt301n51.jpg',
        name: 'Jujutsu Kaisen',
        views: 999999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        img: '/zdwfbkt301n51.jpg',
        name: 'Jujutsu Kaisen',
        views: 999999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        img: '/zdwfbkt301n51.jpg',
        name: 'Jujutsu Kaisen',
        views: 999999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        img: '/zdwfbkt301n51.jpg',
        name: 'Jujutsu Kaisen',
        views: 999999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        img: '/zdwfbkt301n51.jpg',
        name: 'Jujutsu Kaisen',
        views: 999999,
        rating: 4.9,
        episodes: 1029,
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
    {
        title: '#PHIM BỘ',
        eventKey: 'phimBo',
        content: filmClassifyFilms,
    },
    {
        title: '#PHIM LẺ',
        eventKey: 'phimLe',
        content: filmClassifyFilms,
    },
];

async function Home() {
    const session = await auth();

    // get data
    const carouselItems = await getCaroselFilms();
    const proposeListFilms = await getProposeListFilms();
    const { tabs, films: classifyFilms } = await getNewClassifyFilms('spring', 2024);

    return (
        <DefaultLayout currentUser={!!session && !!session?.user}>
            <div className={cx('wrapper')}>
                <div className={cx('home-top')}>
                    <FilmCarousel items={carouselItems} />
                    <FilmProposeList films={proposeListFilms} />
                </div>
                <FilmClassify
                    films={classifyFilms}
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
                {/* <FilmClassify
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
                /> */}
            </div>
        </DefaultLayout>
    );
}

export default Home;
