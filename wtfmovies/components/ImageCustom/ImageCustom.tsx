'use client';
import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import classNames from 'classnames';

import images from '~/assets/image';
import styles from './Image.module.scss';

const ImageCustom = forwardRef(
    ({ src, alt, className, fallback: customFallback = images.logo, ...props }: any, ref) => {
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

ImageCustom.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
};

export default ImageCustom;
