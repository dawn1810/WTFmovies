// import { Breadcrumbs, Link, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

// import { DefaultLayout } from '~/layouts';
import Title from '~/components/FilmClassify/Title';
import style from './search.module.scss';
import FilmCard from '~/components/FilmCard';
import { useSearchParams } from 'next/navigation';
import { getSearch } from '~/libs/getData/search';
import test from 'node:test';

const cx = classNames.bind(style);


async function search({
    searchParams,
}: {
    searchParams: { query: string, type: string };
}) {
    const data = await getSearch(searchParams);

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
                    {data?.map((item, index) => (
                        <FilmCard
                            key={index}
                            largeNoOverlay
                            imgSrc={item.poster}
                            filmName={item.name}
                            views={item.views}
                            rating={item.rating}
                            episodes={item.episodes}
                            className={cx('large-film-card')}
                            searchName={item.searchName}
                        />
                    ))}
                </div>
            </div>
        </div>
        // </DefaultLayout>
    );
}

export default search;
