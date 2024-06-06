import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';

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


import classNames from 'classnames/bind';
import Radio from '@mui/material/Radio';
import DeleteIcon from '@mui/icons-material/Delete';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import Player from '~/components/Player';
import style from './YoutubeUpload.module.scss';
const cx = classNames.bind(style);

import { useState } from 'react';
interface MovieForm {
    defaultValue?: any;
}
import { CloudUpload } from '@mui/icons-material';


export default function InfoForm({ defaultValue }: MovieForm) {
    // console.log(defaultValue);

    const [listEpisode, setListEpisode] = useState<{ link: string; index: number }[]>(defaultValue ? defaultValue : []);
    const [deleteIndex, setDeleteIndex] = useState<number>(0);

    const [episode, setEpisode] = useState(listEpisode.length > 0 ? listEpisode[0].link : '');
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleChange = (event: SelectChangeEvent) => {
        setEpisode(event.target.value);
    };



    return (
        <Box>
            <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={20} />
            </Box>
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
                        justifyContent: 'space-between',
                        gap: 1,
                        position: 'relative'
                    }}
                >
                    <FormControl
                        sx={{
                            m: 1,
                            flexGrow: 1,
                            justifyContent: 'space-between',
                            minWidth: 450,
                        }}
                    >
                        <TextField id="outlined-basic" label="Liên kết danh sách phát" variant="outlined" />
                        <Button
                            component="label"
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUpload />}
                        >
                            Load danh sách phát
                        </Button>
                        <Select
                            key={episode}

                            value={episode}
                            sx={{ display: 'flex', justifyContent: 'space-between' }}
                            label="Chọn tập"
                            onChange={handleChange}
                        >


                            {/* Item list */}
                            {listEpisode &&
                                listEpisode.map((item: { link: string; index: number }) => (
                                    <MenuItem
                                        value={episode}
                                        key={item.index}
                                    >
                                        {item.index}

                                    </MenuItem>
                                ))}
                            {/* {defaultValue && defaultValue.map((item: { link: string, index: 1 }) => <MenuItem key={item.index} value={item.link}>{item.index}</MenuItem>)}
                            <MenuItem value={null}>Thêm tập</MenuItem> */}
                        </Select>

                    </FormControl>




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
                        backgroundColor: '#000',
                    }}
                >
                    <Player isEdior className={cx('uploadPlayer')} key={episode} url={episode}></Player>
                </Box>


            </Box>
        </Box>
    );
}
