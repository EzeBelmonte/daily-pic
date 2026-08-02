import React, { forwardRef} from 'react';

import { cn } from '@/utils/cn';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(({
  label,
  error,
  className = '',
  id,
  ...props
}, ref) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label 
          htmlFor={id} 
          className="text-sm font-medium"
        >
          {label}
        </label>
      )}

      <input
        ref={ref}
        id={id}
        className={cn(`
          rounded-md
          border
          border-gray-300
          px-2
          py-1
          text-white
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          disabled:bg-gray-100
          disabled:cursor-not-allowed`,
          error && "border-red-500",
          className
        )}
        {...props}
      />

      {error && (
        <span 
          id={`${id}-error`}
          className="text-sm text-red-500"
        >
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;