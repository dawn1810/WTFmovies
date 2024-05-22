import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Cropper from 'react-easy-crop'
export default function ImageCropPopup({ selectedImage, open, setOpen, aspectRatio, onCropComplete }: { selectedImage: any, open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, aspectRatio: any, onCropComplete: any }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedArea, setCroppedArea] = useState({ croppedArea: null, croppedAreaPixels: null })


    const handleClose = () => {
        setOpen(false);
        setZoom(1);
    };
    const handleCrop = (croppedArea: any, croppedAreaPixels: any) => {
        setCroppedArea({ croppedArea: croppedArea, croppedAreaPixels: croppedAreaPixels })
    };
    return (
        <Dialog maxWidth={'xl'} open={open} onClose={handleClose}>
            <DialogTitle>Cắt ảnh</DialogTitle>
            <DialogContent>
                <Box sx={{ position: 'relative', width: 500, height: 500 }}>

                    <Cropper
                        image={selectedImage}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspectRatio}
                        onCropChange={setCrop}
                        onCropComplete={handleCrop}
                        onZoomChange={setZoom}

                    />
                </Box>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Huỷ</Button>
                <Button onClick={() => { handleClose(); onCropComplete(croppedArea, aspectRatio) }}>Cắt</Button>
            </DialogActions>
        </Dialog>
    );
}