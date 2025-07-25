import { useState } from "react";


interface ButtonProps {
  text: string;
  color?: 'primary' | 'secondary' | 'danger' | 'success' | string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({
  text,
  color = 'primary',
  onClick,
  className = '',
  type = 'button',
  size = 'md',
  variant = 'solid'
}) => {
  const [ripple, setRipple] = useState({ x: 0, y: 0, show: false });

  const colorVariants = {
    primary: {
      solid: 'bg-gradient-to-r from-blue-700 to-purple-800 text-white shadow-lg shadow-blue-900/30',
      outline: 'border-2 border-blue-700 text-blue-300 bg-slate-800/60',
      ghost: 'text-blue-300 bg-slate-800/40'
    },
    secondary: {
      solid: 'bg-gradient-to-r from-slate-600 to-slate-800 hover:from-slate-700 text-white shadow-lg shadow-slate-900/30',
      outline: 'border-2 border-slate-600 text-slate-300 bg-slate-800/60',
      ghost: 'text-slate-300 bg-slate-800/40'
    },
    danger: {
      solid: 'bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 text-white shadow-lg shadow-red-900/30',
      outline: 'border-2 border-red-700 text-red-300 bg-slate-800/60',
      ghost: 'text-red-300 bg-slate-800/40'
    },
    success: {
      solid: 'bg-gradient-to-r from-green-700 to-emerald-800 hover:from-green-800 hover:to-emerald-900 text-white shadow-lg shadow-green-900/30',
      outline: 'border-2 border-green-700 text-green-300 bg-slate-800/60',
      ghost: 'text-green-300 bg-slate-800/40'
    }
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRipple({ x, y, show: true });
    setTimeout(() => setRipple(prev => ({ ...prev, show: false })), 600);
    
    onClick?.();
  };

  const colorClass = colorVariants[color as keyof typeof colorVariants]?.[variant] || colorVariants.primary[variant];

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`
        relative overflow-hidden rounded-xl font-semibold
        transform transition-all duration-200 ease-out
        hover:scale-105 hover:-translate-y-0.5
        focus:outline-none focus:ring-2 focus:ring-blue-700/30
        backdrop-blur-sm
        ${sizes[size]}
        ${colorClass}
        ${className}
      `}
    >
      <span className="relative z-10">{text}</span>
      {ripple.show && (
        <span
          className="absolute bg-blue-200/20 rounded-full animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      )}
    </button>
  );
};