import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEye, faFire, faHeart } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import FilmCarousel from '~/components/Carousel/FilmCarousel';
import FilmProposeList from '~/components/FilmProposeList';
import FilmClassify from '~/components/FilmClassify';
import style from './Home.module.scss';
// import DefaultLayout from '~/layouts/DefaultLayout';
import { getCaroselFilms, getHotClassifyFilms, getNewClassifyFilms, getProposeListFilms } from '~/libs/getData/home';
import { AccessTime, FavoriteBorder, LocalFireDepartmentOutlined, VisibilityOutlined } from '@mui/icons-material';

const cx = classNames.bind(style);

async function Home() {
    // get data
    const carouselItems = await getCaroselFilms();
    const proposeListFilms = await getProposeListFilms();
    const { allNewFilms, currNewFilms, seriesNewFilms, movieNewFilms, mostWatchFilms } = await getNewClassifyFilms(
        'spring',
        2024,
    );
    const { allHotFilms, currHotFilms, seriesHotFilms, movieHotFilms, mostLikeFilms } = await getHotClassifyFilms(
        'spring',
        2024,
    );

    return (
        // <DefaultLayout>
        <div className={cx('wrapper')}>
            <div className={cx('home-top')}>
                <FilmCarousel items={carouselItems} />
                <FilmProposeList films={proposeListFilms} />
            </div>
            <FilmClassify
                films={mostWatchFilms}
                tabs={[allNewFilms, currNewFilms, seriesNewFilms, movieNewFilms]}
                tags={{
                    mainDir: '/new_update',
                    extraDir: '/most_views',
                    mainTitle: 'MỚI CẬP NHẬT',
                    extraTitle: 'XEM NHIỀU',
                    mainIcon: <AccessTime fontSize="large" />,
                    extraIcon: <VisibilityOutlined fontSize="large" />,
                }}
            />
            <FilmClassify
                films={mostLikeFilms}
                tabs={[allHotFilms, currHotFilms, seriesHotFilms, movieHotFilms]}
                tags={{
                    mainDir: '/hot',
                    extraDir: '/most_likes',
                    mainTitle: 'PHIM HOT',
                    extraTitle: 'YÊU THÍCH',
                    mainIcon: <LocalFireDepartmentOutlined fontSize="large" />,
                    extraIcon: <FavoriteBorder fontSize="large" />,
                }}
            />
        </div>
        // </DefaultLayout>
    );
}

export default Home;
