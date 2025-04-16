import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  ...rest
}) => {
  const { theme, isDarkMode } = useTheme();

  // Generate button styles based on variant and size
  const getBackgroundColor = () => {
    if (disabled) return theme.colors.disabled;

    switch (variant) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      case 'outline':
      case 'ghost':
        return 'transparent';
      case 'danger':
        return theme.colors.error;
      default:
        return theme.colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return isDarkMode ? theme.colors.dark.textTertiary : theme.colors.textTertiary;

    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'danger':
        return '#FFFFFF';
      case 'outline':
        return isDarkMode ? theme.colors.dark.text : theme.colors.text;
      case 'ghost':
        return theme.colors.primary;
      default:
        return '#FFFFFF';
    }
  };

  const getBorderColor = () => {
    if (disabled) return theme.colors.disabled;

    switch (variant) {
      case 'outline':
        return isDarkMode ? theme.colors.dark.border : theme.colors.border;
      default:
        return 'transparent';
    }
  };

  const getSizeStyles = (): { containerStyle: ViewStyle; textStyle: TextStyle } => {
    switch (size) {
      case 'small':
        return {
          containerStyle: {
            paddingVertical: theme.spacing.small,
            paddingHorizontal: theme.spacing.medium,
            borderRadius: theme.borderRadius.small,
          },
          textStyle: {
            fontSize: theme.typography.fontSize.small,
          },
        };
      case 'large':
        return {
          containerStyle: {
            paddingVertical: theme.spacing.regular,
            paddingHorizontal: theme.spacing.large,
            borderRadius: theme.borderRadius.large,
          },
          textStyle: {
            fontSize: theme.typography.fontSize.large,
          },
        };
      case 'medium':
      default:
        return {
          containerStyle: {
            paddingVertical: theme.spacing.medium,
            paddingHorizontal: theme.spacing.regular,
            borderRadius: theme.borderRadius.medium,
          },
          textStyle: {
            fontSize: theme.typography.fontSize.regular,
          },
        };
    }
  };

  const sizeStyles = getSizeStyles();

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator color={getTextColor()} />;
    }

    const textComponent = (
      <Text
        style={[
          styles.text,
          sizeStyles.textStyle,
          { color: getTextColor() },
          textStyle,
        ]}
      >
        {title}
      </Text>
    );

    if (!icon) return textComponent;

    return (
      <>
        {iconPosition === 'left' && icon}
        {textComponent}
        {iconPosition === 'right' && icon}
      </>
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        sizeStyles.containerStyle,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' ? 1 : 0,
          width: fullWidth ? '100%' : 'auto',
          opacity: disabled ? 0.7 : 1,
        },
        style,
      ]}
      disabled={disabled || isLoading}
      {...rest}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Button; 