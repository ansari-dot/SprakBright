import React from 'react';
import PropTypes from 'prop-types';

const OptimizedImage = ({ src, alt, className, width, height, loading = 'lazy', ...props }) => {
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img 
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        {...props}
      />
    </picture>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  loading: PropTypes.oneOf(['lazy', 'eager'])
};

export default OptimizedImage;