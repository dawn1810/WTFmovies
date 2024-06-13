import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ButtonGroup from '@mui/material/ButtonGroup';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ReviewsIcon from '@mui/icons-material/Reviews';
import CategoryIcon from '@mui/icons-material/Category';
import Chip from '@mui/material/Chip';
import AutocompleteBox from '~/components/FilmManager/EditorDialog/InfoForm/AutoComleteBox/AutoComleteBox';
import { useRouter } from 'next/navigation';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },

}));

export default function CustomizedDialogs({ open, setOpen }: { open: boolean, setOpen: any }) {
    const [nameBtn, setNameBtn] = useState('Tên A-Z');
    const [newBtn, setNewBtn] = useState('Mới nhất');
    const [viewBtn, setViewBtn] = useState('Lượt xem nhiều nhất');
    const [reviewBtn, setReviewBtn] = useState('Đánh giá cao nhất');
    const [valueGenres, setValueGenres] = useState([]);
    const [valueTypeFilm, setTypeFlim] = useState('all');
    const [valueSeasionFilm, setSeasionFlim] = useState('all');
    const [valueYearFilm, setYearFlim] = useState('all');

    const handleClose = () => {
        setOpen(false);
    };
    const handleName = () => {
        setNameBtn(nameBtn === 'Tên A-Z' ? 'Tên Z-A' : 'Tên A-Z');
    }

    const handleNew = () => {
        setNewBtn(newBtn === 'Mới nhất' ? 'Cũ nhất' : 'Mới nhất');
    }
    const handleView = () => {
        setViewBtn(viewBtn === 'Lượt xem nhiều nhất' ? 'Lượt xem ít nhất' : 'Lượt xem nhiều nhất');
    }
    const handleReview = () => {
        setReviewBtn(reviewBtn === 'Đánh giá cao nhất' ? 'Đánh giá thấp nhất' : 'Đánh giá cao nhất');
    }
    const router = useRouter();


    const handleSearch = () => {
        const reDdata: { [key: string]: string } = {
            'Tên A-Z': 'nameDown',
            'Tên Z-A': 'nameUp',
            'Mới nhất': 'newest',
            'Cũ nhất': 'oldest',
            'Lượt xem nhiều nhất': 'mostviews',
            'Lượt xem ít nhất': 'downviews',
            'Đánh giá cao nhất': 'mostreview',
            'Đánh giá thấp nhất': 'downreview',

        }

        const sendDate = {
            sortName: reDdata[nameBtn],
            sortTime: reDdata[newBtn],
            sortView: reDdata[viewBtn],
            sortReview: reDdata[reviewBtn],
            type: valueTypeFilm,
            seasion: valueSeasionFilm,
            year: valueYearFilm,
            genres: valueGenres.map((item: any) => item.id).join(','),
        }

        const queryParams = new URLSearchParams(sendDate);
        const queryString = queryParams.toString();

        router.push(`/search?${queryString}`);
        handleClose();


    }

    return (
        <Fragment>
            <BootstrapDialog
                fullWidth
                maxWidth='lg'
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    MẸO SỬ DỤNG: Sử dụng bộ lọc dưới đây để chọn được bộ phim ưng ý nhất!
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Box sx={{
                        padding: 3, display: 'grid',
                        gap: 2,
                        gridTemplateAreas: `'sort type type sum sum'
                                            'sort genre genre genre genre'
                                            'sort time time time time'
                                            `,
                        alignItems: 'start',

                    }}>
                        <Box sx={{
                            gridArea: 'sort',
                            width: '20%',
                            minWidth: '400px',
                            display: 'flex',
                            padding: 2,
                            borderRadius: '5px',
                            backgroundColor: 'var(--blur-background-color)',
                            flexDirection: 'column',
                            height: '100%',

                            '& > *': {
                                m: 1,
                            },

                        }}>
                            <FormLabel id="demo-radio-buttons-group-label">Sắp xếp theo:</FormLabel>
                            <ButtonGroup sx={{
                                '& .MuiButton-contained': {
                                    justifyContent: 'flex-start',
                                    color: 'var(--text-color)',
                                    borderColor: 'var(--text-color)',
                                    minWidth: '100%',
                                    backgroundColor: 'var(--card-background-color)',

                                },
                                '& .MuiButton-contained:hover': {

                                    backgroundColor: 'var(--highlight-color)',

                                },

                            }} variant="contained" orientation="vertical" aria-label="Vertical button group">
                                <Button startIcon={<AccessTimeIcon />} onClick={handleNew} key="newest">{newBtn}</Button>,
                                <Button startIcon={<SortByAlphaIcon />} onClick={handleName} key="name">{nameBtn}</Button>,
                                <Button startIcon={<VisibilityIcon />} onClick={handleView} key="review">{viewBtn}</Button>,
                                <Button startIcon={<ReviewsIcon />} onClick={handleReview} key="review">{reviewBtn}</Button>,
                            </ButtonGroup>
                        </Box>
                        <Box sx={{
                            gridArea: 'genre', padding: 2,
                            borderRadius: '5px',
                            backgroundColor: 'var(--blur-background-color)',
                            height: '100%',

                        }}>
                            <FormLabel sx={{ mb: 2 }} id="demo-radio-buttons-group-label">Theo thể loại:</FormLabel>

                            <AutocompleteBox
                                notEditor
                                sx={{
                                    minWidth: '230px',
                                }}
                                setValueData={setValueGenres}
                                valueData={valueGenres}
                                id={'genre'}
                                label={'Thể loại'}
                                placeholder={'Chọn thể loại'} />
                        </Box>
                        <Box sx={{
                            gridArea: 'type',
                            padding: 2,
                            borderRadius: '5px',
                            backgroundColor: 'var(--blur-background-color)',
                            height: '100%',

                        }}>

                            <FormControl>

                                <FormLabel id="demo-radio-buttons-group-label">Theo loại:</FormLabel>

                                <RadioGroup
                                    row
                                    onChange={(e) => setTypeFlim(e.target.value)}
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="all"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="all" control={<Radio />} label="Tất cả" />
                                    <FormControlLabel value="le" control={<Radio />} label="Phim lẻ" />
                                    <FormControlLabel value="full" control={<Radio />} label="Phim bộ" />
                                    <FormControlLabel value="done" control={<Radio />} label="Hoàn thành" />
                                    <FormControlLabel value="doing" control={<Radio />} label="Đang ra" />
                                    <FormControlLabel value="going" control={<Radio />} label="Sắp chiếu" />

                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box sx={{
                            gridArea: 'sum',
                            padding: 2,
                            borderRadius: '5px',
                            backgroundColor: 'var(--blur-background-color)',
                            height: '100%',
                        }}>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Theo mùa:</FormLabel>
                                <RadioGroup
                                    row
                                    onChange={(e) => setSeasionFlim(e.target.value)}

                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="all"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="all" control={<Radio />} label="Tất cả" />
                                    <FormControlLabel value="string" control={<Radio />} label="Xuân" />
                                    <FormControlLabel value="summer" control={<Radio />} label="Hạ" />
                                    <FormControlLabel value="fall" control={<Radio />} label="Thu" />
                                    <FormControlLabel value="winter" control={<Radio />} label="Đông" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box sx={{
                            gridArea: 'time',
                            padding: 2,
                            borderRadius: '5px',
                            backgroundColor: 'var(--blur-background-color)',
                            height: '100%',

                        }}>

                            <FormControl>

                                <FormLabel id="demo-radio-buttons-group-label">Theo năm sản xuất:</FormLabel>

                                <RadioGroup
                                    row
                                    onChange={(e) => setYearFlim(e.target.value)}

                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="all"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="all" control={<Radio />} label="Tất cả" />
                                    {Array.from({ length: new Date().getFullYear() - 2011 + 1 }, (_, i) => new Date().getFullYear() - i).map((item) => (
                                        <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
                                    ))}
                                    <FormControlLabel key={'old'} value={'old'} control={<Radio />} label='Cũ hơn' />

                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: 'var(--text-color)' }} autoFocus onClick={handleSearch}>
                        Tìm kiếm theo bộ lọc
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </Fragment >
    );
}
