import React from 'react';

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

const Image = ({ className = "", ...props }: ImageProps) => {
  return (
    <img
      className={className}
      {...props}
    />
  );
};

export default Image;
