/** @type {import('tailwindcss').Config} */
export const content = ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}', './app/**/*.{js,ts,tsx}'];
export const presets = [require('nativewind/preset')];
export const theme = {
  extend: {
    colors: {
      // Simple CSS variable-based colors
      primary: 'rgb(var(--color-primary) / <alpha-value>)',
      secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
      background: 'rgb(var(--color-background) / <alpha-value>)',
      foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
      muted: 'rgb(var(--color-muted) / <alpha-value>)',
      accent: 'rgb(var(--color-accent) / <alpha-value>)',
    },
  },
};
export const plugins = [];