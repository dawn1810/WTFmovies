import { Box, Button, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, RadioGroup, TextField, styled } from "@mui/material";
import classNames from 'classnames/bind';
import Radio from '@mui/material/Radio';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import Player from "~/components/Player";
import style from './EpForm.module.scss';
const cx = classNames.bind(style);

import { useState } from 'react';
interface MovieForm {
    defaultValue: any,
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
    console.log(defaultValue);


    const [episode, setEpisode] = useState(defaultValue[0].link);
    const handleChange = (event: SelectChangeEvent) => {
        setEpisode(event.target.value);
    };


    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '100%' },
                '& #movie-title': {
                    width: '50ch'
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
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 1,

            }}>
                <FormControl sx={{
                    m: 1, minWidth: 450

                }}>
                    <InputLabel id="demo-simple-select-helper-label">Chọn tập</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={episode}
                        label="Chọn tập"
                        onChange={handleChange}
                    >
                        {defaultValue.map((item: { link: string, index: 1 }) => <MenuItem key={item.index} value={item.link}>{item.index}</MenuItem>)}
                    </Select>
                </FormControl>

                <RadioGroup sx={{ display: 'flex', flexDirection: 'row' }} name="use-radio-group" defaultValue="sub">
                    <FormControlLabel value="sub" control={<Radio />} label="Subs" />
                    <FormControlLabel value="tm" control={<Radio />} label="Thuyết minh" />

                </RadioGroup>
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
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '30vw',
                alignItems: 'center',
                gap: 1,

            }}>
                <Player isMobile className={cx('uploadPlayer')} key={episode} url={episode + '?.m3u8'}></Player>

            </Box>
        </Box>
    )
}
