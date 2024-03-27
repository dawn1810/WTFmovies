import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEye, faFire, faHeart } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import FilmCarousel from '~/components/Carousel/FilmCarousel';
import FilmProposeList from '~/components/FilmProposeList';
import FilmClassify from '~/components/FilmClassify';
import style from './Home.module.scss';
import DefaultLayout from '~/layouts/DefaultLayout';

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

function Home() {
    return (
        <DefaultLayout>
            <div className={cx('wrapper')}>
                <div className={cx('home-top')}>
                    <FilmCarousel />
                    <FilmProposeList films={films} />
                </div>
                <FilmClassify
                    mainDir="/new_update"
                    extraDir="/most_views"
                    mainTitle="MỚI CẬP NHẬT"
                    extraTitle="XEM NHIỀU NHẤT"
                    mainIcon={<FontAwesomeIcon icon={faClock} />}
                    extraIcon={<FontAwesomeIcon icon={faEye} />}
                />
                <FilmClassify
                    mainDir="/hot"
                    extraDir="/most_likes"
                    mainTitle="PHIM HOT"
                    extraTitle="YÊU THÍCH NHẤT"
                    mainIcon={<FontAwesomeIcon icon={faFire} />}
                    extraIcon={<FontAwesomeIcon icon={faHeart} />}
                />
            </div>
        </DefaultLayout>
    );
}

export default Home;
