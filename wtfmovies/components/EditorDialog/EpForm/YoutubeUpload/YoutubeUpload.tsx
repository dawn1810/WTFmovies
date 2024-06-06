import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import classNames from 'classnames/bind';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import Player from '~/components/Player';
import style from './YoutubeUpload.module.scss';
const cx = classNames.bind(style);

import { useState } from 'react';
interface MovieForm {
    defaultValue?: any;
}
import { CloudUpload } from '@mui/icons-material';
import InputLabel from '@mui/material/InputLabel';


export default function InfoForm({ defaultValue }: MovieForm) {
    // console.log(defaultValue);

    const [listEpisode, setListEpisode] = useState<{ link: string; index: number }[]>(defaultValue ? defaultValue : []);

    const [episode, setEpisode] = useState(listEpisode.length > 0 ? listEpisode[0].link : '');

    const handleChange = (event: SelectChangeEvent) => {
        console.log(event.target.value);

        setEpisode(event.target.value);
    };



    return (
        <Box>
            <Box sx={{ width: '100%' }}>
                <LinearProgress variant="indeterminate" value={0} />
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
                    <Box sx={{ minWidth: 450, p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                        <TextField id="outlined-basic" label="Liên kết danh sách phát" variant="outlined" />

                        <FormControl fullWidth

                        >

                            <InputLabel id="demo-simple-select-label">Chọn tập</InputLabel>

                            <Select
                                key={episode}
                                labelId="demo-simple-select-label"
                                value={episode}
                                label="Chọn tập"
                                onChange={handleChange}
                            >


                                {listEpisode &&
                                    listEpisode.map((item: { link: string; index: number }) => (
                                        <MenuItem
                                            value={item.link}
                                            key={item.index}
                                        >
                                            {item.index}

                                        </MenuItem>
                                    ))}

                            </Select>

                        </FormControl>
                        <Button
                            component="label"
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUpload />}
                        >
                            Load danh sách phát
                        </Button>
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
                    <Player isEdior className={cx('uploadPlayer')} key={episode} url={episode}></Player>
                </Box>


            </Box>
        </Box>
    );
}
