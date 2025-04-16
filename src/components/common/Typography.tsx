import React from 'react';
import { Text, TextStyle, StyleSheet, StyleProp } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export type TypographyVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'subtitle' 
  | 'body' 
  | 'bodySmall' 
  | 'caption' 
  | 'button';

export type TypographyWeight = 'regular' | 'medium' | 'bold';

interface TypographyProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  style?: StyleProp<TextStyle>;
  color?: string;
  center?: boolean;
  numberOfLines?: number;
  adjustsFontSizeToFit?: boolean;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  weight = 'regular',
  style,
  color,
  center = false,
  numberOfLines,
  adjustsFontSizeToFit,
}) => {
  const { theme, isDarkMode } = useTheme();

  const getTextStyle = (): TextStyle => {
    // Get font size and line height based on variant
    let fontSize: number;
    let lineHeight: number;

    switch (variant) {
      case 'h1':
        fontSize = theme.typography.fontSize.xxxlarge;
        lineHeight = theme.typography.lineHeight.xxxlarge;
        break;
      case 'h2':
        fontSize = theme.typography.fontSize.xxlarge;
        lineHeight = theme.typography.lineHeight.xxlarge;
        break;
      case 'h3':
        fontSize = theme.typography.fontSize.xlarge;
        lineHeight = theme.typography.lineHeight.xlarge;
        break;
      case 'h4':
        fontSize = theme.typography.fontSize.large;
        lineHeight = theme.typography.lineHeight.large;
        break;
      case 'subtitle':
        fontSize = theme.typography.fontSize.regular;
        lineHeight = theme.typography.lineHeight.regular;
        break;
      case 'body':
        fontSize = theme.typography.fontSize.regular;
        lineHeight = theme.typography.lineHeight.regular;
        break;
      case 'bodySmall':
        fontSize = theme.typography.fontSize.medium;
        lineHeight = theme.typography.lineHeight.medium;
        break;
      case 'caption':
        fontSize = theme.typography.fontSize.small;
        lineHeight = theme.typography.lineHeight.small;
        break;
      case 'button':
        fontSize = theme.typography.fontSize.regular;
        lineHeight = theme.typography.lineHeight.regular;
        break;
      default:
        fontSize = theme.typography.fontSize.regular;
        lineHeight = theme.typography.lineHeight.regular;
    }

    // Get font weight
    let fontWeight: TextStyle['fontWeight'];
    switch (weight) {
      case 'bold':
        fontWeight = '700';
        break;
      case 'medium':
        fontWeight = '500';
        break;
      case 'regular':
      default:
        fontWeight = '400';
    }

    // Get text color, use provided color or default based on theme
    const textColor = color || (isDarkMode ? theme.colors.dark.text : theme.colors.text);

    return {
      fontSize,
      lineHeight,
      fontWeight,
      color: textColor,
      textAlign: center ? 'center' : 'auto',
      fontFamily: theme.typography.fontFamily[weight],
    };
  };

  return (
    <Text
      style={[getTextStyle(), style]}
      numberOfLines={numberOfLines}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
    >
      {children}
    </Text>
  );
};

export default Typography; 