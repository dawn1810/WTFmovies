// import { Breadcrumbs, Link, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

// import { DefaultLayout } from '~/layouts';
import Title from '~/components/FilmClassify/Title';
import style from './search.module.scss';
import FilmCard from '~/components/FilmCard';
import { useSearchParams } from 'next/navigation';

const cx = classNames.bind(style);

const tests = [
    {
        imgSrc: '/jjk_shibuya_incident_arc_1693914044447_1693914064181.webp',
        filmName: 'Jujutsu Kaisen',
        views: 999.999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        imgSrc: '/jjk_shibuya_incident_arc_1693914044447_1693914064181.webp',
        filmName: 'Jujutsu Kaisen',
        views: 999.999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        imgSrc: '/jjk_shibuya_incident_arc_1693914044447_1693914064181.webp',
        filmName: 'Jujutsu Kaisen',
        views: 999.999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        imgSrc: '/jjk_shibuya_incident_arc_1693914044447_1693914064181.webp',
        filmName: 'Jujutsu Kaisen',
        views: 999.999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        imgSrc: '/jjk_shibuya_incident_arc_1693914044447_1693914064181.webp',
        filmName: 'Jujutsu Kaisen',
        views: 999.999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        imgSrc: '/jjk_shibuya_incident_arc_1693914044447_1693914064181.webp',
        filmName: 'Jujutsu Kaisen',
        views: 999.999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        imgSrc: '/jjk_shibuya_incident_arc_1693914044447_1693914064181.webp',
        filmName: 'Jujutsu Kaisen',
        views: 999.999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        imgSrc: '/jjk_shibuya_incident_arc_1693914044447_1693914064181.webp',
        filmName: 'Jujutsu Kaisen',
        views: 999.999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        imgSrc: '/jjk_shibuya_incident_arc_1693914044447_1693914064181.webp',
        filmName: 'Jujutsu Kaisen',
        views: 999.999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        imgSrc: '/jjk_shibuya_incident_arc_1693914044447_1693914064181.webp',
        filmName: 'Jujutsu Kaisen',
        views: 999.999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        imgSrc: '/jjk_shibuya_incident_arc_1693914044447_1693914064181.webp',
        filmName: 'Jujutsu Kaisen',
        views: 999.999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        imgSrc: '/jjk_shibuya_incident_arc_1693914044447_1693914064181.webp',
        filmName: 'Jujutsu Kaisen',
        views: 999.999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        imgSrc: '/jjk_shibuya_incident_arc_1693914044447_1693914064181.webp',
        filmName: 'Jujutsu Kaisen',
        views: 999.999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        imgSrc: '/jjk_shibuya_incident_arc_1693914044447_1693914064181.webp',
        filmName: 'Jujutsu Kaisen',
        views: 999.999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        imgSrc: '/jjk_shibuya_incident_arc_1693914044447_1693914064181.webp',
        filmName: 'Jujutsu Kaisen',
        views: 999.999,
        rating: 4.9,
        episodes: 1029,
    },
];

function search({
    searchParams,
}: {
    searchParams?: { [query: string]: string | string[] | undefined };
}) {
    console.log(searchParams);
    return (
        // <DefaultLayout>
        <div className={cx('wrapper')}>
            {/* <Breadcrumbs maxItems={3} aria-label="breadcrumb" className={cx('bread-crumbs')}>
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Link underline="hover" color="inherit" href="/search">
                        Search
                    </Link>
                    <Typography className={cx('curr-page')}>Phim mới nhất</Typography>
                </Breadcrumbs> */}
            <div className={cx('search-films')}>
                <Title
                    title="Phim tìm kiếm"
                    icon={<FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search-films-title')} />}
                />
                <div className={cx('films-list')}>
                    {tests.map((test, index) => (
                        <FilmCard
                            key={index}
                            largeNoOverlay
                            imgSrc={test.imgSrc}
                            filmName={test.filmName}
                            views={test.views}
                            rating={test.rating}
                            episodes={test.episodes}
                            className={cx('large-film-card')}
                            searchName="test"
                        />
                    ))}
                </div>
            </div>
        </div>
        // </DefaultLayout>
    );
}

export default search;
