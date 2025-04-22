import PropTypes from 'prop-types';
import { useState, forwardRef, useEffect } from 'react';
import { Skeleton } from '@mui/material';
const Image = forwardRef(({ src, alt, ...props }, ref) => {
    const [fallBack, setFallBack] = useState(false);

    useEffect(() => {
        setFallBack(false); // Reset fallBack when src changes
    }, [src]);

    const handleErr = () => {
        setFallBack(true);
    };
    return (
        <>
            {fallBack ? (
                <Skeleton variant="rectangular" width={210} height={118} />
            ) : (
                <img loading="lazy" src={src} alt={alt} ref={ref} {...props} onError={handleErr} />
            )}
        </>
    );
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    ref: PropTypes.string,
};
export default Image;
