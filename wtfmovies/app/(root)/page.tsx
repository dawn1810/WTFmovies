import classNames from 'classnames/bind';

import FilmCarousel from '~/components/Carousel/FilmCarousel';
import FilmProposeList from '~/components/FilmProposeList';
import FilmClassify from '~/components/FilmClassify';
import style from './Home.module.scss';
import { getCaroselFilms, getHotClassifyFilms, getNewClassifyFilms, getProposeListFilms } from '~/libs/getData/home';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { auth } from '../api/auth/[...nextauth]/auth';

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
                    mainIcon: <AccessTimeIcon fontSize="large" />,
                    extraIcon: <VisibilityOutlinedIcon fontSize="large" />,
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
                    mainIcon: <LocalFireDepartmentOutlinedIcon fontSize="large" />,
                    extraIcon: <FavoriteBorderIcon fontSize="large" />,
                }}
            />
        </div>
    );
}

export default Home;
