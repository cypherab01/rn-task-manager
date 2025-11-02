import { cn } from "@/lib/utils";
import React from "react";
import { Text as RNText, TextProps } from "react-native";

type FontVariant =
  | "Thin"
  | "ExtraLight"
  | "Light"
  | "Regular"
  | "Medium"
  | "SemiBold"
  | "Bold"
  | "ExtraBold"
  | "Black";

interface Props extends TextProps {
  variant?: FontVariant;
  children: React.ReactNode;
  className?: string;
}

const CText: React.FC<Props> = ({
  variant = "Regular",
  style,
  className,
  children,
  ...rest
}) => {
  const fontFamily = `SpaceMono-${variant}`; // TODO: Change to the actual font family

  return (
    <RNText className={cn(className)} style={[{ fontFamily }, style]} {...rest}>
      {children}
    </RNText>
  );
};

export default CText;
