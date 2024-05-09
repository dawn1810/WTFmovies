import React, { useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { DatePicker, LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ListAltIcon from '@mui/icons-material/ListAlt';
import Chip from '@mui/material/Chip';
import { Input, Button, AppBar, Tabs, Box, Tab, Dialog, Autocomplete, IconButton, MenuItem, TextField, Toolbar, } from "@mui/material";
import ImageUpload from './ImageUpload';



function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (

        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{
                    p: 3, alignItems: "center",
                    justifyContent: "center",
                }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>

    );
}
export function MovieForm({ countrys, authors, genres, directors, actors, tags, isOpen, handleClose }: { countrys: any[], authors: any[], genres: any[], directors: any[], actors: any[], tags: any[], isOpen: boolean, handleClose: () => any }) {
    const statusMovies = [
        {
            value: 'going',
            label: 'Đang ra',
        },
        {
            value: 'pause',
            label: 'Tạm dừng',
        },
        {
            value: 'done',
            label: 'Kết thúc',
        },
        {
            value: 'will',
            label: 'Sắp chiếu',
        },
    ];

    const [value, setValue] = useState(0);
    const [valueAuthors, setValueAuthors] = React.useState([]);
    const [valueGenres, setValueGenres] = React.useState([]);
    const [valueDirectors, setValueDirectors] = React.useState([]);
    const [valueActors, setValueActors] = React.useState([]);
    const [valueAuto, setvalueAutof] = React.useState('');


    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Dialog maxWidth={'xl'} open={isOpen} onClose={handleClose}>
                <AppBar position="static" >
                    <Toolbar >
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            centered
                        >
                            <Tab icon={<InfoIcon />} iconPosition="start" label="Thông tin cơ bản" wrapped />
                            <Tab icon={<ListAltIcon />} iconPosition="start" label="Thông tin tập phim" wrapped />
                        </Tabs>

                    </Toolbar>

                </AppBar>
                <TabPanel value={value} index={0} >
                    <Box sx={{
                        margin: '0 auto',
                        padding: '1rem',
                        height: '100%',
                        display: 'flex'
                    }}>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1 },
                                '& #movie-title': {
                                    width: '50ch'
                                },
                                '& #movie-sumary': {
                                    width: '50ch',
                                },
                                '& .MuiFormHelperText-root': { marginLeft: 0 },
                                display: 'flex',
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
                                <TextField
                                    required
                                    id="movie-title"
                                    label="Tựa phim"
                                    defaultValue=""
                                />


                                <TextField
                                    required
                                    id="movie-sumary"
                                    label="Mô tả"
                                    multiline
                                    rows={12.5}
                                    defaultValue=""
                                />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',

                                width: '30vw',

                                gap: 1,

                            }}>

                                <Autocomplete
                                    limitTags={1}
                                    multiple
                                    id="movie-tacgia"
                                    onChange={(event: any, newValue: any) => {
                                        setValueAuthors(newValue);
                                    }}
                                    options={authors.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                    getOptionLabel={(option) => option.title}
                                    groupBy={(option) => option.firstLetter}
                                    value={valueAuthors}
                                    isOptionEqualToValue={(option, value) => {
                                        return option.title === value.title && option.id === value.id;
                                    }}
                                    renderTags={(tagValue, getTagProps) =>
                                        tagValue.map((option, index) => (
                                            <Chip
                                                {...getTagProps({ index })}
                                                key={option.title}
                                                label={option.title}
                                            />
                                        ))
                                    }
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                        <TextField
                                            required
                                            {...params}
                                            label="Tác giả"
                                            placeholder="Chọn tác giả"
                                        />
                                    )}
                                />
                                <Autocomplete
                                    limitTags={1}
                                    multiple
                                    id="movie-theloai"
                                    onChange={(event: any, newValue: any) => {
                                        setValueGenres(newValue);

                                    }} options={genres.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                    getOptionLabel={(option) => option.title}
                                    groupBy={(option) => option.firstLetter}
                                    value={valueGenres}
                                    isOptionEqualToValue={(option, value) => {
                                        return option.title === value.title && option.id === value.id;
                                    }}
                                    renderTags={(tagValue, getTagProps) =>
                                        tagValue.map((option, index) => (
                                            <Chip
                                                {...getTagProps({ index })}
                                                key={option.title}
                                                label={option.title}
                                            />
                                        ))
                                    }

                                    filterSelectedOptions
                                    renderInput={(params) => (
                                        <TextField
                                            required
                                            {...params}
                                            label="Thể loại"
                                            placeholder="Chọn thể loại"
                                        />
                                    )}
                                />
                                <Autocomplete
                                    limitTags={1}

                                    multiple
                                    id="movie-daodien"
                                    onChange={(event: any, newValue: any) => {
                                        setValueDirectors(newValue);

                                    }}
                                    options={directors.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                    value={valueDirectors}
                                    isOptionEqualToValue={(option, value) => {
                                        return option.title === value.title && option.id === value.id;
                                    }}
                                    renderTags={(tagValue, getTagProps) =>
                                        tagValue.map((option, index) => (
                                            <Chip
                                                {...getTagProps({ index })}
                                                key={option.title}
                                                label={option.title}
                                            />
                                        ))
                                    }
                                    groupBy={(option) => option.firstLetter}
                                    getOptionLabel={(option) => option.title}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                        <TextField
                                            required
                                            {...params}
                                            label="Đạo diễn"
                                            placeholder="Chọn đạo diễn"
                                        />
                                    )}
                                />
                                <TextField
                                    id="movie-tag"
                                    select
                                    label="Nhãn"
                                    required
                                    value={valueAuto}
                                >
                                    {statusMovies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Autocomplete
                                    multiple
                                    limitTags={1}
                                    autoSelect
                                    id="movie-actor"
                                    onChange={(event: any, newValue: any) => {
                                        setValueActors(newValue);

                                    }}
                                    value={valueActors}
                                    options={actors.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                    groupBy={(option) => option.firstLetter}
                                    getOptionLabel={(option) => option.title}
                                    filterSelectedOptions
                                    isOptionEqualToValue={(option, value) => {
                                        return option.title === value.title && option.id === value.id;
                                    }}
                                    renderTags={(tagValue, getTagProps) =>
                                        tagValue.map((option, index) => (
                                            <Chip
                                                {...getTagProps({ index })}
                                                key={option.title}
                                                label={option.title}
                                            />
                                        ))
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            required
                                            {...params}
                                            label="Diễn viên"
                                            placeholder="Chọn diễn viên"
                                        />
                                    )}
                                />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                gap: 1,

                            }}>


                                <TextField
                                    id="movie-kuni"
                                    select
                                    label="Quốc gia sản xuất"
                                    value={valueAuto}
                                    required
                                >
                                    {countrys.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <DatePicker label="Năm sản xuất" />

                                <TextField
                                    id="outlined-number"
                                    label="Tổng số tập"
                                    required
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <MobileTimePicker label="Thời lượng" views={['minutes', 'seconds']} format="mm:ss" />

                                <TextField
                                    id="movie-status"
                                    select
                                    required
                                    value={valueAuto}
                                    label="Trạng thái"

                                >
                                    {statusMovies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                            </Box>
                        </Box>
                        <ImageUpload></ImageUpload>
                    </Box>

                </TabPanel>
                <TabPanel value={value} index={1}>
                </TabPanel>
                <DialogActions>
                    <Button autoFocus variant="contained" onClick={handleClose}>
                        Huỷ
                    </Button>
                    <Button autoFocus variant="contained" onClick={handleClose}>
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
        </LocalizationProvider>
    );
}