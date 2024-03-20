'use client';
import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import classNames from 'classnames';

import images from '~/assets/image';
import styles from './Image.module.scss';

const ImageCustom = forwardRef(
    ({ src, alt, className, fallback: customFallback = images.itadory, ...props }: any, ref) => {
        const [fallback, setFallback] = useState('');

        const handleError = () => {
            setFallback(customFallback);
        };
        return (
            <img
                className={classNames(styles.wrapper, className)}
                ref={ref}
                src={fallback || src}
                alt={alt}
                {...props}
                onError={handleError}
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
