import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
//import { AlertColor } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close';

import style from '../Table.module.scss';
import { showNotify } from '~/components/Notify/notifySlide';
import ImageDropzone from '~/components/FilmManager/EditorDialog/ImageDropzone';
import AutoComleteBox from './AutoComleteBox';
import { Box } from '@mui/material';
const cx = classNames.bind(style);


function CurrentDialog({
    open,
    dialogData,
    oldId,
    approveLoading,
    handleClose,
    handleSave,
}: {
    open: boolean;
    dialogData: any;
    oldId: string;
    approveLoading: boolean;
    handleClose: (event: any) => void;
    handleSave: (...any: any) => void;
}) {
    //alert
    const dispatch = useDispatch();

    const showAlert = (content: string, type: any) => {
        dispatch(showNotify({ content, type, open: true }));
    };
    console.log(dialogData);

    const [imgBannerMovie, setImgBannerMovie] = useState(dialogData?.poster || dialogData?.specialPoster);
    const [cropResultBanner, setCropResultBanner] = useState<any>(null);
    const [valueData, setValueData] = useState<any>({
        ...dialogData, id: dialogData?._id,
        title: dialogData?.film_name,
        banner: dialogData?.poster || dialogData?.specialPoster,
        firstLetter: dialogData?.film_name?.[0]?.toUpperCase() || '',
    });
    const handleChangeFilm = (value: any) => {
        console.log('valueData', value);

        setImgBannerMovie(value.poster);
    }
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
            <DialogTitle className={cx('dialog-title')}>
                <span>Chi tiết hiển thị</span>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <ImageDropzone
                        setCropResultBanner={setCropResultBanner}
                        cropResultBanner={cropResultBanner}
                        setImageBannerF={setImgBannerMovie}
                        imageBannerDefault={imgBannerMovie}
                        type='carosel'
                        imageDefault={''}
                    />
                    <AutoComleteBox
                        id="free-solo-demo"
                        label='Tên phim'
                        setValueData={setValueData}
                        placeholder='Nhập tên phim'
                        valueData={valueData}
                        onChange={handleChangeFilm}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>HUỶ</Button>
                <LoadingButton loading={approveLoading} onClick={() => handleSave({ oldId, ...valueData }, cropResultBanner, imgBannerMovie)} autoFocus>
                    LƯU
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}

export default CurrentDialog;
