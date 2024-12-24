'use client';
import { useState, forwardRef, ImgHTMLAttributes } from 'react';
import classNames from 'classnames';

import images from '~/assets/image';
import styles from './Image.module.scss';

interface ImageCustomProps extends ImgHTMLAttributes<HTMLImageElement> {
    src?: string;
    alt?: string;
    className?: string;
    fallback?: string;
}

const ImageCustom = forwardRef<HTMLImageElement, ImageCustomProps>(
    ({ src, alt, className, fallback: customFallback = images.logo, ...props }, ref) => {
        const [fallback, setFallback] = useState(customFallback);
        // because it not a error if src is undefine
        // const handleError = () => {
        //     setFallback(customFallback);
        // };
        return (
            <img
                className={classNames(styles.wrapper, className)}
                loading="lazy"
                ref={ref}
                src={src || fallback}
                alt={alt}
                {...props}
            // onError={handleError}
            />
        );
    },
);

ImageCustom.displayName = 'ImageCustom';

export default ImageCustom;
