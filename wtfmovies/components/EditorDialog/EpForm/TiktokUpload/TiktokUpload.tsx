import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material';

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

import classNames from 'classnames/bind';
import DeleteIcon from '@mui/icons-material/Delete';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import Player from '~/components/Player';
import style from './TiktokUpload.module.scss';
const cx = classNames.bind(style);

import { useState } from 'react';
interface MovieForm {
    defaultValue?: any;
}
import { CloudUpload } from '@mui/icons-material';

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

export default function InfoForm({ defaultValue }: MovieForm) {
    // console.log(defaultValue);

    const [listEpisode, setListEpisode] = useState<{ link: string; index: number }[]>(defaultValue ? defaultValue.map((item: { link: { Tiktok: any; }; }) => ({ ...item, link: item.link.Tiktok })) : []);
    const [deleteIndex, setDeleteIndex] = useState<number>(0);

    const [episode, setEpisode] = useState(listEpisode.length > 0 ? listEpisode[0].link : '');
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleChange = (event: SelectChangeEvent) => {
        setEpisode(event.target.value);
    };

    function handleCloseDeleteDialog(event: any): void {
        setOpenDeleteDialog(false);
    }

    function handleConfirmDelete(event: any): void {
        setListEpisode((prevArray: { link: string; index: number }[]) => {
            const updatedArray = prevArray.filter((item) => item.index !== deleteIndex);
            console.log(deleteIndex, updatedArray);

            return updatedArray;
        });
        console.log('delelte');
        handleCloseDeleteDialog(event);
    }
    function handleAddItem(event: any): void {
        setListEpisode((prevArray: { link: string; index: number }[]) => [
            ...prevArray,
            { link: 'https://rurimeiko.pages.dev/dadada.m3u8', index: prevArray.length + 1 },
        ]);
        setEpisode('https://rurimeiko.pages.dev/dadada.m3u8');
    }

    function handleItemChange(e: any, index: number) { }
    function handleDeleteItem(index: number) {
        setDeleteIndex(index);
        setOpenDeleteDialog(true);

        setEpisode('');
    }

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
                    gap: '1rem',
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
                            <MenuItem sx={{ padding: 0 }}>
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


                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUpload />}
                        >
                            Upload file
                            <VisuallyHiddenInput type="file" />
                        </Button>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress variant="determinate" value={20} />
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
                    <Player isEdior className={cx('uploadPlayer')} key={episode} url={episode + '?.m3u8'}></Player>
                </Box>

                {/* Delete confirmation dialog */}
                <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                    <DialogTitle>Delete Item</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Are you sure you want to delete this item?</DialogContentText>
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
