'use client';

import { clsx } from 'clsx';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'gold' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          {
            // Primary - Dark elegant button
            'bg-neutral-900 text-white hover:bg-neutral-800 focus:ring-neutral-900 active:scale-[0.98]':
              variant === 'primary',
            // Secondary - White with border
            'bg-white border border-neutral-200 text-neutral-800 hover:border-neutral-900 hover:bg-neutral-50 focus:ring-neutral-900':
              variant === 'secondary',
            // Accent - Brand color
            'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-600 active:scale-[0.98]':
              variant === 'accent',
            // Gold - Premium gold gradient
            'bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:from-gold-600 hover:to-gold-700 shadow-lg shadow-gold-500/25 focus:ring-gold-500':
              variant === 'gold',
            // Ghost - Transparent
            'bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900':
              variant === 'ghost',
            // Outline - Only border
            'bg-transparent border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white':
              variant === 'outline',
          },
          {
            'px-4 py-2 text-sm': size === 'sm',
            'px-6 py-3 text-sm tracking-wide': size === 'md',
            'px-8 py-4 text-base tracking-wide': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
