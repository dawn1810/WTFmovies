import React, { useRef, useEffect } from 'react';
import style from '../ImageDropzone.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
interface ReviewImageProps {
    classname: string;
    imageSrc: string;
    croppedArea: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}

const ReviewImage: React.FC<ReviewImageProps> = ({ classname, imageSrc, croppedArea }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const drawImage = async () => {
            const image = new Image();
            image.src = imageSrc;

            await image.decode();

            const canvas = canvasRef.current!;
            const context = canvas.getContext('2d')!;



            const croppedWidth = croppedArea.width;
            const croppedHeight = croppedArea.height;
            const croppedX = croppedArea.x;
            const croppedY = croppedArea.y;

            context.drawImage(
                image,
                croppedX,
                croppedY,
                croppedWidth,
                croppedHeight,
                0,
                0,
                canvas.width,
                canvas.height
            );
        };

        drawImage();
    }, [imageSrc, croppedArea]);

    return <canvas ref={canvasRef} className={cx(classname)} />;
};

export default ReviewImage;