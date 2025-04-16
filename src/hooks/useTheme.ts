import { useTheme as useThemeFromContext } from '../context/ThemeContext';
import { theme } from '../theme/theme';

export interface UseThemeReturn {
  theme: typeof theme;
  colors: typeof theme.colors;
  isDark: boolean;
  toggleTheme: () => void;
}

/**
 * A wrapper around the ThemeContext's useTheme hook to provide a consistent interface 
 * that works with both ThemeContext and direct import patterns.
 */
export const useTheme = (): UseThemeReturn => {
  const { theme, isDarkMode, toggleColorScheme } = useThemeFromContext();

  return {
    theme,
    colors: {
      ...theme.colors,
      ...(isDarkMode ? theme.colors.dark : {}),
    },
    isDark: isDarkMode,
    toggleTheme: toggleColorScheme,
  };
}; 