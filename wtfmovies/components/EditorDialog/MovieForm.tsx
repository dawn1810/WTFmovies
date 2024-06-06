import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import InfoForm from './InfoForm';
import EpForm from './EpForm';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { describe } from 'node:test';
import { auth } from '~/app/api/auth/[...nextauth]/auth';

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
            {value === index && (
                <Box
                    sx={{
                        p: 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}
export function MovieForm({
    defaultValue,
    tags,
    countrys,
    isOpen,
    handleClose,
}: {
    defaultValue?: any;
    tags: any;
    countrys: any;
    isOpen: boolean;
    handleClose: () => any;

}) {

    ///infoFilm
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


    const [value, setValue] = useState(0);

    const sendInfo = () => {
        const min = duration?.minute();
        const sec = duration?.second();
        let timeEp = 0;
        if (min === undefined || sec === undefined)
            return;
        timeEp = min * 60 + sec;
        const data = {
            name: titleMovie,
            describe: sumaryMovie,
            genre: valueGenres.map((item: any) => item.id),
            director: valueDirectors.map((item: any) => item.id),
            actor: valueActors.map((item: any) => item.id),
            author: valueAuthors.map((item: any) => item.id),
            tag: tags.find((item: any) => item.name === valueTag)?._id,
            country: countrys.find((item: any) => item.value === valueCountry)?._id,
            releaseYear: year?.year(),
            maxEp: maxEp,
            duration: timeEp,
            status: statusMovies.find((item) => item.value === valueStatus)?.label,
            img: imgMovie,
            poster: imgBannerMovie,
            listEp: []
        }

        console.log(data);

    }
    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };
    const [imgMovie, setImgMovie] = useState(defaultValue.img || undefined);
    const [imgBannerMovie, setImgBannerMovie] = useState(defaultValue.poster || undefined);
    const [cropResultBanner, setCropResultBanner] = useState<any>(null);
    const [cropResult, setCropResult] = useState<any>(null);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Dialog maxWidth={'xl'} open={isOpen} onClose={() => (handleClose(), setValue(0))}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Tabs value={value} onChange={handleChange} centered>
                            <Tab icon={<InfoIcon />} iconPosition="start" label="Thông tin cơ bản" wrapped />
                            <Tab icon={<ListAltIcon />} iconPosition="start" label="Thông tin tập phim" wrapped />
                        </Tabs>
                    </Toolbar>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <InfoForm

                        cropResult={cropResult}
                        setCropResultBanner={setCropResultBanner}
                        cropResultBanner={cropResultBanner}
                        setCropResult={setCropResult}
                        setImgMovie={setImgMovie}
                        setImgBannerMovie={setImgBannerMovie}
                        imgBannerMovie={imgBannerMovie}
                        imgMovie={imgMovie}
                        tags={tags} countrys={countrys}
                        statusMovies={statusMovies}
                        setValueStatus={setValueStatus}
                        valueStatus={valueStatus}
                        titleMovie={titleMovie}
                        setTitleMovie={setTitleMovie}
                        valueAuthors={valueAuthors}
                        setValueAuthors={setValueAuthors}
                        valueGenres={valueGenres}
                        setValueGenres={setValueGenres}
                        duration={duration}
                        setDuration={setDuration}
                        maxEp={maxEp}
                        setMaxEp={setMaxEp}
                        year={year}
                        setYear={setYear}
                        valueCountry={valueCountry}
                        setValueCountry={setValueCountry}
                        valueTag={valueTag}
                        setvValueTag={setvValueTag}
                        valueActors={valueActors}
                        setValueActors={setValueActors}
                        valueDirectors={valueDirectors}
                        setValueDirectors={setValueDirectors}
                        sumaryMovie={sumaryMovie}
                        setSumaryMovie={setSumaryMovie}
                    ></InfoForm>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <EpForm defaultValue={defaultValue.listEp}></EpForm>
                </TabPanel>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose}>
                        Huỷ
                    </Button>
                    <Button autoFocus variant="contained" onClick={() => { handleClose(); sendInfo() }}>
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
        </LocalizationProvider>
    );
}
