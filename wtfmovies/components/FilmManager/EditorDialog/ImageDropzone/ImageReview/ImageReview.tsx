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

            try {
                await image.decode();
            } catch (error) {
                return;
            }

            const canvas = canvasRef.current!;
            const context = canvas.getContext('2d')!;

            if (!croppedArea?.width) return (context.drawImage(
                image,
                0,
                0,
                image.width,
                image.height,
                0,
                0,
                canvas.width,
                canvas.height
            ))

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