import React, { createContext, useContext, useState, useEffect } from 'react';
import { View } from 'react-native';
import { vars } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from 'utils/storage-keys';

export type Theme = 'light' | 'dark' | 'xmas' | 'pinky' | 'halloween';

const themes = {
  light: vars({
    '--color-background': '255 255 255',     // white
    '--color-foreground': '30 41 59',        // slate-800
    '--color-primary': '59 130 246',         // blue-500
    '--color-secondary': '241 245 249',      // slate-100
    '--color-muted': '148 163 184',          // slate-400
    '--color-accent': '34 197 94',           // green-500
  }),
  dark: vars({
    '--color-background': '15 23 42',        // slate-900
    '--color-foreground': '241 245 249',     // slate-100
    '--color-primary': '96 165 250',         // blue-400
    '--color-secondary': '51 65 85',         // slate-600
    '--color-muted': '100 116 139',          // slate-500
    '--color-accent': '34 197 94',           // green-500
  }),
  xmas: vars({
    '--color-background': '12 40 24',        // dark green
    '--color-foreground': '240 253 244',     // green-50
    '--color-primary': '220 38 38',          // red-600
    '--color-secondary': '22 101 52',        // green-700
    '--color-muted': '187 247 208',          // green-200
    '--color-accent': '34 197 94',           // green-500
  }),
  pinky: vars({
    '--color-background': '253 242 248',     // pink-50
    '--color-foreground': '131 24 67',       // pink-900
    '--color-primary': '236 72 153',         // pink-500
    '--color-secondary': '249 168 212',      // pink-300
    '--color-muted': '190 24 93',            // pink-700
    '--color-accent': '219 39 119',          // pink-600
  }),
  halloween: vars({
    '--color-background': '26 11 11',        // very dark brown
    '--color-foreground': '254 243 199',     // amber-100
    '--color-primary': '234 88 12',          // orange-600
    '--color-secondary': '69 26 3',          // orange-900
    '--color-muted': '251 191 36',           // amber-400
    '--color-accent': '146 64 14',           // orange-800
  }),
};

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Record<Theme, any>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem(StorageKeys.THEME_STORAGE_KEY);
      if (storedTheme) {
        setThemeState(storedTheme as Theme);
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  };

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      await AsyncStorage.setItem(StorageKeys.THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      <View style={themes[theme]} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
} 