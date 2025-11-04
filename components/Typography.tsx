import { cn } from '@/lib/utils';
import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

type FontVariant =
  | 'Thin'
  | 'ThinItalic'
  | 'Light'
  | 'LightItalic'
  | 'Regular'
  | 'Italic'
  | 'Bold'
  | 'BoldItalic'
  | 'Black'
  | 'BlackItalic';

interface Props extends TextProps {
  variant?: FontVariant;
  children: React.ReactNode;
  className?: string;
}

const CText: React.FC<Props> = ({ variant = 'Regular', style, className, children, ...rest }) => {
  const fontFamily = `Lato-${variant}`;

  return (
    <RNText className={cn(className)} style={[{ fontFamily }, style]} {...rest}>
      {children}
    </RNText>
  );
};

export default CText;
