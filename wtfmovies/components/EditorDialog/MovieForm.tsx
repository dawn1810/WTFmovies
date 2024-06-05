import { useState } from 'react';
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
import { AlertColor } from '@mui/material';

import { changeNotifyContent, changeNotifyOpen, changeNotifyType } from '~/redux/actions';
import { useDispatch } from 'react-redux';
import InfoForm from './InfoForm';
import EpForm from './EpForm';

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
    countrys,
    authors,
    genres,
    directors,
    actors,
    tags,
    isOpen,
    handleClose,
}: {
    defaultValue?: any;
    countrys: any[];
    authors: any[];
    genres: any[];
    directors: any[];
    actors: any[];
    tags: any[];
    isOpen: boolean;
    handleClose: () => any;
}) {
    const dispatch = useDispatch();

    const showAlert = (content: string, type: AlertColor) => {
        dispatch(changeNotifyContent(content));
        dispatch(changeNotifyType(type));
        dispatch(changeNotifyOpen(true));
    };

    const [value, setValue] = useState(0);

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
                        defaultValue={defaultValue}
                        countrys={countrys}
                        authors={authors}
                        genres={genres}
                        directors={directors}
                        actors={actors}
                        tags={tags}
                        cropResult={cropResult}
                        setCropResultBanner={setCropResultBanner}
                        cropResultBanner={cropResultBanner}
                        setCropResult={setCropResult}
                        setImgMovie={setImgMovie}
                        setImgBannerMovie={setImgBannerMovie}
                        imgBannerMovie={imgBannerMovie}
                        imgMovie={imgMovie}
                    ></InfoForm>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <EpForm defaultValue={defaultValue.listEp}></EpForm>
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
