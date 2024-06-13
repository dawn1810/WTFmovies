// import { Breadcrumbs, Link, Typography } from '@mui/material';
'use client';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import classNames from 'classnames/bind';

import style from './SearchPage.module.scss';
import Title from '~/components/FilmClassify/Title';
import FilmCard from '~/components/FilmCard';
import Button from '~/components/Button';
import { useViewport } from '~/hooks';
import AvdSearch from './AvdSearch';
import { useState } from 'react';

const cx = classNames.bind(style);

function search({ data, query }: { data: any[], query: any }) {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;
    const [open, setOpen] = useState(false);

    const openAndSearch = () => {
        setOpen(true)
    }
    return (
        <div className={cx('wrapper')}>
            <AvdSearch open={open} query={query} setOpen={setOpen} ></AvdSearch>
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
                    <Title title={`Kết quả tìm kiếm ${query.query ? query.query : ""}`} icon={<SearchIcon className={cx('search-films-title')} />} />
                    {!isMobile ? (
                        <Button onClick={openAndSearch} primary rightIcon={<FilterAltIcon />}>
                            Bộ lọc
                        </Button>
                    ) : (
                        <IconButton onClick={openAndSearch} color='error' size="large">
                            <FilterAltIcon fontSize="inherit" />
                        </IconButton>
                    )}
                </div>

                <div className={cx('films-list')}>
                    {data.length > 0 ? data?.map((item, index) => (
                        <FilmCard
                            key={item.searchName + index}
                            largeNoOverlay
                            imgSrc={item.poster}
                            filmName={item.name}
                            views={item.views}
                            author={item.author}
                            genre={item.genre}
                            tag={item.tag}
                            maxEp={item.maxEp || undefined} // Lỗi ở đây
                            releaseYear={new Date(item.releaseYear)}
                            rating={item.rating}
                            episodes={item.episodes}
                            className={cx('large-film-card')}
                            searchName={item.searchName}
                        />
                    )) : (<div className={cx('textNoData')}>Không tìm thấy dữ liệu</div>)}
                </div>
            </div>
        </div>
    );
}

export default search;
