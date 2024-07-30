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
import { showNotify } from '~/components/Notify/notifySlide';
import { AlertColor } from '@mui/material';
import { useDispatch } from 'react-redux';
import { cropImage } from '~/libs/clientFunc';
import { FilmInfo } from '~/libs/interfaces';
import LoadingButton from '@mui/lab/LoadingButton';

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
    dataGrid,
    setDataGrid,
    defaultValue,
    tags,
    countrys,
    isOpen,
    film_id,
    handleClose,
}: {
    dataGrid: any;
    setDataGrid: any;
    defaultValue?: any;
    tags: any;
    countrys: any;
    film_id: string;
    isOpen: boolean;
    handleClose: () => any;
}) {
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(false);

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
    const [valueCountry, setValueCountry] = useState(defaultValue?.country?.[0]?.value || '');
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
    const [imgMovie, setImgMovie] = useState(defaultValue.img || undefined);
    const [imgBannerMovie, setImgBannerMovie] = useState(defaultValue.poster || undefined);
    const [cropResultBanner, setCropResultBanner] = useState<any>(null);
    const [cropResult, setCropResult] = useState<any>(null);

    //ep Film
    const [listEpisodeTiktok, setListEpisodeTiktok] = useState<{ link: string; index: number }[]>(
        defaultValue.listEp
            ? defaultValue.listEp
                  .map((item: { link: { Tiktok: any } }) => {
                      if (item.link.Tiktok) {
                          return { ...item, link: item.link.Tiktok };
                      }
                      return;
                  })
                  .filter((item: any) => item !== undefined)
            : [],
    );

    const [listEpisodeYoutube, setListEpisodeYoutube] = useState<{ link: string; index: number }[]>(
        defaultValue.listEp
            ? defaultValue.listEp
                  .map((item: { link: { Youtube: any } }) => {
                      if (item.link.Youtube) {
                          return { ...item, link: item.link.Youtube };
                      }
                      return;
                  })
                  .filter((item: any) => item !== undefined)
            : [],
    );

    //notify
    const dispatch = useDispatch();

    const showAlert = (content: string, type: AlertColor) => {
        dispatch(showNotify({ content, type, open: true }));
    };
    const sendInfo = async () => {
        const min = duration?.minute();
        const sec = duration?.second();
        let timeEp = 0;
        if (
            titleMovie === '' ||
            sumaryMovie === '' ||
            min === undefined ||
            sec === undefined ||
            valueGenres.length === 0 ||
            valueDirectors.length === 0 ||
            valueActors.length === 0 ||
            valueAuthors.length === 0 ||
            valueCountry === '' ||
            valueStatus === '' ||
            year === null ||
            maxEp === undefined ||
            imgMovie === undefined ||
            imgBannerMovie === undefined
        )
            return showAlert('Vui lòng điền đầy đủ thông tin', 'error');
        setLoading(true);

        const dropedImage = await cropImage(imgMovie, cropResult);
        const dropedImageBanner = await cropImage(imgBannerMovie, cropResultBanner);

        timeEp = min * 60 + sec;
        const data = {
            film_id: film_id,
            name: titleMovie,
            describe: sumaryMovie,
            genre: valueGenres.map((item: any) => item.id),
            director: valueDirectors.map((item: any) => item.id),
            actor: valueActors.map((item: any) => item.id),
            author: valueAuthors.map((item: any) => item.id),
            tag: tags.find((item: any) => item.name === valueTag)?._id,
            country: countrys.find((item: any) => item.value === valueCountry)?._id,
            releaseYear: year?.toISOString(),
            maxEp: maxEp,
            duration: timeEp,
            status: statusMovies.find((item) => item.value === valueStatus)?.label,
            listEp: {
                tiktok: listEpisodeTiktok,
                youtube: listEpisodeYoutube,
            },
        };

        const formData = new FormData();
        if (!!dropedImage) formData.append('image', dropedImage);
        if (!!dropedImageBanner) formData.append('imageBanner', dropedImageBanner);

        formData.append('info', JSON.stringify(data));
        const rd = await fetch('/api/v1/editor/addMovies', {
            method: 'POST',
            body: formData,
        });
        const dre: any = await rd.json();

        if (rd.status === 200) {
            showAlert('Thêm phim thành công!', 'success');
            handleAfterAddMovie(dre);
        } else if (rd.status === 500 && dre.error.name === 'MongodbError') {
            showAlert('Cập nhật phim thành công!', 'info');
            handleAfterAddMovie(dre);
        } else showAlert('Thêm phim không thành công!', 'error');

        setLoading(false);
    };

    const handleAfterAddMovie = (data: any) => {
        //add to table
        const convertSecondsToDHMS = (seconds: number) => {
            const days = Math.floor(seconds / (24 * 60 * 60));
            const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
            const minutes = Math.floor((seconds % (60 * 60)) / 60);
            const remainingSeconds = seconds % 60;

            let result = '';
            if (days > 0) {
                result += `${days}d `;
            }
            if (hours > 0) {
                result += `${hours}h `;
            }
            if (minutes > 0) {
                result += `${minutes}m `;
            }
            if (remainingSeconds > 0) {
                result += `${remainingSeconds}s`;
            }

            return result.trim();
        };
        const lisEp = {
            tiktok: listEpisodeTiktok,
            youtube: listEpisodeYoutube,
        };
        const arrays = Object.values(lisEp);
        const lengths = arrays.map((arr: any) => arr.length);
        const maxLength = lengths.reduce((max, length) => Math.max(max, length), 0);
        const proListEp = [];
        for (let index = 0; index < maxLength; index++) {
            proListEp.push({
                index: index + 1,
                link: {
                    Youtube: lisEp.youtube[index]?.link || '',
                    Tiktok: lisEp.tiktok[index]?.link || '',
                },
            });
        }

        const rdata = {
            ...data,
            tag: valueTag,
            actor: valueActors.map((item: any) => item.title),
            author: valueAuthors.map((item: any) => item.title),
            country: [countrys.find((item: any) => item.value === valueCountry)?.label],
            director: valueDirectors.map((item: any) => item.title),
            genre: valueGenres.map((item: any) => item.title),
            listEp: proListEp,
            durationAsString: convertSecondsToDHMS(data.duration),
            id: data.film_id,
            releaseYear: year,
            releaseYearASString: year?.year(),
            maxEpAsString: [maxLength, data.maxEp !== -1 ? data.maxEp : '?'].join(' / ') + ' tập',
            videoType: data.videoType.map((videoType: any) => videoType.title),
        };

        function removeItemsById(arr: any, ids: any) {
            return arr.filter((item: any) => !ids.includes(item.id));
        }

        setDataGrid([...removeItemsById(dataGrid, [rdata.id]), rdata]);

        //reset image
        setCropResult(null);
        setCropResultBanner(null);
        setImgBannerMovie(undefined);
        setImgMovie(undefined);

        //reset info
        setTitleMovie('');
        setSumaryMovie('');
        setValueActors([]);
        setValueAuthors([]);
        setValueDirectors([]);
        setValueGenres([]);
        setValueCountry('');
        setValueStatus('');
        setvValueTag('');
        setYear(null);
        setMaxEp(undefined);
        setDuration(null);

        //reset ep
        setListEpisodeTiktok([]);
        setListEpisodeYoutube([]);

        handleClose();
    };

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

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
                        tags={tags}
                        countrys={countrys}
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
                    <EpForm
                        listEpisodeTiktok={listEpisodeTiktok}
                        setListEpisodeTiktok={setListEpisodeTiktok}
                        listEpisodeYoutube={listEpisodeYoutube}
                        setListEpisodeYoutube={setListEpisodeYoutube}
                    ></EpForm>
                </TabPanel>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>
                        Huỷ
                    </Button>
                    <LoadingButton loading={loading} autoFocus variant="contained" onClick={sendInfo}>
                        Lưu
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </LocalizationProvider>
    );
}
