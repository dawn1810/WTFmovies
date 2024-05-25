import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, TextField, styled } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import style from './EpForm.module.scss';
const cx = classNames.bind(style);

import { useState } from 'react';
interface MovieForm {
    defaultValue: any,
}
import { CloudUpload } from '@mui/icons-material';
import Player from "~/components/Player";
import classNames from "classnames";

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


    const [episode, setEpisode] = useState('');
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
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={episode}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <FormHelperText>With label + helper text</FormHelperText>
                </FormControl>


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
                justifyContent: 'space-between',

                width: '30vw',

                gap: 1,

            }}>
                {/* <Player className={cx('uploadPlayer')} url={'https://rurimeiko.pages.dev/dadada.m3u8'}></Player> */}

            </Box>
        </Box>
    )
}
