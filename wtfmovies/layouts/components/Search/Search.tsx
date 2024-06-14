'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import {
    Avatar,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
// Đảm bảo rằng hành động này được xác định trong các hành động Redux của bạn
import styles from './Search.module.scss';
import { useDebounce } from '~/hooks';
import { useDispatch } from 'react-redux';
import { changeNotifyContent, changeNotifyOpen, changeNotifyType } from '~/redux/actions';
import { timePassed } from '~/libs/clientFunc';

interface ResultInterface {
    keywordList: any[];
    filmsList: any[];
}

const cx = classNames.bind(styles);

function Search() {
    const router = useRouter();

    const ref = useRef(null);
    const interactiveRef = useRef(null);
    const btnContainerRef = useRef(null);
    const inputSearchRef = useRef<any>(null);

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState<ResultInterface>({
        keywordList: [],
        filmsList: [],
    });
    const [open, setOpen] = useState<boolean>(false);

    const searchValueDebounce = useDebounce(searchValue, 500);

    const id = open ? 'simple-popover' : undefined;

    const dispatch = useDispatch();

    const showAlert = (content: string, type: any) => {
        dispatch(changeNotifyContent(content));
        dispatch(changeNotifyType(type));
        dispatch(changeNotifyOpen(true));
    };

    useEffect(() => {
        if (searchValueDebounce === '') {
            setSearchResult({
                keywordList: [],
                filmsList: [],
            });
            return;
        }

        const fetchApi = async () => {
            // setLoading(true);

            const response = await fetch('/api/v1/search/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ searchValue }),
            });

            if (response.ok) {
                // setLoading(false);
                const res: ResultInterface = await response.json();
                setSearchResult(res);
            } else if (response.status === 400) {
                showAlert('!', 'error');
            } else if (response.status === 500) {
                showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
            }
        };

        fetchApi();
    }, [searchValueDebounce]);

    useEffect(() => {
        const interBubble: any = interactiveRef.current;
        const btnContainer: any = btnContainerRef.current;

        let curX = 0;
        let curY = 0;
        let tgX = 0;
        let tgY = 0;

        const move = () => {
            curX += (tgX - curX) / 20;
            curY += (tgY - curY) / 20;

            if (interBubble) {
                interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
            }
            requestAnimationFrame(move);
        };

        // Xác định sự kiện handleMouseMove trên container
        const handleMouseMove = (event: any) => {
            if (btnContainer && interBubble) {
                const rect = btnContainer.getBoundingClientRect();
                tgX = event.pageX - rect.left;
                tgY = event.pageY - rect.top;
            }
        };

        // Thêm event listener vào container
        btnContainer.addEventListener('mousemove', handleMouseMove);

        move();

        // Cleanup function để gỡ bỏ event listener khi component unmount
        return () => {
            if (btnContainer) {
                btnContainer.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            handleSearch();
        }
    };

    const handleSearchQueryChange = (event: any) => {
        setSearchValue(event.target.value); // Cập nhật trạng thái search trong redux
    };

    const handleClear = () => {
        setSearchValue('');
        setSearchResult({
            keywordList: [],
            filmsList: [],
        });
    };

    const handleFilmReview = (searchName: string) => {
        if (searchName) {
            router.push(`/review/${searchName}`);
            setSearchValue('');
            setSearchResult({
                keywordList: [],
                filmsList: [],
            });
        } else inputSearchRef.current.focus();
    };

    const handleSearch = async (searchName?: string) => {
        if (!!searchName) {
            router.push(`/search?query=${searchName}&type=name`);
            await fetch('/api/v1/search/updateSearch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ searchName }),
            });
        } else if (!!searchValue) {
            router.push(`/search?query=${searchValue}&type=name`);
            await fetch('/api/v1/search/updateSearch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ searchValue }),
            });
        }
        inputSearchRef.current.focus();
    };

    return (
        <div ref={ref} className={cx('wrapper')}>
            {!open ? (
                <div className={cx('input-container')}>
                    <input
                        ref={inputSearchRef}
                        className={cx('search-input')}
                        type="text"
                        value={searchValue}
                        placeholder="Tìm kiếm"
                        maxLength={250}
                        onFocus={(e: any) => handleClick(e)}
                    />
                    <div className={cx('search-btn-w-bg')} ref={btnContainerRef}>
                        <button className={cx('search-btn')} onClick={() => handleSearch()}>
                            <SearchIcon />
                        </button>
                        <div className={cx('gradient-bg')}>
                            <svg xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <filter id="goo">
                                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                                        <feColorMatrix
                                            in="blur"
                                            mode="matrix"
                                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                                            result="goo"
                                        />
                                        <feBlend in="SourceGraphic" in2="goo" />
                                    </filter>
                                </defs>
                            </svg>
                            <div className={cx('gradients-container')}>
                                <div className={cx('g1')}></div>
                                <div className={cx('g2')}></div>
                                <div className={cx('g3')}></div>
                                <div className={cx('g4')}></div>
                                <div className={cx('g5')}></div>
                                <div className={cx('interactive')} ref={interactiveRef}></div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Popover
                    id={id}
                    sx={{ '& .MuiPaper-rounded': { borderRadius: '10px', backgroundImage: 'unset' } }}
                    open={open}
                    anchorEl={ref.current}
                    className={cx('popover')}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <div className={cx('input-container')}>
                        <input
                            ref={inputSearchRef}
                            className={cx('search-input')}
                            autoFocus
                            type="text"
                            placeholder="Tìm kiếm"
                            value={searchValue}
                            onChange={handleSearchQueryChange}
                            onKeyDown={handleKeyDown}
                        />
                        <div className={cx('search-btn-w-bg')} ref={btnContainerRef}>
                            <button className={cx('search-btn')} onClick={() => handleSearch()}>
                                <SearchIcon />
                            </button>
                            <div className={cx('gradient-bg')}>
                                <svg xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <filter id="goo">
                                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                                            <feColorMatrix
                                                in="blur"
                                                mode="matrix"
                                                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                                                result="goo"
                                            />
                                            <feBlend in="SourceGraphic" in2="goo" />
                                        </filter>
                                    </defs>
                                </svg>
                                <div className={cx('gradients-container')}>
                                    <div className={cx('g1')}></div>
                                    <div className={cx('g2')}></div>
                                    <div className={cx('g3')}></div>
                                    <div className={cx('g4')}></div>
                                    <div className={cx('g5')}></div>
                                    <div className={cx('interactive')} ref={interactiveRef}></div>
                                </div>
                            </div>
                        </div>
                        {!!searchValue && (
                            <IconButton className={cx('clear-btn')} size="small" onClick={handleClear}>
                                <ClearIcon />
                            </IconButton>
                        )}
                    </div>
                    {(searchResult.filmsList.length > 0 || searchResult.keywordList.length > 0) && (
                        <div className={cx('search-box')}>
                            {searchResult.keywordList.length > 0 && (
                                <>
                                    <List>
                                        {searchResult.keywordList.map((item, index) => (
                                            <ListItem key={index} disablePadding>
                                                <ListItemButton
                                                    onClick={() => {
                                                        handleSearch(item.content);
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <SearchIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item.content} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                    <Divider />
                                </>
                            )}
                            {searchResult.filmsList.length > 0 && (
                                <>
                                    <h4 className={cx('films-suggest')}>Phim gợi ý</h4>
                                    <List>
                                        {searchResult.filmsList.map((item, index) => (
                                            <ListItem key={index} disablePadding>
                                                <ListItemButton onClick={() => handleFilmReview(item.searchName)}>
                                                    <ListItemAvatar>
                                                        <Avatar alt="film-image" src={item.img} />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={item.name}
                                                        secondary={timePassed(item.updateTime)}
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </>
                            )}
                            {!!searchValueDebounce && (
                                <ListItem disablePadding>
                                    <ListItemButton
                                        component="a"
                                        href={`/search?query=${searchValueDebounce}&type=name`}
                                    >
                                        <ListItemText primary={`Kết quả tìm kiếm của: ${searchValueDebounce}`} />
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </div>
                    )}
                </Popover>
            )}
        </div>
    );
}

export default Search;
