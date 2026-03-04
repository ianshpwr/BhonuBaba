import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
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
  
  const baseStyles = 'inline-flex justify-center items-center font-bold rounded-xl transition-all duration-300 transform outline-none tracking-wide';
  
  const variants = {
    primary: 'bhonu-gradient text-white glow-shadow hover:shadow-[0_10px_40px_-10px_rgba(255,106,136,0.6)] hover:scale-[1.03] active:scale-[0.98]',
    secondary: 'bg-[#1a1a1a] text-white border border-[#2a2a2a] hover:bg-[#2a2a2a] hover:scale-[1.02] active:scale-[0.98]',
    outline: 'border border-[#ff9a8b] text-[#ff9a8b] hover:bg-[#ff9a8b]/10 hover:scale-[1.02] active:scale-[0.98]',
    ghost: 'text-[#b3b3b3] hover:text-white hover:bg-[#1f1f1f] border border-transparent'
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
