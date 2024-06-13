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
    const [valueGenres, setValueGenres] = useState([]);

    const [viewBtn, setViewBtn] = useState('Lượt xem nhiều nhất');
    const [reviewBtn, setReviewBtn] = useState('Đánh giá cao nhất');
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
    return (
        <Fragment>
            <BootstrapDialog
                fullWidth
                maxWidth='xl'
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Bộ lọc
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
                        gridTemplateAreas: `'sort type type sum sum'
                                            'sort genre genre genre genre'
                                            'sort time time time time'
                                            `
                    }}>
                        <Box sx={{
                            gridArea: 'sort',
                            width: '20%',
                            minWidth: '230px',
                            display: 'flex',
                            flexDirection: 'column',
                            '& > *': {
                                m: 1,
                            },

                        }}>
                            <Chip icon={<CategoryIcon />} label="Sắp xếp theo" variant="outlined" />                        <ButtonGroup sx={{
                                '& .MuiButton-contained': {
                                    justifyContent: 'flex-start',
                                    backgroundColor: 'var(--card-background-color)',
                                    color: 'var(--text-color)',
                                    borderColor: 'var(--text-color)',
                                    minWidth: '100%',
                                }
                            }} variant="contained" orientation="vertical" aria-label="Vertical button group">
                                <Button startIcon={<AccessTimeIcon />} onClick={handleNew} key="newest">{newBtn}</Button>,
                                <Button startIcon={<SortByAlphaIcon />} onClick={handleName} key="name">{nameBtn}</Button>,
                                <Button startIcon={<VisibilityIcon />} onClick={handleView} key="review">{viewBtn}</Button>,
                                <Button startIcon={<ReviewsIcon />} onClick={handleReview} key="review">{reviewBtn}</Button>,

                            </ButtonGroup>
                        </Box>
                        <Box>
                            <AutocompleteBox
                                notEditor
                                setValueData={setValueGenres}
                                valueData={valueGenres}
                                id={'genre'}
                                label={'Thể loại'}
                                placeholder={'Chọn thể loại'} />
                        </Box>
                        <Box sx={{
                            gridArea: 'sum',

                        }}>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Loại</FormLabel>
                                <RadioGroup
                                    row
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
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: 'var(--text-color)' }} autoFocus onClick={handleClose}>
                        Tìm kiếm theo bộ lọc
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </Fragment>
    );
}
