import React from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement>;

const Image = ({ className = "", ...props }: Props) => {
  return (
    <img
      className={className}
      {...props}
    />
  );
};

export default Image;
