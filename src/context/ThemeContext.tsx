import React, { createContext, useContext, useEffect, useState } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { theme, Theme } from '../theme/theme';

type ThemeContextType = {
  theme: Theme;
  colorScheme: ColorSchemeName;
  isDarkMode: boolean;
  toggleColorScheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme,
  colorScheme: 'light',
  isDarkMode: false,
  toggleColorScheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get device color scheme
  const deviceColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(deviceColorScheme || 'light');
  const isDarkMode = colorScheme === 'dark';

  // Update colorScheme when device settings change
  useEffect(() => {
    setColorScheme(deviceColorScheme);
  }, [deviceColorScheme]);

  // Toggle between light and dark mode
  const toggleColorScheme = () => {
    setColorScheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const value = {
    theme,
    colorScheme,
    isDarkMode,
    toggleColorScheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext); 