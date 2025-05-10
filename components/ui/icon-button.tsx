import { cn } from '@/lib/utils';
import * as React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
}

export function IconButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  active = false,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(
        'flex items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'min-w-[48px] min-h-[48px]', // Min size for all buttons for better touch targets
        variant === 'primary' &&
          'bg-primary text-primary-foreground hover:bg-primary/90',
        variant === 'secondary' &&
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        variant === 'outline' &&
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        variant === 'ghost' &&
          'hover:bg-accent hover:text-accent-foreground',
        active && 'bg-accent text-accent-foreground',
        size === 'sm' && 'h-8 w-8 rounded-md',
        size === 'md' && 'h-10 w-10 rounded-md',
        size === 'lg' && 'h-12 w-12 rounded-md',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}