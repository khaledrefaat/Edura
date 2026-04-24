'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex w-full items-center justify-center font-medium transition-all duration-200 overflow-hidden focus:outline-none gap-2 cursor-pointer relative h-10 md:h-12 rounded-[10px] px-6 text-base active:scale-[0.97]',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white shadow-lg hover:shadow-xl hover:brightness-110',
        secondary:
          'bg-secondary text-white shadow-lg hover:shadow-xl hover:brightness-110',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      disabled: false,
    },
  },
);

interface CustomButtonProps
  extends
    VariantProps<typeof buttonVariants>,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  children: ReactNode;
  className?: string;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export { buttonVariants };

export default function CustomButton({
  children,
  variant,
  disabled,
  className,
  loading = false,
  leftIcon,
  rightIcon,
  type = 'button',
  ...props
}: CustomButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, disabled }), className)}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center bg-primary text-white">
          <Loader2 className="animate-spin text-white" />
        </span>
      )}
      <span className={cn('flex items-center gap-2', loading && 'invisible')}>
        {leftIcon}
        {children}
        {rightIcon}
      </span>
    </button>
  );
}
