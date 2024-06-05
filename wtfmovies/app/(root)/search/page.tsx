// import { Breadcrumbs, Link, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import classNames from 'classnames/bind';

import style from './search.module.scss';
import Title from '~/components/FilmClassify/Title';
import FilmCard from '~/components/FilmCard';
import { getSearch } from '~/libs/getData/search';
import Button from '~/components/Button';

const cx = classNames.bind(style);

async function search({ searchParams }: { searchParams: { query: string; type: string } }) {
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
                <div className={cx('top-bar')}>
                    <Title title="Phim tìm kiếm" icon={<SearchIcon className={cx('search-films-title')} />} />
                    <Button primary rightIcon={<FilterListIcon />}>
                        Bộ lọc
                    </Button>
                </div>

                <div className={cx('films-list')}>
                    {data?.map((item, index) => (
                        <FilmCard
                            key={index}
                            largeNoOverlay
                            imgSrc={item.poster}
                            filmName={item.name}
                            views={item.views}
                            author={item.author}
                            genre={item.genre}
                            tag={item.tag}
                            maxEp={item.maxEp || 18} // Lỗi ở đây
                            releaseYear={new Date(item.releaseYear)}
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
