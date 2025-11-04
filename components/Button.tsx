import { cn } from '@/lib/utils';
import React from 'react';
import { ActivityIndicator, Pressable, PressableProps } from 'react-native';
import CText from './Typography';

interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'lg',
  isLoading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  const baseClasses = 'rounded-xl flex-row items-center justify-center';

  const variantClasses = {
    primary: 'bg-primary-500 active:bg-primary-600',
    secondary: 'bg-background-secondary active:bg-background-tertiary',
    outline: 'bg-transparent border-2 border-primary-500 active:bg-primary-50',
    ghost: 'bg-transparent active:bg-background-secondary',
  };

  const sizeClasses = {
    sm: 'px-4 py-2',
    md: 'px-6 py-3',
    lg: 'px-8 py-4',
  };

  const textVariantClasses = {
    primary: 'text-text-inverse',
    secondary: 'text-text-primary',
    outline: 'text-primary-500',
    ghost: 'text-primary-500',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const disabledClasses = disabled || isLoading ? 'opacity-50' : '';

  return (
    <Pressable
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        disabledClasses,
        className
      )}
      disabled={disabled || isLoading}
      {...props}>
      {isLoading ? (
        <ActivityIndicator size="small" color={variant === 'primary' ? '#ffffff' : '#0A66C2'} />
      ) : (
        <CText variant="Bold" className={cn(textVariantClasses[variant], textSizeClasses[size])}>
          {title}
        </CText>
      )}
    </Pressable>
  );
};

export default Button;
