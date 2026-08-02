import React from 'react';

// Definir las props que recibirá el componente Button
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};


const Button = ({ 
  children, 
  className = "",
  ...props }: Props) => {
  return (
    <button
      className={`cursor-pointer ${className}`} // Puedes agregar clases adicionales si las pasas
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;