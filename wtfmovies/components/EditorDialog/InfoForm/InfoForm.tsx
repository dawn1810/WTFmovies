import ImageDropzone from '../ImageDropzone';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import AutocompleteBox from './AutoComleteBox/AutoComleteBox';
interface MovieForm {
    defaultValue: any;
    countrys: any[];
    authors: any[];
    genres: any[];
    directors: any[];
    actors: any[];
    tags: any[];
}
export default function InfoForm({ defaultValue, countrys, authors, genres, directors, actors, tags }: MovieForm) {
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
            label: 'Hoàn thành',
        },
        {
            value: 'will',
            label: 'Sắp chiếu',
        },
    ];

    const [valueAuthors, setValueAuthors] = useState(defaultValue.author || []);
    const [valueGenres, setValueGenres] = useState(defaultValue.genre || []);
    const [valueDirectors, setValueDirectors] = useState(defaultValue.director || []);
    const [valueActors, setValueActors] = useState(defaultValue.actor || []);
    const [valueTag, setvValueTag] = useState(defaultValue.tag || '');
    const [valueCountry, setValueCountry] = useState(defaultValue?.country?.[0].value || '');
    const [sumaryMovie, setSumaryMovie] = useState(defaultValue.describe || '');
    const [titleMovie, setTitleMovie] = useState(defaultValue.name || '');
    const [year, setYear] = useState<Dayjs | null>(defaultValue.releaseYear ? dayjs(defaultValue.releaseYear) : null);
    const [maxEp, setMaxEp] = useState(defaultValue.maxEp || undefined);
    const [imgMovie, setImgMovie] = useState(defaultValue.img || undefined);
    const [imgBannerMovie, setImgBannerMovie] = useState(defaultValue.poster || undefined);

    const [duration, setDuration] = useState<Dayjs | null>(
        defaultValue.duration ? dayjs().startOf('year').add(defaultValue.duration, 'seconds') : null,
    );
    const [valueStatus, setValueStatus] = useState(
        statusMovies.find((item) => item.label === defaultValue.status)?.value || '',
    );
    const [cropResultBanner, setCropResultBanner] = useState<any>(null);
    const [cropResult, setCropResult] = useState<any>(null);
    return (
        <Box sx={{
            margin: '0 auto',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>

            <ImageDropzone
                cropResult={cropResult}
                setCropResultBanner={setCropResultBanner}
                cropResultBanner={cropResultBanner}
                setCropResult={setCropResult}
                setImageF={setImgMovie}
                setImageBannerF={setImgBannerMovie}
                imageBannerDefault={imgBannerMovie}
                imageDefault={imgMovie}>
            </ImageDropzone>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' },
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
                    }}
                >
                    <TextField
                        required
                        id="movie-title"
                        label="Tựa phim"
                        value={titleMovie}
                        onChange={(event: any) => {
                            setTitleMovie(event.target.value);
                        }}
                    />

                    <TextField
                        required
                        id="movie-sumary"
                        label="Mô tả"
                        multiline
                        rows={12.5}
                        value={sumaryMovie}
                        onChange={(event: any) => {
                            setSumaryMovie(event.target.value);
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',

                        width: '30vw',

                        gap: 1,

                    }}>
                    <AutocompleteBox setValueData={setValueAuthors} listData={authors} valueData={valueAuthors} />
                    {/* <Autocomplete
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
                                <Chip {...getTagProps({ index })} key={option.title} label={option.title} />
                            ))
                        }
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField required {...params} label="Tác giả" placeholder="Chọn tác giả" />
                        )}
                    />
                    <Autocomplete
                        limitTags={1}
                        multiple
                        id="movie-theloai"
                        onChange={(event: any, newValue: any) => {
                            setValueGenres(newValue);
                        }}
                        options={genres.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                        getOptionLabel={(option) => option.title}
                        groupBy={(option) => option.firstLetter}
                        value={valueGenres}
                        isOptionEqualToValue={(option, value) => {
                            return option.title === value.title && option.id === value.id;
                        }}
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => (
                                <Chip {...getTagProps({ index })} key={option.title} label={option.title} />
                            ))
                        }
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField required {...params} label="Thể loại" placeholder="Chọn thể loại" />
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
                                <Chip {...getTagProps({ index })} key={option.title} label={option.title} />
                            ))
                        }
                        groupBy={(option) => option.firstLetter}
                        getOptionLabel={(option) => option.title}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField required {...params} label="Đạo diễn" placeholder="Chọn đạo diễn" />
                        )}
                    /> */}
                    <TextField
                        id="movie-tag"
                        select
                        label="Nhãn"
                        value={valueTag}
                        onChange={(event: any) => {
                            setvValueTag(event.target.value);
                        }}
                    >
                        {tags.map((option) => (
                            <MenuItem key={option.age} value={option.name}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    {/* <Autocomplete
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
                                <Chip {...getTagProps({ index })} key={option.title} label={option.title} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField required {...params} label="Diễn viên" placeholder="Chọn diễn viên" />
                        )}
                    /> */}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: 1,
                    }}
                >
                    <TextField
                        id="movie-kuni"
                        select
                        label="Quốc gia sản xuất"
                        value={valueCountry}
                        onChange={(event: any) => {
                            setValueCountry(event.target.value);
                        }}
                        required
                    >
                        {countrys.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <DatePicker value={year} onChange={(newValue) => setYear(newValue)} label="Năm sản xuất" />

                    <TextField
                        onChange={(event: any) => {
                            event.target.value < 1 ? (event.target.value = 1) : event.target.value;
                            setMaxEp(event.target.value);
                        }}
                        id="outlined-number"
                        label="Tổng số tập"
                        required
                        type="number"
                        value={maxEp}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            inputProps: { min: 1 },
                        }}
                    />
                    <MobileTimePicker
                        value={duration}
                        onChange={(newValue) => setDuration(newValue)}
                        label="Thời lượng"
                        views={['minutes', 'seconds']}
                        format="mm:ss"
                    />

                    <TextField
                        id="movie-status"
                        select
                        required
                        value={valueStatus}
                        onChange={(event: any) => {
                            setValueStatus(event.target.value);
                        }}
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
        </Box>
    );
}
