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
import { useDispatch } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import { showNotify } from '~/components/Notify/notifySlide';
import { useMovieForm } from './useMovieForm';
import { TabPanel } from './TabPanel';
import { AlertColor } from '@mui/material';
import SubInfoForm from './SubInfoForm';

interface MovieFormProps {
    dataGrid: any;
    setDataGrid: any;
    defaultValue?: any;
    tags: any;
    countrys: any;
    film_id: string;
    isOpen: boolean;
    handleClose: () => any;
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
}: MovieFormProps) {
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {
        statusMovies,
        valueAuthors,
        setValueAuthors,
        valueGenres,
        setValueGenres,
        valueDirectors,
        setValueDirectors,
        valueActors,
        setValueActors,
        valueTag,
        setvValueTag,
        valueCountry,
        setValueCountry,
        sumaryMovie,
        setSumaryMovie,
        titleMovie,
        setTitleMovie,
        year,
        setYear,
        maxEp,
        setMaxEp,
        duration,
        setDuration,
        valueStatus,
        setValueStatus,
        imgMovie,
        setImgMovie,
        imgBannerMovie,
        setImgBannerMovie,
        cropResultBanner,
        setCropResultBanner,
        cropResult,
        setCropResult,
        listEpisodeTiktok,
        setListEpisodeTiktok,
        listEpisodeYoutube,
        setListEpisodeYoutube,
        sendInfo,
        lichchieu,
        setLichchieu,
        watchPercentage,
        setWatchPercentage,
        notify,
        setNotify,
    } = useMovieForm({
        defaultValue,
        tags,
        countrys,
        film_id,
        handleClose,
        setLoading,
        showAlert: (content: string, type: AlertColor) => {
            dispatch(showNotify({ content, type, open: true }));
        },
    });

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
                            <Tab icon={<ListAltIcon />} iconPosition="start" label="Thông tin phụ" wrapped />
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
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <EpForm
                        listEpisodeTiktok={listEpisodeTiktok}
                        setListEpisodeTiktok={setListEpisodeTiktok}
                        listEpisodeYoutube={listEpisodeYoutube}
                        setListEpisodeYoutube={setListEpisodeYoutube}
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <SubInfoForm
                        notify={notify}
                        setNotify={setNotify}
                        lichchieu={lichchieu}
                        setLichchieu={setLichchieu}
                        watchPercentage={watchPercentage}
                        setWatchPercentage={setWatchPercentage}
                    />
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
