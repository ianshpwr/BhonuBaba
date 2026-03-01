import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}: ButtonProps) {
  
  const baseStyles = 'inline-flex justify-center items-center font-semibold rounded-full transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] outline-none';
  
  const variants = {
    primary: 'bg-peach-400 text-white peach-shadow hover:bg-peach-500 hover:shadow-lg hover:shadow-peach-300/50',
    secondary: 'bg-peach-100 text-peach-600 hover:bg-peach-200',
    outline: 'border-2 border-peach-300 text-peach-500 hover:bg-peach-50'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
