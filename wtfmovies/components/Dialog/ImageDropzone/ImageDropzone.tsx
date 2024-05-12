import { useState } from "react";
import style from './ImageDropzone.module.scss';
import classNames from 'classnames/bind';
import ImageCropPopup from "./ImageCropPopUp";
import { Box, Divider } from "@mui/material";
const cx = classNames.bind(style);
export default function ImageDropzone() {
    const [openCropPopup, setOpenCropPopup] = useState(false);
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [cropResult, setCropResult] = useState(null);

    const handleDrop = (event: any) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setSelectedImage(URL.createObjectURL(file));
        setOpenCropPopup(true);
    };
    const handleClick = (event: any) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
        setOpenCropPopup(true);
    };
    const handleDragOver = (event: any) => {
        event.preventDefault();
    };

    const handleCropComplete = (croppedArea: any) => {
        console.log(croppedArea);

    };
    return (
        <Box className={cx("imgSellectContainer")}>

            <div className={cx("imgInput")} onDragOver={handleDragOver}
                onDrop={handleDrop}>
                <input type="file" accept="image/png, image/jpeg"
                    onChange={handleClick} />
            </div>
            <div id={cx("banner")} className={cx("imgInput")} onDragOver={handleDragOver}
                onDrop={handleDrop}>
                <input type="file" accept="image/png, image/jpeg"
                    onChange={handleClick} />
            </div>
            <ImageCropPopup
                open={openCropPopup}
                setOpen={setOpenCropPopup}
                aspectRatio={{
                    unit: '%', // Can be 'px' or '%'
                    x: 25,
                    y: 25,
                    width: 50,
                    height: 50
                }} // Tỷ lệ khung hình cho ô vuông 1
                onCropComplete={handleCropComplete}
                selectedImage={selectedImage}
            />
            {cropResult && (
                <div>
                    <h4>Kết quả cắt ảnh:</h4>
                    <img src={selectedImage} alt="Thumbnail" style={{ width: '200px', height: '200px' }} />
                    <img src={cropResult} alt="Cropped Image" style={{ width: '200px', height: '200px' }} />
                </div>
            )}
        </Box>
    );
}