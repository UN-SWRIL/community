import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

/**
 * App theme with color schemes, typography, and spacing
 */
export const theme = {
  colors: {
    // Primary brand colors
    primary: '#377DFF',
    primaryDark: '#2A63CC',
    primaryLight: '#9BBCFF',

    // Secondary accent colors
    secondary: '#FF7337',
    secondaryDark: '#CC5C2C',
    secondaryLight: '#FFB99B',

    // Success, warning, error states
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',

    // Neutrals
    background: '#F5F8FF',
    card: '#FFFFFF',
    text: '#1A1A2C',
    textSecondary: '#666680',
    textTertiary: '#9999A9',
    border: '#E2E8F0',
    disabled: '#CCCCCC',

    // Dark mode colors
    dark: {
      background: '#121212',
      card: '#1E1E1E',
      text: '#FFFFFF',
      textSecondary: '#AAAAAA',
      textTertiary: '#888888',
      border: '#333333',
    },
  },

  typography: {
    fontFamily: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
    },
    fontSize: {
      tiny: 10,
      small: 12,
      medium: 14,
      regular: 16,
      large: 18,
      xlarge: 20,
      xxlarge: 24,
      xxxlarge: 30,
    },
    lineHeight: {
      tiny: 14,
      small: 18,
      medium: 20,
      regular: 24,
      large: 26,
      xlarge: 28,
      xxlarge: 32,
      xxxlarge: 38,
    },
  },

  spacing: {
    tiny: 4,
    small: 8,
    medium: 12,
    regular: 16,
    large: 24,
    xlarge: 32,
    xxlarge: 48,
    xxxlarge: 64,
  },

  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    xlarge: 16,
    round: 999,
  },

  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 2,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
  },

  // Device dimensions
  dimensions: {
    width,
    height,
  },
};

// Types
export type Theme = typeof theme;
export type ThemeColors = typeof theme.colors;
export type ThemeTypography = typeof theme.typography;
export type ThemeSpacing = typeof theme.spacing;
export type ThemeBorderRadius = typeof theme.borderRadius;
export type ThemeShadows = typeof theme.shadows;
export type ThemeDimensions = typeof theme.dimensions; 