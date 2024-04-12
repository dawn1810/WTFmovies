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

export default function MyDialogWithTabs() {
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
    const kuniMovies = [
        {
            value: 'jp',
            label: 'Nhật bản',
        },
        {
            value: 'en',
            label: 'Anh',
        },
        {
            value: 'cn',
            label: 'Trung quốc',
        },
    ];
    const options = [
        { title: "Movie 1", year: 2020, firstLetter: "M" },
        { title: "Movie 2", year: 2021, firstLetter: "M" },
        { title: "Movie 4", year: 2021, firstLetter: "M" },
        { title: "Movied", year: 2021, firstLetter: "M" },


    ];
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [valueAuto, setvalueAutof] = React.useState([options[0]]);


    //============
    const [selectedImage, setSelectedImage] = useState<string>('');

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
    };

    const handleUploadClick = () => {
        // Handle upload logic here
        // You can access the selected image using the 'selectedImage' state
    };
    //==============
    const handleChangeAuto = (event: any, newValue: any) => {
        console.log(valueAuto);
        setvalueAutof(newValue);

    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };





    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open dialog
            </Button>
            <Dialog maxWidth={'xl'} open={open} onClose={handleClose}>
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
                                    defaultValue="Rabit hole"
                                />


                                <TextField

                                    required
                                    id="movie-sumary"
                                    label="Mô tả"
                                    multiline
                                    rows={12.5}
                                    defaultValue="Rabit hole Rabit hole Rabit hole Rabit hole Rabit hole Rabit hole Rabit hole Rabit hole Rabit hole Rabit hole Rabit hole Rabit hole Rabit hole Rabit hole Rabit hole Rabit hole Rabit hole Rabit hole Rabit hole Rabit hole Rabit hole"
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
                                    limitTags={2}

                                    multiple
                                    id="movie-tacgia"
                                    onChange={handleChangeAuto}
                                    options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                    getOptionLabel={(option) => option.title}
                                    groupBy={(option) => option.firstLetter}
                                    value={valueAuto}
                                    isOptionEqualToValue={(option, value) => {
                                        return option.title === value.title && option.year === value.year;
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
                                    limitTags={2}

                                    multiple
                                    id="movie-theloai"
                                    onChange={handleChangeAuto}
                                    options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                    getOptionLabel={(option) => option.title}
                                    groupBy={(option) => option.firstLetter}
                                    value={valueAuto}
                                    isOptionEqualToValue={(option, value) => {
                                        return option.title === value.title && option.year === value.year;
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
                                    limitTags={2}

                                    multiple
                                    id="movie-daodien"
                                    onChange={handleChangeAuto}

                                    options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                    value={valueAuto}
                                    isOptionEqualToValue={(option, value) => {
                                        return option.title === value.title && option.year === value.year;
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
                                <Autocomplete
                                    multiple
                                    limitTags={2}

                                    id="movie-lang"
                                    options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                    onChange={handleChangeAuto}
                                    value={valueAuto}
                                    isOptionEqualToValue={(option, value) => {
                                        return option.title === value.title && option.year === value.year;
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
                                            label="Ngôn ngữ"
                                            placeholder="Chọn ngôn ngữ"
                                        />
                                    )}
                                />
                                <Autocomplete
                                    multiple
                                    limitTags={2}

                                    autoSelect
                                    id="movie-actor"
                                    onChange={handleChangeAuto}
                                    value={valueAuto}
                                    options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                    groupBy={(option) => option.firstLetter}
                                    getOptionLabel={(option) => option.title}
                                    filterSelectedOptions
                                    isOptionEqualToValue={(option, value) => {
                                        return option.title === value.title && option.year === value.year;
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
                                    value={undefined}
                                // helperText="Please select your currency"
                                >
                                    {kuniMovies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <DatePicker label="Năm sản xuất" />
                                <TextField
                                    id="movie-tag"
                                    select
                                    label="Nhãn"
                                    value={undefined}
                                // helperText="Please select your currency"
                                >
                                    {statusMovies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <MobileTimePicker label="Thời lượng" views={['minutes', 'seconds']} format="mm:ss" />
                                <TextField
                                    id="movie-status"
                                    select
                                    label="Trạng thái"
                                // defaultValue="EUR"
                                // helperText="Please select your currency"
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