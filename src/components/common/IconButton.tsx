import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

/**
 * IconButton component for easy icon-based navigation and actions
 */
export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 24,
  color,
  onPress,
  style,
  disabled = false,
}) => {
  const { theme } = useTheme();
  
  // Use provided color or default to theme text color
  const iconColor = color || theme.colors.text;

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Ionicons name={icon} size={size} color={disabled ? theme.colors.disabled : iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconButton; 