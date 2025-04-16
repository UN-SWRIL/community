import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  elevation?: 'none' | 'small' | 'medium' | 'large';
  borderRadius?: 'small' | 'medium' | 'large' | 'xlarge';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  style,
  elevation = 'medium',
  borderRadius = 'medium',
  padding = 'medium',
}) => {
  const { theme, isDarkMode } = useTheme();

  const getElevationStyle = (): ViewStyle => {
    if (elevation === 'none') return {};
    return theme.shadows[elevation];
  };

  const getBorderRadiusValue = (): number => {
    return theme.borderRadius[borderRadius];
  };

  const getPaddingValue = (): number => {
    if (padding === 'none') return 0;
    return theme.spacing[padding];
  };

  const cardStyle = [
    styles.card,
    {
      backgroundColor: isDarkMode ? theme.colors.dark.card : theme.colors.card,
      borderRadius: getBorderRadiusValue(),
      padding: getPaddingValue(),
      borderColor: isDarkMode ? theme.colors.dark.border : theme.colors.border,
    },
    getElevationStyle(),
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    overflow: 'hidden',
  },
});

export default Card; 