import { useEffect, useRef, useState } from "react";
import style from './ImageDropzone.module.scss';
import classNames from 'classnames/bind';
import ImageCropPopup from "./ImageCropPopUp";
import { Box } from "@mui/material";
import ReviewImage from "./ImageReview";
const cx = classNames.bind(style);

interface imageDrop {
    setImageF: any,
    setImageBannerF: any,
    imageDefault: string;
    imageBannerDefault: string
    cropResultBanner: any,
    cropResult: any,
    setCropResultBanner: any,
    setCropResult: any
}
export default function ImageDropzone({
    cropResultBanner,
    setCropResult,
    setCropResultBanner,
    cropResult,
    setImageF,
    setImageBannerF,
    imageDefault,
    imageBannerDefault }: imageDrop) {
    const [openCropPopup, setOpenCropPopup] = useState(false);
    const [selectedImageCrop, setSelectedImageCrop] = useState<any>(null);


    const fileInputRef1 = useRef<any>(null);
    const fileInputRef2 = useRef<any>(null);
    const [aspectRatio, setAspectRatio] = useState<number>(0);

    const handleDrop = (event: any, type: string) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0];
        if (file) {
            setOpenCropPopup(true);
            setSelectedImageCrop(URL.createObjectURL(file));

            if (type === 'image') { setAspectRatio(3 / 4) }
            else { setAspectRatio(16 / 9) }
        }
    };
    const handleClick = (event: any, type: string) => {
        const file = event.target.files[0];

        if (file) {
            setOpenCropPopup(true);
            setSelectedImageCrop(URL.createObjectURL(file));
            if (type === 'image') { setAspectRatio(3 / 4) }
            else { setAspectRatio(16 / 9) }
        }
    };
    const handleDragOver = (event: any) => {
        event.preventDefault();
    };

    const handleCropComplete = (croppedArea: any, aspectRatio: any) => {
        if (aspectRatio === 16 / 9) {
            setImageBannerF(selectedImageCrop);
            setCropResultBanner(croppedArea.croppedAreaPixels);
        }
        else {
            setImageF(selectedImageCrop);
            setCropResult(croppedArea.croppedAreaPixels);
        }

    };
    return (
        <Box className={cx("imgSellectContainer")}>

            <div className={cx("imgInput")} onDragOver={handleDragOver}
                onDrop={() => handleDrop(event, 'banner')}>
                <ReviewImage classname="reviewImage" imageSrc={imageBannerDefault} croppedArea={cropResultBanner} />
                <input type="file" accept="image/png, image/jpeg"
                    onChange={() => handleClick(event, 'banner')} ref={fileInputRef1} onClick={() => fileInputRef1.current.value = null} />
            </div>
            <div id={cx("banner")} className={cx("imgInputbanner")} onDragOver={handleDragOver}
                onDrop={() => handleDrop(event, 'image')}>
                <ReviewImage classname="reviewImageBaner" imageSrc={imageDefault} croppedArea={cropResult} />
                <input type="file" accept="image/png, image/jpeg"
                    onChange={() => handleClick(event, 'image')} ref={fileInputRef2} onClick={() => fileInputRef2.current.value = null} />
            </div>
            <ImageCropPopup
                open={openCropPopup}
                setOpen={setOpenCropPopup}
                aspectRatio={aspectRatio} // Tỷ lệ khung hình cho ô vuông 1
                onCropComplete={handleCropComplete}
                selectedImage={selectedImageCrop}
            />

        </Box>
    );
}