// import { Breadcrumbs, Link, Typography } from '@mui/material';
'use client';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import classNames from 'classnames/bind';

import style from './SearchPage.module.scss';
import Title from '~/components/FilmClassify/Title';
import FilmCard from '~/components/FilmCard';
import Button from '~/components/Button';
import { useViewport } from '~/hooks';

const cx = classNames.bind(style);

function search({ data }: { data: any[] }) {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;
    return (
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
                    {!isMobile ? (
                        <Button primary rightIcon={<FilterListIcon />}>
                            Bộ lọc
                        </Button>
                    ) : (
                        <IconButton size="large">
                            <FilterListIcon fontSize="inherit" />
                        </IconButton>
                    )}
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
    );
}

export default search;
