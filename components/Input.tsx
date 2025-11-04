import { cn } from '@/lib/utils';
import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import CText from './Typography';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ label, error, containerClassName, className, style, ...props }, ref) => {
    return (
      <View className={cn('w-full', containerClassName)}>
        {label && (
          <CText variant="Regular" className="text-text-primary mb-2 text-sm">
            {label}
          </CText>
        )}
        <TextInput
          ref={ref}
          className={cn(
            'text-text-primary bg-background-primary w-full rounded-xl border-2 px-4 py-3.5 text-base',
            error ? 'border-red-500' : 'border-background-tertiary focus:border-primary-500',
            className
          )}
          style={[{ fontFamily: 'Lato-Regular' }, style]}
          placeholderTextColor="#999999"
          {...props}
        />
        {error && (
          <CText variant="Regular" className="mt-1 text-xs text-red-500">
            {error}
          </CText>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';

export default Input;
