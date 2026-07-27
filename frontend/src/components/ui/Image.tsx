import React from 'react';

interface ImageProps {
  src: string;                 // URL o path de la imagen
  alt: string;                 // Texto alternativo (importante para accesibilidad)
  width?: number | string;     // Ancho opcional
  height?: number | string;    // Alto opcional
  className?: string;          // Clases para estilos
  loading?: 'lazy' | 'eager';  // Carga diferida
  onClick?: () => void;        // Click opcional
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  onClick,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      onClick={onClick}
      className={className}
    />
  );
};

export default Image;