import ImageDropzone from '../ImageDropzone';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useState, useMemo } from 'react';
import AutocompleteBox from './AutoComleteBox/AutoComleteBox';
interface MovieForm {
    defaultValue: any;
    countrys: any[];
    authors: any[];
    genres: any[];
    directors: any[];
    actors: any[];
    tags: any[];
    cropResult: any[];
    setCropResultBanner: any;
    cropResultBanner: any[];
    setCropResult: any;
    setImgMovie: any;
    setImgBannerMovie: any;
    imgBannerMovie: string;
    imgMovie: string;
}
export default function InfoForm({ defaultValue,
    countrys, authors, genres,
    directors, actors, tags,
    cropResult,
    setCropResultBanner,
    cropResultBanner,
    setCropResult,
    setImgMovie,
    setImgBannerMovie,
    imgBannerMovie,
    imgMovie,
}: MovieForm) {
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


    const [duration, setDuration] = useState<Dayjs | null>(
        defaultValue.duration ? dayjs().startOf('year').add(defaultValue.duration, 'seconds') : null,
    );
    const [valueStatus, setValueStatus] = useState(
        statusMovies.find((item) => item.label === defaultValue.status)?.value || '',
    );

    return (
        <Box sx={{
            margin: '0 auto',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {useMemo(() => (<ImageDropzone
                cropResult={cropResult}
                setCropResultBanner={setCropResultBanner}
                cropResultBanner={cropResultBanner}
                setCropResult={setCropResult}
                setImageF={setImgMovie}
                setImageBannerF={setImgBannerMovie}
                imageBannerDefault={imgBannerMovie}
                imageDefault={imgMovie}>
            </ImageDropzone>), [cropResult, cropResultBanner, imgBannerMovie, imgMovie])}

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
                    <AutocompleteBox
                        setValueData={setValueAuthors}
                        listData={authors}
                        valueData={valueAuthors}
                        id={'movie-tacgia'}
                        label={'Tác giả'}
                        placeholder={'Chọn tác giả'} />
                    {/* <AutocompleteBox setValueData={setValueAuthors} listData={authors} valueData={valueAuthors} /> */}
                    <AutocompleteBox
                        setValueData={setValueGenres}
                        listData={genres}
                        valueData={valueGenres}
                        id={'movie-theloai'}
                        label={'Thể loại'}
                        placeholder={'Chọn thể loại'} />
                    <AutocompleteBox
                        setValueData={setValueDirectors}
                        listData={directors}
                        valueData={valueDirectors}
                        id={'movie-daodien'}
                        label={'Đạo diễn'}
                        placeholder={'Chọn đạo diễn'} />
                    <AutocompleteBox
                        setValueData={setValueActors}
                        listData={actors}
                        valueData={valueActors}
                        id={'movie-actor'}
                        label={'Diễn viên'}
                        placeholder={'Chọn diễn viên'} />
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
