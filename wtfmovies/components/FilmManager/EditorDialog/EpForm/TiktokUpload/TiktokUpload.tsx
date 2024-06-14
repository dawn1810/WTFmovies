import LinearProgress from '@mui/material/LinearProgress';
import { TextField, styled } from '@mui/material';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import styled from '@mui/material/styled';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { generateUUIDv4 } from '~/libs/clientFunc';
import classNames from 'classnames/bind';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Player from '~/components/Player';
import style from './TiktokUpload.module.scss';
const cx = classNames.bind(style);

import { useState } from 'react';
interface MovieForm {
    listEpisode: { link: string; index: number }[],
    setListEpisode: any;
}
import { CloudUpload } from '@mui/icons-material';
import { AnyARecord } from 'dns';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function InfoForm({ listEpisode, setListEpisode }: MovieForm) {
    // console.log(defaultValue);

    const [deleteIndex, setDeleteIndex] = useState<number>(0);
    const [loading, setLoading] = useState<any>(true);

    const [episode, setEpisode] = useState(listEpisode.length > 0 ? listEpisode[0].link : '');
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleChange = (event: SelectChangeEvent) => {
        if (event.target.value !== 'add-new')
            setEpisode(event.target.value);
    };

    function handleCloseDeleteDialog(event: any): void {
        setOpenDeleteDialog(false);
    }

    function handleConfirmDelete(event: any): void {
        setListEpisode((prevArray: { link: string; index: number }[]) => {
            const updatedArray = prevArray.filter((item) => item.index !== deleteIndex)
                .map((item, index) => ({ ...item, index: index + 1 }));

            return updatedArray;
        });
        setEpisode('');

        handleCloseDeleteDialog(event);
    }
    function handleAddItem(event: any): void {
        const id = generateUUIDv4();

        setListEpisode((prevArray: { link: string; index: number }[]) => [
            ...prevArray,
            { ...prevArray, index: prevArray.length + 1, link: id },
        ]);
        setEpisode(id);
    }

    function handleDeleteItem(index: number) {
        setDeleteIndex(index);
        setOpenDeleteDialog(true);

    }

    const handleClick = (event: any) => {
        if (event.target.value !== 'add-new')
            setEpisode(event.target.value);

    };


    return (
        <Box>

            <Box
                component="form"
                sx={{
                    '& .Muiem-root': { m: 1, width: '100%' },
                    '& #movie-title': {
                        width: '50ch',
                    },
                    '& #movie-sumary': {
                        width: '50ch',
                    },
                    '& .MuiFormHelperText-root': { marginLeft: 0 },
                    display: 'flex',
                    padding: '1rem',
                    alignItems: 'stretch',
                    gap: '2rem',
                    width: '100%',
                }}
                autoComplete="off"
            >

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        justifyContent: 'space-between',
                        gap: 1,
                    }}
                >
                    <FormControl
                        sx={{
                            minWidth: 450,
                        }}
                    >
                        <InputLabel id="demo-simple-select-helper-label">Chọn tập</InputLabel>
                        <Select
                            key={episode}
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={episode}
                            sx={{ display: 'flex', justifyContent: 'space-between' }}
                            label="Chọn tập"
                            onChange={handleChange}
                        >
                            <MenuItem value='add-new'
                                sx={{ padding: 0 }}>
                                <Button sx={{ width: '100%', height: '60px' }} onClick={handleAddItem}>
                                    Thêm
                                </Button>
                            </MenuItem>

                            {/* Item list */}
                            {listEpisode &&
                                listEpisode.map((item: { link: string; index: number }) => (
                                    <MenuItem
                                        value={item.link}
                                        key={item.index}
                                        sx={{ display: 'flex', justifyContent: 'space-between' }}
                                    >
                                        {item.index}
                                        <IconButton onClick={() => handleDeleteItem(item.index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </MenuItem>
                                ))}
                            {/* {defaultValue && defaultValue.map((item: { link: string, index: 1 }) => <MenuItem key={item.index} value={item.link}>{item.index}</MenuItem>)}
                            <MenuItem value={null}>Thêm tập</MenuItem> */}
                        </Select>
                    </FormControl>

                    <TextField id="outlined-basic" label="Liên kết" value={episode} variant="outlined" />

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button target='_blank' href='https://drive.google.com/file/d/1saMoYbp9UMlI0WjNEe5-LLjXUsElFplq/view?usp=sharing' variant="contained" startIcon={<GetAppIcon />}>
                            Tải bộ toolkit
                        </Button>
                        <Button variant="contained" onClick={handleClick} startIcon={<SaveAsIcon />}>
                            Lưu tập
                        </Button>
                        {/* <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUpload />}
                        >
                            Upload file
                            <VisuallyHiddenInput type="file" />
                        </Button> */}
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress variant="query" hidden={loading} />
                        </Box>
                    </Box>

                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '30vw',
                        alignItems: 'center',
                        gap: 1,
                        borderRadius: '5px',
                    }}
                >
                    <Player isEdior className={cx('uploadPlayer')} key={episode} url={episode + '?.m3u8'} numEp={0} maxEp={0}></Player>
                </Box>

                {/* Delete confirmation dialog */}
                <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                    <DialogTitle>Xoá tập</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Bạn có chắc chắn xoá?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                        <Button onClick={handleConfirmDelete}>Delete</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}
