import React from 'react';

// Definir las props que recibirá el componente Button
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' // Tipo del botón, por defecto 'button'
  disabled?: boolean; // Para manejar el estado de deshabilitado
  className?: string; // Clase opcional para personalizar estilos
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button', disabled = false, className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center ${className}`} // Puedes agregar clases adicionales si las pasas
    >
      {children}
    </button>
  );
};

export default Button;