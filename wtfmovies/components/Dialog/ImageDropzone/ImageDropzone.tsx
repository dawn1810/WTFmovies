import { useEffect, useRef, useState } from "react";
import style from './ImageDropzone.module.scss';
import classNames from 'classnames/bind';
import ImageCropPopup from "./ImageCropPopUp";
import { Box } from "@mui/material";
import ReviewImage from "./ImageReview";
const cx = classNames.bind(style);
export default function ImageDropzone({ imageDefault, imageBannerDefault }: { imageDefault?: string; imageBannerDefault?: string }) {
    const [openCropPopup, setOpenCropPopup] = useState(false);
    const [selectedImage, setSelectedImage] = useState<any>(imageDefault);
    const [selectedImageBanner, setSelectedImageBanner] = useState<any>(imageBannerDefault);
    const [cropResultBanner, setCropResultBanner] = useState<any>(null);
    const [selectedImageCrop, setSelectedImageCrop] = useState<any>(null);
    const fileInputRef1 = useRef<any>(null);
    const fileInputRef2 = useRef<any>(null);
    const [cropResult, setCropResult] = useState<any>(null);
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
            setSelectedImageBanner(selectedImageCrop);
            setCropResultBanner(croppedArea.croppedAreaPixels);
        }
        else {
            setSelectedImage(selectedImageCrop);
            setCropResult(croppedArea.croppedAreaPixels);
        }

    };
    return (
        <Box className={cx("imgSellectContainer")}>

            <div className={cx("imgInput")} onDragOver={handleDragOver}
                onDrop={() => handleDrop(event, 'banner')}>
                <ReviewImage classname="reviewImage" imageSrc={selectedImageBanner} croppedArea={cropResultBanner} />
                <input type="file" accept="image/png, image/jpeg"
                    onChange={() => handleClick(event, 'banner')} ref={fileInputRef1} onClick={() => fileInputRef1.current.value = null} />
            </div>
            <div id={cx("banner")} className={cx("imgInputbanner")} onDragOver={handleDragOver}
                onDrop={() => handleDrop(event, 'image')}>
                <ReviewImage classname="reviewImageBaner" imageSrc={selectedImage} croppedArea={cropResult} />
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